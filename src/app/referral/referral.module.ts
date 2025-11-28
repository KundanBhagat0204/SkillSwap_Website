import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReferralModalComponent } from '../dashboard/referral-modal/referral-modal.component';

@NgModule({
    declarations: [ReferralModalComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [ReferralModalComponent]
})
export class ReferralModule { }
