import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/components/toast.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
    detailsForm!: FormGroup;
    bookingData: any = null;
    currentUser: any = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toast: ToastService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // Get booking data from session storage
        const storedData = sessionStorage.getItem('bookingData');
        if (!storedData) {
            this.toast.show('No booking data found. Please start from the beginning.', 'error');
            this.router.navigate(['/booking']);
            return;
        }

        this.bookingData = JSON.parse(storedData);

        // Get current user
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
            this.initForm();
        });
    }

    initForm() {
        this.detailsForm = this.fb.group({
            // User details (editable)
            fullName: [this.currentUser?.name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10)]],

            // Session requirements
            sessionGoals: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
            experienceLevel: ['', Validators.required],

            // Read-only fields (for display only)
            mentorName: [{ value: this.bookingData.mentor.name, disabled: true }],
            mentorTitle: [{ value: this.bookingData.mentor.title, disabled: true }],
            sessionDate: [{ value: this.formatDate(this.bookingData.date), disabled: true }],
            sessionTime: [{ value: this.bookingData.timeSlot, disabled: true }],
            sessionDuration: [{ value: `${this.bookingData.mentor.sessions} min`, disabled: true }],
            sessionPrice: [{ value: `$${this.bookingData.mentor.price}`, disabled: true }],

            // Terms and conditions
            agreeToTerms: [false, Validators.requiredTrue]
        });
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    get experienceLevels() {
        return [
            { value: 'beginner', label: 'Beginner - Just starting out' },
            { value: 'intermediate', label: 'Intermediate - Some experience' },
            { value: 'advanced', label: 'Advanced - Experienced professional' }
        ];
    }

    proceedToPayment() {
        if (this.detailsForm.invalid) {
            // Mark all fields as touched to show validation errors
            Object.keys(this.detailsForm.controls).forEach(key => {
                this.detailsForm.get(key)?.markAsTouched();
            });
            this.toast.show('Please fill in all required fields correctly', 'error');
            return;
        }

        // Combine booking data with user details
        const completeBookingData = {
            ...this.bookingData,
            userDetails: {
                fullName: this.detailsForm.get('fullName')?.value,
                email: this.detailsForm.get('email')?.value,
                phone: this.detailsForm.get('phone')?.value,
                sessionGoals: this.detailsForm.get('sessionGoals')?.value,
                experienceLevel: this.detailsForm.get('experienceLevel')?.value
            }
        };

        // Store updated data
        sessionStorage.setItem('bookingData', JSON.stringify(completeBookingData));

        // Navigate to checkout
        this.router.navigate(['/booking/checkout']);
    }

    goBack() {
        this.router.navigate(['/booking']);
    }
}
