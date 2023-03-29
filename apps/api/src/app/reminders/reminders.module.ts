import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reminder, ReminderSchema } from '@mood-tracker/api-interfaces';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Reminder.name, schema: ReminderSchema }])],
  providers: [RemindersService],
  controllers: [RemindersController],
})
export class RemindersModule {}
