import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { MoodsComponent } from './moods.component';
import { ViewAllMoodsComponent } from './view-all-moods/view-all-moods.component';



@NgModule({
  declarations: [MoodsComponent, ViewAllMoodsComponent],
  imports: [ReactiveFormsModule, CommonModule, NgChartsModule, RouterModule],
  exports: [MoodsComponent],
})
export class MoodsModule {}
