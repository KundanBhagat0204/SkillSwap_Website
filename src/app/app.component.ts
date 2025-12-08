import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { AuthService } from './auth/auth.service';
import { Mentor, MentorService } from './core/services/mentor.service';
import { Router } from '@angular/router';

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
  searchQuery = '';
  filteredMentors: Mentor[] = [];
  private allMentors: Mentor[] = [];
  showSearchPanel = false;
  private searchCloseTimeout?: ReturnType<typeof setTimeout>;
  searchShortcuts = ['React', 'Angular', 'UX Research', 'Data Science'];

  private userSub?: Subscription;

  constructor(
    public themeService: ThemeService,
    private auth: AuthService,
    private mentorService: MentorService,
    private router: Router
  ) {
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

    this.mentorService.getMentors().subscribe(mentors => {
      this.allMentors = mentors;
      this.updateSearchResults();
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    if (this.searchCloseTimeout) {
      clearTimeout(this.searchCloseTimeout);
    }
  }

  openReferralModal(): void {
    this.showReferralModal = true;
  }

  closeReferralModal(): void {
    this.showReferralModal = false;
  }

  onSearchFocus(): void {
    if (this.searchCloseTimeout) {
      clearTimeout(this.searchCloseTimeout);
    }
    this.showSearchPanel = !!this.searchQuery.trim();
  }

  onSearchBlur(): void {
    this.searchCloseTimeout = setTimeout(() => {
      this.showSearchPanel = false;
    }, 150);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.updateSearchResults();
    this.showSearchPanel = !!this.searchQuery.trim();
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submitSearch();
    } else if (event.key === 'Escape') {
      this.showSearchPanel = false;
    }
  }

  submitSearch(): void {
    const trimmedQuery = this.searchQuery.trim();
    if (!trimmedQuery) {
      return;
    }

    if (this.filteredMentors.length) {
      this.navigateToMentor(this.filteredMentors[0]);
    } else {
      this.router.navigate(['/mentors'], { queryParams: { q: trimmedQuery } });
    }
    this.showSearchPanel = false;
  }

  viewAllResults(): void {
    const trimmedQuery = this.searchQuery.trim();
    this.router.navigate(['/mentors'], { queryParams: trimmedQuery ? { q: trimmedQuery } : undefined });
    this.showSearchPanel = false;
  }

  navigateToMentor(mentor: Mentor): void {
    this.router.navigate(['/mentors', mentor.id]);
    this.showSearchPanel = false;
  }

  applySearchShortcut(shortcut: string): void {
    this.searchQuery = shortcut;
    this.updateSearchResults();
    this.showSearchPanel = true;
  }

  private updateSearchResults(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredMentors = [];
      return;
    }

    this.filteredMentors = this.allMentors
      .filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.title.toLowerCase().includes(query) ||
        m.expertise.some(e => e.toLowerCase().includes(query))
      )
      .slice(0, 6);
  }
}
