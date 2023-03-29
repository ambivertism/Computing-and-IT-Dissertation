import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/user.schema';

export type ReminderDocument = Reminder & Document;

@Schema()
export class Reminder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  ids: number[];

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  time: string;

  @Prop()
  days: number[];
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
