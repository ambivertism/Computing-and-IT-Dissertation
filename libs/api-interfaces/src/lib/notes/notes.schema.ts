import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { User } from '../users/user.schema';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  note: string;

  @Prop()
  date: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note).index({user: 1, date: 1}, {unique: true});