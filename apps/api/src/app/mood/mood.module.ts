import { Mood, MoodSchema } from '@mood-tracker/api-interfaces';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Mood.name, schema: MoodSchema}])],
  controllers: [MoodController],
  providers: [MoodService],
})
export class MoodModule {}
