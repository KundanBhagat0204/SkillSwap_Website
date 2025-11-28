import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Mentor {
    id: string;
    name: string;
    title: string;
    expertise: string[];
    rating: number;
    sessions: number;
    price: number;
    avatar: string;
    available: boolean;
    bio: string;
}

@Injectable({
    providedIn: 'root'
})
export class MentorService {
    private mentors: Mentor[] = [
        {
            id: '1',
            name: 'Sarah Johnson',
            title: 'Senior Frontend Engineer',
            expertise: ['Frontend', 'React', 'TypeScript', 'UI/UX'],
            rating: 4.9,
            sessions: 127,
            price: 120,
            avatar: 'SJ',
            available: true,
            bio: 'Helping developers master modern frontend development'
        },
        {
            id: '2',
            name: 'Michael Chen',
            title: 'Backend Architect',
            expertise: ['Backend', 'Node.js', 'AWS', 'Microservices'],
            rating: 4.8,
            sessions: 98,
            price: 150,
            avatar: 'MC',
            available: true,
            bio: 'Scalable backend systems and cloud architecture expert'
        },
        {
            id: '3',
            name: 'Emily Rodriguez',
            title: 'UX Design Lead',
            expertise: ['Design', 'Figma', 'User Research', 'Prototyping'],
            rating: 5.0,
            sessions: 156,
            price: 100,
            avatar: 'ER',
            available: false,
            bio: 'Creating delightful user experiences through design'
        },
        {
            id: '4',
            name: 'David Kim',
            title: 'Product Manager',
            expertise: ['Product', 'Strategy', 'Analytics', 'Roadmapping'],
            rating: 4.7,
            sessions: 84,
            price: 130,
            avatar: 'DK',
            available: true,
            bio: 'Building products that users love'
        },
        {
            id: '5',
            name: 'Lisa Wang',
            title: 'Data Scientist',
            expertise: ['Data Science', 'Python', 'ML', 'Data Viz'],
            rating: 4.9,
            sessions: 112,
            price: 140,
            avatar: 'LW',
            available: true,
            bio: 'Turning data into actionable insights'
        },
        {
            id: '6',
            name: 'James Anderson',
            title: 'Full Stack Developer',
            expertise: ['Frontend', 'Backend', 'Angular', 'NestJS'],
            rating: 4.6,
            sessions: 73,
            price: 110,
            avatar: 'JA',
            available: true,
            bio: 'End-to-end web application development'
        }
    ];

    constructor() { }

    getMentors(): Observable<Mentor[]> {
        return of(this.mentors);
    }

    getMentorById(id: string): Observable<Mentor | undefined> {
        return of(this.mentors.find(m => m.id === id));
    }
}
