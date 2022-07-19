import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PortalComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'reminders', loadChildren: () => import('./reminders/reminders.module').then(m => m.RemindersModule) }
  ]}
];

@NgModule({
  declarations: [PortalComponent, DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PortalModule {}
