import { Component } from '@angular/core';

interface ChartPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css']
})
export class MentorDashboardComponent {
  // Statistics Data
  stats = {
    totalEarnings: 12450.00,
    sessionsCompleted: 47,
    rating: 4.9,
    totalStudents: 32
  };

  // Monthly Earnings Data (for chart)
  monthlyEarnings = [
    { month: 'Jan', amount: 1200, color: '#93c5fd' },
    { month: 'Feb', amount: 1800, color: '#60a5fa' },
    { month: 'Mar', amount: 1500, color: '#818cf8' },
    { month: 'Apr', amount: 2100, color: '#6366f1' },
    { month: 'May', amount: 2400, color: '#7c3aed' },
    { month: 'Jun', amount: 3450, color: '#c026d3' }
  ];

  private chartDimensions = { width: 320, height: 140 };

  // Session Distribution
  sessionsByTopic = [
    { topic: 'Frontend', count: 18, percentage: 38 },
    { topic: 'Backend', count: 12, percentage: 26 },
    { topic: 'DevOps', count: 10, percentage: 21 },
    { topic: 'Design', count: 7, percentage: 15 }
  ];

  // Upcoming Sessions
  upcomingSessions = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      topic: 'React Advanced Patterns',
      date: '2025-11-29',
      time: '10:00 AM',
      duration: '60 min',
      avatar: 'AJ'
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      topic: 'Node.js Performance',
      date: '2025-11-29',
      time: '2:00 PM',
      duration: '45 min',
      avatar: 'BS'
    },
    {
      id: 3,
      studentName: 'Carol White',
      topic: 'UI/UX Best Practices',
      date: '2025-11-30',
      time: '11:00 AM',
      duration: '60 min',
      avatar: 'CW'
    }
  ];

  // Recent Reviews
  recentReviews = [
    {
      studentName: 'David Lee',
      rating: 5,
      comment: 'Excellent mentor! Very knowledgeable and patient.',
      date: '2 days ago'
    },
    {
      studentName: 'Emma Davis',
      rating: 5,
      comment: 'Great session, learned a lot about React hooks.',
      date: '5 days ago'
    }
  ];

  getMaxEarning(): number {
    return Math.max(...this.monthlyEarnings.map(e => e.amount));
  }

  getBarHeight(amount: number): number {
    return (amount / this.getMaxEarning()) * 100;
  }

  getChartViewBox(): string {
    return `0 0 ${this.chartDimensions.width} ${this.chartDimensions.height}`;
  }

  getLinePath(): string {
    const points = this.getChartPoints();
    if (!points.length) {
      return '';
    }
    return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  }

  getAreaPath(): string {
    const points = this.getChartPoints();
    if (!points.length) {
      return '';
    }
    const { height } = this.chartDimensions;
    const start = `M ${points[0].x} ${height}`;
    const mid = points.map(point => `L ${point.x} ${point.y}`).join(' ');
    const end = `L ${points[points.length - 1].x} ${height} Z`;
    return `${start} ${mid} ${end}`;
  }

  getPointX(index: number): number {
    return this.getChartPoints()[index]?.x ?? 0;
  }

  getPointY(index: number): number {
    return this.getChartPoints()[index]?.y ?? this.chartDimensions.height;
  }

  private getChartPoints(): ChartPoint[] {
    const { width, height } = this.chartDimensions;
    const max = this.getMaxEarning() || 1;
    const step = this.monthlyEarnings.length > 1
      ? width / (this.monthlyEarnings.length - 1)
      : width;

    return this.monthlyEarnings.map((entry, index) => {
      const ratio = entry.amount / max;
      return {
        x: parseFloat((index * step).toFixed(2)),
        y: parseFloat((height - (ratio * height)).toFixed(2))
      };
    });
  }
}
