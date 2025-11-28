import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private auth: AuthService, private router: Router) { }

    private check(routeRoles?: string[]): boolean {
        const token = this.auth.getAccessToken();
        if (!token) {
            const returnUrl = this.router.url;
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl } });
            return false;
        }
        // Optionally check roles if routeRoles provided and user exists
        if (routeRoles?.length) {
            // const user = (this.auth as any).user$?.value as any;
            // if (!user || !routeRoles.some(r => user.roles.includes(r))) {
            //   this.router.navigate(['/']);
            //   return false;
            // }
        }
        return true;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const roles = (route.data && route.data['roles']) ?? [];
        return this.check(roles);
    }

    canLoad(route: Route): boolean {
        const roles = (route.data && (route.data['roles'] as string[])) ?? [];
        return this.check(roles);
    }
}
