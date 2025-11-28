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
}
