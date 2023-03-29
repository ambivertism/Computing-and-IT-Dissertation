import { Note, NoteSchema } from '@mood-tracker/api-interfaces';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema}])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
