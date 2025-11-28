import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    template: `
    <div class="flex flex-col gap-2">
      <div *ngFor="let toast of toastService.toasts | async" 
           class="px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-fade-in-up"
           [ngClass]="{
             'bg-success': toast.type === 'success',
             'bg-danger': toast.type === 'error',
             'bg-primary-600': toast.type === 'info'
           }">
        {{ toast.message }}
      </div>
    </div>
  `,
    styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.3s ease-out;
    }
  `]
})
export class ToastComponent {
    constructor(public toastService: ToastService) { }
}
