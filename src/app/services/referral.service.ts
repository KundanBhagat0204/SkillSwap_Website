import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ReferralService {

    constructor(private authService: AuthService) { }

    getReferralLink(userId: string): string {
        // In a real app, this might be a hash or a specific code
        return `${window.location.origin}/register?ref=${userId}`;
    }

    inviteFriend(email: string): Observable<boolean> {
        // Simulate API call
        return of(true).pipe(
            delay(1000), // Simulate network latency
            tap(() => {
                // Optimistically update the user's ticket count
                const currentUser = (this.authService as any).user$.value;
                if (currentUser && currentUser.goldenTickets > 0) {
                    const updatedUser = { ...currentUser, goldenTickets: currentUser.goldenTickets - 1 };
                    (this.authService as any).user$.next(updatedUser);
                }
            })
        );
    }
}
