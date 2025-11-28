import { Component } from '@angular/core';

@Component({
    selector: 'app-mentee-dashboard',
    template: `
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mentee-card">
        <h2 class="text-lg font-semibold mb-4 section-title">Upcoming Sessions</h2>
        <div class="flex items-center gap-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <div class="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold">JD</div>
          <div>
            <h3 class="font-medium card-heading">John Doe</h3>
            <p class="text-sm muted-text">Tomorrow, 10:00 AM • Frontend Architecture</p>
          </div>
          <button class="ml-auto px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 cta-btn">Join Room</button>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mentee-card">
        <h2 class="text-lg font-semibold mb-4 section-title">Recommended for You</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border border-gray-100 rounded-lg recommend-card">
            <div class="font-medium card-heading">Sarah Smith</div>
            <div class="text-sm muted-text">UX Design Lead</div>
          </div>
          <div class="p-4 border border-gray-100 rounded-lg recommend-card">
            <div class="font-medium card-heading">Mike Johnson</div>
            <div class="text-sm muted-text">Product Manager</div>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./mentee-dashboard.component.css']
})
export class MenteeDashboardComponent { }
