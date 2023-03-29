import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateMoodDto, MoodDocument, UpdateMoodDto } from '@mood-tracker/api-interfaces';
import { Observable, Subscription } from 'rxjs';

import { MoodsService } from './moods.service';

@Component({
  selector: 'mood-tracker-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.css'],
})
export class MoodsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  id: string | undefined;

  isUpdate = false;

  moodForm = this.formBuilder.group({
    mood: '',
  });

  moods = [1, 2, 3, 4, 5, 6, 7];

  moodSelected: number | undefined;

  failureMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: MoodsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.service.getMoodByDate(new Date().toISOString().slice(0, 10)).subscribe(resp => {console.log(resp)
      if (resp.body) {
        this.isUpdate = true;
        this.id = resp.body._id;
        this.moodSelected = resp.body.mood;
        this.moodForm.controls['mood'].setValue(resp.body.mood.toString())
      }
     })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  radioChange(mood: number): void {
    if (this.moodForm.value.mood) {
      this.failureMessage = undefined;
    }
    this.moodSelected = mood;
  }

  onSubmit(): void {
    const mood = parseInt(this.moodForm.value.mood);
    console.log(mood, typeof mood);
    if (isNaN(mood)) {
      this.failureMessage = 'Please select a mood';
      return;
    }
    const date = new Date().toISOString().slice(0, 10);
    const moodDto = { mood };
    if (!this.isUpdate) {
      moodDto['date'] = date;
      console.log(moodDto);
    }
    this.subscriptions.add(
      this.getRequest(moodDto).subscribe({
        next: (response) => {
          if (response.status === 201 || response.status === 200) {
            console.log(response);
            this.isUpdate = true;
            if (response.body) {
              this.id = response.body._id;
              console.log(response);
            }
          }
        },
        error: () => (this.failureMessage = 'An error occurred, sorry.'),
      })
    );
  }

  getRequest(moodDto: CreateMoodDto | UpdateMoodDto): Observable<HttpResponse<MoodDocument>> {
    if (this.isUpdate) {
      return this.service.updateMood(moodDto, this.id as string)
    } else {
      return this.service.submitMood(moodDto as CreateMoodDto)
    }
  }
}
