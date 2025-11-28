import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    // Steps for "How It Works" section
    steps = [
        { number: 1, title: 'Find a Mentor', description: 'Browse our mentor directory and select an expert that matches your learning goals.' },
        { number: 2, title: 'Book a Session', description: 'Choose a date and time that works for you and confirm the booking.' },
        { number: 3, title: 'Learn & Grow', description: 'Join the live session, get personalized guidance, and receive a session recap.' }
    ];

    // Benefits for "Why Choose SkillSwap?" section
    benefits = [
        { title: 'Flexible Sessions', description: 'Short, focused 45‑minute sessions that fit your schedule.' },
        { title: 'Expert Mentors', description: 'Learn from industry professionals with real‑world experience.' },
        { title: 'Affordable Pricing', description: 'Pay per session or choose a subscription plan that suits you.' },
        { title: 'Community Support', description: 'Join a vibrant community of learners and mentors.' }
    ];
}
