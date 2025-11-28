import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../shared/components/toast.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    submitting = false;

    constructor(
        private fb: FormBuilder,
        private toast: ToastService,
        private router: Router
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            role: ['', Validators.required]
        });
    }

    submit() {
        if (this.form.invalid) {
            // Mark all fields as touched to show validation errors
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key)?.markAsTouched();
            });
            this.toast.show('Please fill in all required fields correctly', 'error');
            return;
        }

        this.submitting = true;

        // Simulate API call
        setTimeout(() => {
            this.toast.show('Account created successfully! Welcome to SkillSwap', 'success');
            this.submitting = false;

            // Navigate to login
            setTimeout(() => {
                this.router.navigate(['/auth/login']);
            }, 1500);
        }, 1000);
    }
}
