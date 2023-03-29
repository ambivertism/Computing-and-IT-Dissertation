import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'mood-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
// removes default use of device back button as components weren't loading properly.
  ngOnInit(): void {
    this.renderer.listen('document', 'backbutton', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
}
