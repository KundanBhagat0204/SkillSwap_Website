import { Component, OnInit } from '@angular/core';

interface Session {
    id: string;
    mentorName: string;
    mentorAvatar: string;
    date: Date;
    time: string;
    duration: number;
    price: number;
    status: 'booked' | 'ongoing' | 'canceled' | 'completed';
    topic?: string;
}

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    activeTab: 'booked' | 'ongoing' | 'canceled' | 'completed' = 'booked';

    // Mock data - in real app, fetch from API
    allSessions: Session[] = [
        {
            id: '1',
            mentorName: 'Sarah Johnson',
            mentorAvatar: 'SJ',
            date: new Date('2025-12-05'),
            time: '10:00 AM - 11:00 AM',
            duration: 60,
            price: 100,
            status: 'booked',
            topic: 'Angular Advanced Concepts'
        },
        {
            id: '2',
            mentorName: 'Michael Chen',
            mentorAvatar: 'MC',
            date: new Date('2025-12-01'),
            time: '2:00 PM - 3:00 PM',
            duration: 60,
            price: 80,
            status: 'booked',
            topic: 'React State Management'
        },
        {
            id: '3',
            mentorName: 'Emily Rodriguez',
            mentorAvatar: 'ER',
            date: new Date(),
            time: '11:00 AM - 12:00 PM',
            duration: 60,
            price: 90,
            status: 'ongoing',
            topic: 'System Design Interview Prep'
        },
        {
            id: '4',
            mentorName: 'David Kim',
            mentorAvatar: 'DK',
            date: new Date('2025-11-20'),
            time: '3:00 PM - 4:00 PM',
            duration: 60,
            price: 75,
            status: 'canceled',
            topic: 'Node.js Performance Optimization'
        },
        {
            id: '5',
            mentorName: 'Lisa Wang',
            mentorAvatar: 'LW',
            date: new Date('2025-11-15'),
            time: '1:00 PM - 2:00 PM',
            duration: 60,
            price: 95,
            status: 'completed',
            topic: 'TypeScript Best Practices'
        }
    ];

    ngOnInit(): void {
        // Load sessions from API in real implementation
    }

    get bookedSessions(): Session[] {
        return this.allSessions.filter(s => s.status === 'booked');
    }

    get ongoingSessions(): Session[] {
        return this.allSessions.filter(s => s.status === 'ongoing');
    }

    get canceledSessions(): Session[] {
        return this.allSessions.filter(s => s.status === 'canceled');
    }

    get completedSessions(): Session[] {
        return this.allSessions.filter(s => s.status === 'completed');
    }

    setActiveTab(tab: 'booked' | 'ongoing' | 'canceled' | 'completed'): void {
        this.activeTab = tab;
    }

    cancelSession(sessionId: string): void {
        const session = this.allSessions.find(s => s.id === sessionId);
        if (session && session.status === 'booked') {
            session.status = 'canceled';
        }
    }

    joinSession(sessionId: string): void {
        // Navigate to session room or open meeting link
        console.log('Joining session:', sessionId);
    }

    rescheduleSession(sessionId: string): void {
        // Navigate to reschedule page
        console.log('Rescheduling session:', sessionId);
    }
}
