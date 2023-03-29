import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MoodsModule } from './moods/moods.module';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { NotesModule } from './notes/notes.module';
import { ViewAllNotesComponent } from './notes/view-all-notes/view-all-notes.component';
import { ViewAllMoodsComponent } from './moods/view-all-moods/view-all-moods.component';

const routes: Routes = [
  { path: '', component: PortalComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'reminders', loadChildren: () => import('./reminders/reminders.module').then(m => m.RemindersModule) },
    { path: 'notes', component: ViewAllNotesComponent },
    { path: 'moods', component: ViewAllMoodsComponent },
  ]}
];

@NgModule({
  declarations: [PortalComponent, DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MoodsModule, NotesModule],
  providers: [LocalNotifications]
})
export class PortalModule {}
