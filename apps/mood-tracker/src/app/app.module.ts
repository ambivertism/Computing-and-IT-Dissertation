import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'portal',
    loadChildren: () =>
      import('./portal/portal.module').then((m) => m.PortalModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, NgChartsModule],
  providers: [LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
