import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'about', component: AboutComponent },
    { path: 'pricing', component: PricingComponent }
];

@NgModule({
    declarations: [
        LandingComponent,
        AboutComponent,
        PricingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class PublicModule { }
