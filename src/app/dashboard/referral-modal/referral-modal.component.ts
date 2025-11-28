import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferralService } from '../../services/referral.service';
import { AuthService, User } from '../../auth/auth.service';
import { ToastService } from '../../shared/components/toast.service';

@Component({
    selector: 'app-referral-modal',
    templateUrl: './referral-modal.component.html',
    styleUrls: ['./referral-modal.component.css']
})
export class ReferralModalComponent implements OnInit {
    inviteForm: FormGroup;
    referralLink = '';
    currentUser: User | null = null;
    isLoading = false;
    successMessage = '';

    constructor(
        private fb: FormBuilder,
        private referralService: ReferralService,
        private authService: AuthService,
        private toast: ToastService
    ) {
        this.inviteForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.referralLink = this.referralService.getReferralLink(user.id);
            }
        });
    }

    copyLink(): void {
        navigator.clipboard.writeText(this.referralLink).then(() => {
            this.toast.show('Referral link copied to clipboard!', 'success');
        });
    }

    onSubmit(): void {
        if (this.inviteForm.valid && this.currentUser && this.currentUser.goldenTickets > 0) {
            this.isLoading = true;
            const email = this.inviteForm.get('email')?.value;

            this.referralService.inviteFriend(email).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.successMessage = `Invitation sent to ${email}! They have 1 month of Premium waiting.`;
                    this.toast.show(`Invitation sent to ${email}!`, 'success');
                    this.inviteForm.reset();
                },
                error: () => {
                    this.isLoading = false;
                    this.toast.show('Failed to send invitation. Please try again.', 'error');
                }
            });
        }
    }
}
