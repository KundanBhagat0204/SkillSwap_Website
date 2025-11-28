import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { AvailabilityPickerComponent } from './availability/availability-picker.component';
import { BookingDetailsComponent } from './details/booking-details.component';

const routes: Routes = [
    { path: '', component: AvailabilityPickerComponent },
    { path: 'details', component: BookingDetailsComponent },
    { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
    declarations: [
        CheckoutComponent,
        AvailabilityPickerComponent,
        BookingDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class BookingModule { }
