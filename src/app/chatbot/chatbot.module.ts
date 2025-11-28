import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot.component';

const routes: Routes = [
    { path: '', component: ChatbotComponent }
];

@NgModule({
    declarations: [ChatbotComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class ChatbotModule { }
