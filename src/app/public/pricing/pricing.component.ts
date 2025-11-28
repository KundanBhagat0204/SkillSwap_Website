import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface PricingPlan {
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
    cta: string;
}

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
    plans: PricingPlan[] = [
        {
            name: 'Free',
            price: 0,
            period: 'month',
            description: 'Perfect for trying out SkillSwap',
            features: [
                '1 session per month',
                'Access to basic mentors',
                'Community support',
                'Session notes',
                'Email support'
            ],
            popular: false,
            cta: 'Get Started'
        },
        {
            name: 'Pro',
            price: 49,
            period: 'month',
            description: 'Best for regular learners',
            features: [
                '5 sessions per month',
                'Access to all mentors',
                'Priority booking',
                'Session recordings',
                'Chat support',
                '1 Golden Ticket'
            ],
            popular: true,
            cta: 'Start Pro Trial'
        },
        {
            name: 'Premium',
            price: 99,
            period: 'month',
            description: 'For serious skill development',
            features: [
                'Unlimited sessions',
                'VIP mentor access',
                '24/7 priority support',
                'Session recordings',
                'Advanced analytics',
                '3 Golden Tickets',
                'Custom learning path'
            ],
            popular: false,
            cta: 'Go Premium'
        }
    ];

    faqs = [
        {
            question: 'Can I change my plan later?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
        },
        {
            question: 'What happens to unused sessions?',
            answer: 'Unused sessions roll over to the next month for Pro and Premium plans. Free plan sessions do not roll over.'
        },
        {
            question: 'Can I cancel anytime?',
            answer: 'Absolutely! There are no long-term commitments. You can cancel your subscription at any time.'
        },
        {
            question: 'What are Golden Tickets?',
            answer: 'Golden Tickets let you gift 1 month of Premium access to friends. They\'re a great way to share SkillSwap!'
        },
        {
            question: 'Do you offer refunds?',
            answer: 'Yes, we offer a 14-day money-back guarantee on all paid plans. No questions asked.'
        }
    ];

    constructor(private router: Router) { }

    selectPlan(plan: PricingPlan) {
        // Navigate to register with plan parameter
        this.router.navigate(['/auth/register'], {
            queryParams: { plan: plan.name.toLowerCase() }
        });
    }
}
