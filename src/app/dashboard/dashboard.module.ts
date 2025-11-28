import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { MentorDashboardComponent } from './mentor/mentor-dashboard.component';
import { MenteeDashboardComponent } from './mentee/mentee-dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ReferralModule } from '../referral/referral.module';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        MentorDashboardComponent,
        MenteeDashboardComponent,
        OrdersComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        ReferralModule
    ]
})
export class DashboardModule { }
