import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    @ViewChild('referralSection') referralSection?: ElementRef<HTMLElement>;
    isMentor = false;
    viewAsMentor = false;

    quickActions = [
        { label: 'Orders', description: 'Manage sessions', link: '/dashboard/orders', accent: 'action-orders' },
        { label: 'Mentors', description: 'Browse experts', link: '/mentors', accent: 'action-mentors' },
        { label: 'Mentees', description: 'Your learners', link: '/mentees', accent: 'action-mentees' },
        { label: 'Sessions', description: 'Plan & track', link: '/booking', accent: 'action-sessions' }
    ];

    summaryCards = [
        { title: 'Active Mentors', value: 32, delta: '+4.2%', info: 'vs last month', link: '/mentors', accent: 'accent-blue' },
        { title: 'Active Mentees', value: 118, delta: '+2.8%', info: 'steady growth', link: '/mentees', accent: 'accent-purple' },
        { title: 'Sessions This Week', value: 54, delta: '+6.0%', info: '12 upcoming today', link: '/dashboard/orders', accent: 'accent-green' },
        { title: 'Avg. Mentor Rating', value: '4.9', delta: '+0.3', info: 'community wide', link: '/reviews', accent: 'accent-amber' }
    ];

    weeklySessions = [
        { day: 'Mon', completed: 8 },
        { day: 'Tue', completed: 10 },
        { day: 'Wed', completed: 7 },
        { day: 'Thu', completed: 12 },
        { day: 'Fri', completed: 9 },
        { day: 'Sat', completed: 5 },
        { day: 'Sun', completed: 3 }
    ];

    mentorVsMentee = [
        { label: 'Mentors', value: 68 },
        { label: 'Mentees', value: 132 }
    ];

    userHighlights = [
        { name: 'Priya Sharma', role: 'UI Mentor', status: 'Live Session', time: 'Today · 4:00 PM' },
        { name: 'Rohit Khanna', role: 'Backend Mentee', status: 'Awaiting Review', time: 'Today · 5:30 PM' },
        { name: 'Lisa Wong', role: 'Product Mentor', status: 'Session Booked', time: 'Tomorrow · 10:00 AM' }
    ];

    sessionRoadmap = [
        { title: 'React Advanced Patterns', mentor: 'Anita Rao', mentee: 'Kevin Patel', time: 'Today · 6:30 PM' },
        { title: 'API Design Sprint', mentor: 'Marcus Lee', mentee: 'Sarah Odu', time: 'Tomorrow · 9:00 AM' },
        { title: 'Portfolio Review', mentor: 'Emily Ross', mentee: 'Shaan Verma', time: 'Tomorrow · 3:30 PM' }
    ];

    mentorLeaderboard = [
        { name: 'Aditi Verma', speciality: 'Product Strategy', sessions: 148, score: 4.97 },
        { name: 'Miguel Santos', speciality: 'Cloud Architecture', sessions: 131, score: 4.92 },
        { name: 'Li Wei', speciality: 'UX Systems', sessions: 126, score: 4.88 }
    ];

    menteeLeaderboard = [
        { name: 'Rahul Jain', focus: 'Data Engineering', visits: 38, rebookRate: 72 },
        { name: 'Ella Brooks', focus: 'Design Ops', visits: 34, rebookRate: 64 },
        { name: 'Samir Khan', focus: 'Mobile Architecture', visits: 31, rebookRate: 58 }
    ];

    visitStats = {
        totalVisits: 1280,
        newVisits: 182,
        sessionBooked: 96,
        sessionRebooked: 24
    };

    mentorSessionStats = {
        conducted: 54,
        rebooked: 21,
        avgFill: '86%'
    };

    monthlySessions = [
        { month: 'Jan', booked: 32, rebooked: 11 },
        { month: 'Feb', booked: 45, rebooked: 18 },
        { month: 'Mar', booked: 41, rebooked: 15 },
        { month: 'Apr', booked: 58, rebooked: 22 },
        { month: 'May', booked: 63, rebooked: 24 },
        { month: 'Jun', booked: 54, rebooked: 20 }
    ];

    constructor(private auth: AuthService) {
        this.auth.currentUser$.subscribe(user => {
            this.isMentor = user?.roles.includes('mentor') || false;
            this.viewAsMentor = this.isMentor;
        });
    }

    private getMaxWeeklySessions(): number {
        return Math.max(...this.weeklySessions.map(day => day.completed));
    }

    getSessionBarHeight(value: number): number {
        const max = this.getMaxWeeklySessions() || 1;
        return (value / max) * 100;
    }

    getMixPercentage(value: number): number {
        const total = this.mentorVsMentee.reduce((sum, entry) => sum + entry.value, 0) || 1;
        return Math.round((value / total) * 100);
    }

    getMonthlyBarHeight(value: number): number {
        const max = Math.max(...this.monthlySessions.map(item => item.booked)) || 1;
        return (value / max) * 100;
    }

    toggleWorkspaceView(): void {
        this.viewAsMentor = !this.viewAsMentor;
    }

    scrollToReferral(): void {
        this.referralSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
