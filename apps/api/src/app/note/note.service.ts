import { CreateNoteDto, Note, NoteDocument, UpdateNoteDto, User } from '@mood-tracker/api-interfaces';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<NoteDocument>,
  ) {}

  async getAllNotes(user: User): Promise<NoteDocument[]> {
    try {
      const allNotes = await this.noteModel.find(
        { user }
      ).sort({x:1});
      return allNotes;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }
  
  async getNoteByDate(user: User, date: string): Promise<NoteDocument> {
    console.log(date)
    try {
      const note = await this.noteModel.findOne(
        { user, date },
      );
      return note;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }

  async createNote(user: User, createNoteDto: CreateNoteDto): Promise<NoteDocument> {
    createNoteDto.user = user;
    try {
      const noteCreated =  await this.noteModel.create(createNoteDto);
      return noteCreated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }

  async updateNote(user: User, id: string, updateNoteDto: UpdateNoteDto): Promise<NoteDocument> {
    updateNoteDto.user = user;
    try {
      const noteUpdated =  await this.noteModel.findOneAndUpdate(
        { user, _id: id }, 
        updateNoteDto,
        { new: true }
      );
      console.log(updateNoteDto)
      return noteUpdated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }

  async deleteNote(user: User, id: string): Promise<void> {
    try {
      const noteDeleted = await this.noteModel.findOneAndDelete(
        { user, _id: id }
      );
      if (!noteDeleted) {
        throw new NotFoundException;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }
}
