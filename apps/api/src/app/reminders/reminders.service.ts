import { CreateReminderDto, Reminder, ReminderDocument, UpdateReminderDto, User } from '@mood-tracker/api-interfaces';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel(Reminder.name)
    private reminderModel: Model<ReminderDocument>,
  ) {}

async getAllReminders(user: User): Promise<ReminderDocument[]> {
  try {
    const allReminders = await this.reminderModel.find(
      { user }
    );
    return allReminders;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException;
    }
  }

async getReminderById(user: User, id: string): Promise<ReminderDocument> {
  try {
    const reminder = await this.reminderModel.findById(
      { _id: id, user },
    );
    return reminder;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException;
  }
}

async createReminder(user: User, createReminderDto: CreateReminderDto): Promise<ReminderDocument> {
  createReminderDto.user = user;
  try {
    const reminderCreated = await this.reminderModel.create(createReminderDto);
    return reminderCreated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }

async updateReminder(user: User, id: string, updateReminderDto: UpdateReminderDto): Promise<ReminderDocument> {
  try {
    const reminderUpdated = await this.reminderModel.findOneAndUpdate(
      { _id: id, user },
      updateReminderDto,
      { new: true }
    );
    return reminderUpdated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }

async deleteReminder(user: User, id: string): Promise<void> {
  try {
    const reminderDeleted = await this.reminderModel.findOneAndDelete(
      { _id: id, user }
    );
    if (!reminderDeleted) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }
}
