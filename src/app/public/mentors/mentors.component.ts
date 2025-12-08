import { Component, OnInit } from '@angular/core';
import { Mentor, MentorService } from '../../core/services/mentor.service';

@Component({
    selector: 'app-mentors',
    templateUrl: './mentors.component.html',
    styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {
    selectedCategory = 'all';
    searchQuery = '';
    sortBy = 'rating';
    searchShortcuts = ['React', 'Product Strategy', 'UX Research', 'Data Science'];
    sortOptions = [
        { id: 'rating', label: 'Top rated' },
        { id: 'sessions', label: 'Most sessions' },
        { id: 'price-low', label: 'Budget friendly' },
        { id: 'price-high', label: 'Premium' }
    ];

    categories = [
        { id: 'all', name: 'All Mentors', icon: '🌟' },
        { id: 'frontend', name: 'Frontend', icon: '🎨' },
        { id: 'backend', name: 'Backend', icon: '⚙️' },
        { id: 'design', name: 'Design', icon: '✨' },
        { id: 'product', name: 'Product', icon: '📱' },
        { id: 'data', name: 'Data Science', icon: '📊' }
    ];

    allMentors: Mentor[] = [];

    constructor(private mentorService: MentorService) { }

    ngOnInit() {
        this.mentorService.getMentors().subscribe(mentors => {
            this.allMentors = mentors;
        });
    }

    get selectedSortLabel(): string {
        return this.sortOptions.find(o => o.id === this.sortBy)?.label ?? '';
    }

    get filteredMentors(): Mentor[] {
        // work on a shallow copy to avoid mutating source during sort
        let filtered = [...this.allMentors];

        // Filter by category
        if (this.selectedCategory !== 'all') {
            const category = this.selectedCategory.toLowerCase();
            filtered = filtered.filter(m =>
                m.expertise.some(e => e.toLowerCase().includes(category))
            );
        }

        // Filter by search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(query) ||
                m.title.toLowerCase().includes(query) ||
                m.expertise.some(e => e.toLowerCase().includes(query))
            );
        }

        // Sort
        if (this.sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (this.sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (this.sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (this.sortBy === 'sessions') {
            filtered.sort((a, b) => b.sessions - a.sessions);
        }

        return filtered;
    }

    themeClass(mentor: Mentor): string {
        const expertise = (mentor.expertise || []).map(e => e.toLowerCase());
        if (expertise.some(e => ['backend', 'node', 'api', 'cloud'].some(k => e.includes(k)))) {
            return 'theme-backend';
        }
        if (expertise.some(e => ['frontend', 'ui', 'react', 'angular', 'css'].some(k => e.includes(k)))) {
            return 'theme-frontend';
        }
        if (expertise.some(e => ['design', 'ux', 'ui/ux', 'figma'].some(k => e.includes(k)))) {
            return 'theme-design';
        }
        if (expertise.some(e => ['product', 'strategy', 'pm'].some(k => e.includes(k)))) {
            return 'theme-product';
        }
        if (expertise.some(e => ['data', 'ml', 'ai', 'analytics', 'python'].some(k => e.includes(k)))) {
            return 'theme-data';
        }
        return 'theme-default';
    }

    selectCategory(categoryId: string) {
        this.selectedCategory = categoryId;
    }

    applySearchShortcut(shortcut: string) {
        this.searchQuery = shortcut;
    }

    clearSearch() {
        this.searchQuery = '';
    }

    setSort(option: string) {
        this.sortBy = option;
    }
}
