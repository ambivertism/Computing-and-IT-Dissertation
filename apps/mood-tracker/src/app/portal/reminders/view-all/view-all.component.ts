import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mood-tracker-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  reminders: any;

  constructor() { }

  ngOnInit(): void {
  }

}
