import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../shared/components/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    form: FormGroup;
    submitting = false;
    error?: string;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private toast: ToastService
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    submit() {
        if (this.form.invalid) {
            this.toast.show('Please fill in all fields correctly', 'error');
            return;
        }
        this.submitting = true;
        this.error = undefined;
        const { email, password } = this.form.value;
        this.auth.login(email, password).subscribe({
            next: () => {
                this.toast.show('Welcome back! Login successful', 'success');
                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
                setTimeout(() => {
                    this.router.navigateByUrl(returnUrl);
                }, 500);
            },
            error: err => {
                this.error = err?.error?.message || 'Login failed';
                this.toast.show(this.error || 'Login failed', 'error');
                this.submitting = false;
            }
        });
    }
}
