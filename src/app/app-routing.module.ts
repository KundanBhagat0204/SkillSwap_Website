import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guard for protected routes
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'mentors', loadChildren: () => import('./public/mentors/mentors.module').then(m => m.MentorsModule) },
  { path: 'booking', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canLoad: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'chatbot', loadChildren: () => import('./chatbot/chatbot.module').then(m => m.ChatbotModule) },
  { path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'mentees', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'reviews', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
