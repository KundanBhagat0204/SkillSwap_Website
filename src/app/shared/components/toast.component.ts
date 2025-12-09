import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
  <div class="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
    <div *ngFor="let toast of toastService.toasts | async" 
         class="px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-fade-in-up pointer-events-auto transition-all duration-300"
         [ngClass]="{
           'bg-green-600': toast.type === 'success',
           'bg-red-600': toast.type === 'error',
           'bg-blue-600': toast.type === 'info'
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
