import { CreateMoodDto, Mood, MoodDocument, UpdateMoodDto, User, UserDocument } from '@mood-tracker/api-interfaces';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoodService {
  constructor(
    @InjectModel(Mood.name)
    private moodModel: Model<MoodDocument>,
  ) {}

  async getAllMoods(user: User): Promise<MoodDocument[]> {
    try {
      const allMoods = await this.moodModel.find(
        { user }
      );
      return allMoods;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
      }
    }
  
  async getMoodByDate(user: UserDocument, date: string): Promise<MoodDocument> {
    try {
      const mood = await this.moodModel.findOne(
        { user, date },
      );
      return mood;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }

  async createMood(user: User, createMoodDto: CreateMoodDto): Promise<MoodDocument> {
    createMoodDto.user = user;
    try {
      const moodCreated =  await this.moodModel.create(createMoodDto);
      return moodCreated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }
  
  async updateMood(id: string, user: User, updateMoodDto: UpdateMoodDto): Promise<MoodDocument> {
    console.log(id)
    console.log(updateMoodDto)
    try {
      const moodUpdated =  await this.moodModel.findOneAndUpdate(
        { _id: id, user },
        updateMoodDto,
        { new: true }
        );
        console.log(moodUpdated)
      return moodUpdated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }

  async deleteMood(user: User, id: string): Promise<void> {
    try {
      const moodDeleted = await this.moodModel.findOneAndDelete(
        { user, _id: id }
      );
      if (!moodDeleted) {
        throw new NotFoundException;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException;
    }
  }}
