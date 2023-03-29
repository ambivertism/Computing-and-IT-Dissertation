import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { User } from '../users/user.schema';

export type MoodDocument = Mood & Document;

@Schema()
export class Mood {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  date: string;

  @Prop()
  mood: number;
}

export const MoodSchema = SchemaFactory.createForClass(Mood).index({user: 1, date: 1}, {unique: true});
