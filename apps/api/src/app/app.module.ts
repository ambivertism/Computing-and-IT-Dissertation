import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RemindersModule } from './reminders/reminders.module';
import { MoodModule } from './mood/mood.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env['api_url'] || 'mongodb://localhost:27017', {
      user: 'admin',
      pass: 'password',
      autoIndex: true,
    }),
    RemindersModule,
    MoodModule,
    NoteModule,
  ],
})
export class AppModule {}
