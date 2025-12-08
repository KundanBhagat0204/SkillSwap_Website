import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mentor, MentorService } from '../../core/services/mentor.service';

@Component({
    selector: 'app-mentor-profile',
    templateUrl: './mentor-profile.component.html',
    styleUrls: ['./mentor-profile.component.css']
})
export class MentorProfileComponent implements OnInit {
    mentor: Mentor | undefined;

    constructor(
        private route: ActivatedRoute,
        private mentorService: MentorService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.mentorService.getMentorById(id).subscribe(mentor => {
                this.mentor = mentor;
            });
        }
    }

    themeClass(mentor: Mentor | undefined): string {
        if (!mentor) { return 'theme-default'; }
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
}
