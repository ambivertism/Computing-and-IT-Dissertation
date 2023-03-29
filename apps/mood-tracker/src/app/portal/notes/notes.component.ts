import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateNoteDto, NoteDocument, UpdateNoteDto } from '@mood-tracker/api-interfaces';
import { Observable, Subscription } from 'rxjs';
import { NotesService } from './notes.service';

@Component({
  selector: 'mood-tracker-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  noteForm = this.formBuilder.group({
    note: '',
  });

  id: string | undefined;

  failureMessage: string | undefined;

  isUpdate = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: NotesService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
      this.subscriptions.add(
        this.service.getNoteByDate(new Date().toISOString().slice(0, 10)).subscribe(resp => {console.log(resp)
        if (resp.body) {
          this.isUpdate = true;
          this.id = resp.body._id;
          this.noteForm.controls['note'].setValue(resp.body.note.toString())
        }
      })
    );
  }

  onSubmit(): void {
    const note = this.noteForm.value.note.toString();
    if (note == '') {
      this.failureMessage = 'Note must not be empty';
      return;
    }
    // attempt at fomatting date before learning 'slice' below
    // const datetime = new Date().toISOString();
    // const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
    // const datestring = JSON.stringify(datetime.match(regex));
    // const dateEdit = datestring.replace('[', '');
    // const date = dateEdit.replace(']', '');

    // implementation of 'slice'
    const date = new Date().toISOString().slice(0, 10);
    const noteDto = { note };
    if (!this.isUpdate) {
      noteDto['date'] = date;
      console.log(noteDto);
    }
    this.subscriptions.add(
      this.getRequest(noteDto).subscribe({
        next: (response) => {
          if (response.status === 201 || response.status === 201) {
            this.isUpdate = true;
            if (response.body) {
              this.id = response.body._id;
            }
            console.log(response);
          }
        },
        error: () => (this.failureMessage = 'An error occurred, sorry.'),
      })
    );
  }

  getRequest(noteDto: CreateNoteDto | UpdateNoteDto): Observable<HttpResponse<NoteDocument>> {
    if (this.isUpdate) {
      return this.service.updateNote(noteDto, this.id as string)
    } else {
      return this.service.submitNote(noteDto as CreateNoteDto)
    }
  }
}
