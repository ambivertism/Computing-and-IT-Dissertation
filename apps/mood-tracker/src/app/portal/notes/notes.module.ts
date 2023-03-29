import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewAllNotesComponent } from './view-all-notes/view-all-notes.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NotesComponent, ViewAllNotesComponent],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  exports: [NotesComponent],
})
export class NotesModule {}
