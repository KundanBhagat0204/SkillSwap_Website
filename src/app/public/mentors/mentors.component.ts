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

    get filteredMentors(): Mentor[] {
        let filtered = this.allMentors;

        // Filter by category
        if (this.selectedCategory !== 'all') {
            filtered = filtered.filter(m =>
                m.expertise.some(e => e.toLowerCase().includes(this.selectedCategory))
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

    selectCategory(categoryId: string) {
        this.selectedCategory = categoryId;
    }
}
