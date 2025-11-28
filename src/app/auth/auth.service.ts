import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, throwError, delay } from 'rxjs';

export interface User { id: string; email: string; name: string; roles: string[]; goldenTickets: number; }

@Injectable({ providedIn: 'root' })
export class AuthService {
    private user$ = new BehaviorSubject<User | null>(null);
    private accessToken: string | null = null;
    private readonly USER_KEY = 'app.currentUser';
    private readonly TOKEN_KEY = 'app.accessToken';

    constructor(private http: HttpClient) {
        this.restoreSession();
    }

    get currentUser$(): Observable<User | null> { return this.user$.asObservable(); }
    get isAuthenticated(): boolean { return !!this.accessToken; }

    login(email: string, password: string): Observable<{ accessToken: string; user: User }> {
        // Mock API call
        if (email === 'admin@gmail.com' && password === '12345678') {
            const mockUser: User = { id: '1', email, name: 'Admin User', roles: ['admin', 'user', 'mentor'], goldenTickets: 3 };
            return of({ accessToken: 'mock-jwt-token', user: mockUser }).pipe(
                delay(500),
                tap(res => this.persistSession(res.accessToken, mockUser))
            );
        } else {
            return throwError(() => ({ error: { message: 'Invalid credentials' } })).pipe(delay(500));
        }
    }

    logout() {
        this.accessToken = null;
        this.user$.next(null);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        // In a real app, we would call the server to clear the HttpOnly cookie
        // this.http.post('/api/auth/logout', {}).subscribe();
    }

    setAccessToken(token: string) {
        this.accessToken = token;
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    getAccessToken(): string | null { return this.accessToken; }

    refreshAccessToken(): Observable<{ accessToken: string; user?: User }> {
        // Mock refresh token flow
        return of({ accessToken: 'new-mock-token' }).pipe(
            delay(500),
            tap(res => {
                this.accessToken = res.accessToken;
                localStorage.setItem(this.TOKEN_KEY, res.accessToken);
                if (res.user) this.user$.next(res.user);
            })
        );
    }

    private persistSession(token: string, user: User) {
        this.accessToken = token;
        this.user$.next(user);
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    private restoreSession() {
        const storedToken = localStorage.getItem(this.TOKEN_KEY);
        const storedUser = localStorage.getItem(this.USER_KEY);
        if (storedToken && storedUser) {
            try {
                const user: User = JSON.parse(storedUser);
                this.accessToken = storedToken;
                this.user$.next(user);
            } catch {
                localStorage.removeItem(this.TOKEN_KEY);
                localStorage.removeItem(this.USER_KEY);
            }
        }
    }
}
