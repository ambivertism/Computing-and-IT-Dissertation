import { CreateNoteDto, UpdateNoteDto } from '@mood-tracker/api-interfaces';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { NoteService } from './note.service';

@Controller('note')
@UseGuards(AuthGuard())
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async getAllNotes(@Request() req) {
    return await this.noteService.getAllNotes(req.user);
  }

  @Get('/:date')
  async getNoteByDate(@Request() req, @Param('date') date: string) {
    return await this.noteService.getNoteByDate(req.user, date);
  }
  
  @Post()
  async createNote(@Request() req, @Body() body: CreateNoteDto) {
    return await this.noteService.createNote(req.user, body);
  }

  @Patch('/:id')
  async updateNote(@Request() req, @Param('id') id, @Body() body: UpdateNoteDto) {
    return await this.noteService.updateNote(req.user, id, body);
  }

  @Delete('/:id')
  async deleteNote(@Request() req, @Param('id') id) {
    return await this.noteService.deleteNote(req.user, id);
  }
}
