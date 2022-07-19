import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersComponent } from './reminders.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewOneComponent } from './view-one/view-one.component';
import { ManageComponent } from './manage/manage.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

const routes: Routes = [
  { path: '', component: RemindersComponent, children: [
    { path: '', component: ViewAllComponent },
    { path: 'view-one/:id', component: ViewOneComponent },
    { path: 'create', component: ManageComponent },
    { path: 'update/:id', component: ManageComponent }
  ]}
];

@NgModule({
  declarations: [
    RemindersComponent,
    ViewAllComponent,
    ViewOneComponent,
    ManageComponent,
  ],
  providers: [
    LocalNotifications
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class RemindersModule {}
