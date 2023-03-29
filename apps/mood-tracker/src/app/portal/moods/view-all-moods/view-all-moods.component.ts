import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoodDocument } from '@mood-tracker/api-interfaces';
import { ChartConfiguration } from 'chart.js';
import { Subscription } from 'rxjs';
import { MoodsService } from '../moods.service';

@Component({
  selector: 'mood-tracker-view-all-moods',
  templateUrl: './view-all-moods.component.html',
  styleUrls: ['./view-all-moods.component.css'],
})
export class ViewAllMoodsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  moods: MoodDocument[] = [];

  constructor(private service: MoodsService) {}

  failureMessage: string | undefined;

  lineChartData: ChartConfiguration<'line'>['data'] | undefined;

  ngOnInit(): void {
    this.getMoods();
  }

  getMoods(): void {
    this.subscriptions.add(
      this.service.getMoods().subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log('Response: ', response);
            this.moods = response.body as MoodDocument[];
            const dates = this.moods.map((mood) => mood.date);
            const moods = this.moods.map((mood) => mood.mood);
            this.buildChart(dates, moods);
          }
        },
        error: () => (this.failureMessage = 'An error ocurred, sorry.'),
      })
    );
  }

  buildChart(dates: string[], moods: number[]) {
    this.lineChartData = {
      labels: dates.reverse(),
      datasets: [
        {
          data: moods.reverse(),
          label: 'Moods logged over time',
          fill: false,
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
