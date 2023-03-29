import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

import { ManageComponent } from './manage/manage.component';
import { RemindersComponent } from './reminders.component';
import { ViewAllComponent } from './view-all/view-all.component';

const routes: Routes = [
  { path: '', component: RemindersComponent, children: [
    { path: '', component: ViewAllComponent },
    { path: 'create', component: ManageComponent },
    { path: 'update/:id', component: ManageComponent }
  ]}
];

@NgModule({
  declarations: [
    RemindersComponent,
    ViewAllComponent,
    ManageComponent,
  ],
  providers: [
    LocalNotifications
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class RemindersModule {}
