import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../shared/components/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private location = inject(Location);
  private toast = inject(ToastService);

  paymentForm!: FormGroup;
  processing = false;
  bookingData: any;
  showConfirmationModal = false;

  // Dropdown options
  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  years: { value: string; label: string }[] = [];

  ngOnInit(): void {
    this.generateYears();
    this.initializeForm();
    this.loadBookingData();
  }

  private generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 15; i++) {
      const year = currentYear + i;
      this.years.push({
        value: year.toString().slice(-2),
        label: year.toString()
      });
    }
  }

  private initializeForm(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      billingAddress: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/), Validators.maxLength(5)]],
      country: ['', Validators.required]
    });
  }

  private loadBookingData(): void {
    const stored = sessionStorage.getItem('bookingData');
    if (stored) {
      this.bookingData = JSON.parse(stored);
    } else {
      this.bookingData = {
        mentor: {
          avatar: 'JD',
          name: 'John Doe',
          title: 'Senior Developer',
          price: 50,
          sessions: 60
        },
        date: new Date(),
        timeSlot: '10:00 AM - 11:00 AM',
        userDetails: {
          fullName: 'Jane Smith',
          email: 'jane.smith@example.com'
        }
      };
    }
  }

  formatCardNumber(event: any): void {
    const value = event.target.value.replace(/\s/g, '');
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    this.paymentForm.patchValue({ cardNumber: formatted.replace(/\s/g, '') }, { emitEvent: false });
    event.target.value = formatted;
  }

  goBack(): void {
    this.location.back();
  }

  confirmPayment(): void {
    if (this.paymentForm.invalid) {
      Object.keys(this.paymentForm.controls).forEach(key => {
        this.paymentForm.get(key)?.markAsTouched();
      });
      this.toast.show('Please fill in all required fields correctly', 'error');
      return;
    }

    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      this.showConfirmationModal = true;
    }, 2000);
  }

  closeModal(): void {
    this.showConfirmationModal = false;
    // Navigate to orders page (to be created)
    this.router.navigate(['/dashboard']);
  }
}
