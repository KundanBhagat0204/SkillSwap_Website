import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'skill-swap';
  openMobile = false;
  currentYear = new Date().getFullYear();
  showReferralModal = false;
  isMentor = false;

  private userSub?: Subscription;

  constructor(public themeService: ThemeService, private auth: AuthService) {
    this.themeService.loadSavedTheme();
  }

  ngOnInit(): void {
    if (!this.auth.isAuthenticated) {
      this.auth.login('admin@gmail.com', '12345678').subscribe({
        next: () => { },
        error: () => { }
      });
    }

    this.userSub = this.auth.currentUser$.subscribe(user => {
      this.isMentor = !!user?.roles.includes('mentor');
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  openReferralModal(): void {
    this.showReferralModal = true;
  }

  closeReferralModal(): void {
    this.showReferralModal = false;
  }
}
