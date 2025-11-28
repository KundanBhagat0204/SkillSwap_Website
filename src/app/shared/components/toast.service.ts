import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
    id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    private toasts$ = new BehaviorSubject<Toast[]>([]);
    private counter = 0;

    get toasts() { return this.toasts$.asObservable(); }

    show(message: string, type: 'success' | 'error' | 'info' = 'info') {
        const id = this.counter++;
        const toast: Toast = { message, type, id };
        this.toasts$.next([...this.toasts$.value, toast]);

        setTimeout(() => this.remove(id), 3000);
    }

    remove(id: number) {
        this.toasts$.next(this.toasts$.value.filter(t => t.id !== id));
    }
}
