import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteDocument } from '@mood-tracker/api-interfaces';
import { Subscription } from 'rxjs';
import { NotesService } from '../notes.service';

@Component({
  selector: 'mood-tracker-view-all-notes',
  templateUrl: './view-all-notes.component.html',
  styleUrls: ['./view-all-notes.component.css']
})
export class ViewAllNotesComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  notes: NoteDocument[] = [];

  constructor(
    private service: NotesService,
  ) {}

  failureMessage: string | undefined;

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.subscriptions.add(
      this.service.getAllNotes().subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log('Response: ', response);
            this.notes = response.body as NoteDocument[];
          }
        },
        error: () => (this.failureMessage = 'An error ocurred, sorry.'),
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}