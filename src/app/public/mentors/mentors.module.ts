import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MentorsComponent } from './mentors.component';
import { MentorProfileComponent } from './mentor-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [MentorsComponent, MentorProfileComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: MentorsComponent },
            { path: ':id', component: MentorProfileComponent }
        ])
    ]
})
export class MentorsModule { }
