import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor(private auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getAccessToken();
        let cloned = req;
        if (token) {
            cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }

        return next.handle(cloned).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401 && !req.url.includes('/api/auth/login') && !req.url.includes('/api/auth/refresh')) {
                    if (!this.isRefreshing) {
                        this.isRefreshing = true;
                        return this.auth.refreshAccessToken().pipe(
                            switchMap((res) => {
                                this.isRefreshing = false;
                                const newToken = res.accessToken;
                                const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
                                return next.handle(retryReq);
                            }),
                            catchError((refreshErr) => {
                                this.isRefreshing = false;
                                this.auth.logout();
                                this.router.navigate(['/auth/login']);
                                return throwError(() => refreshErr);
                            })
                        );
                    }
                }
                return throwError(() => err);
            })
        );
    }
}
