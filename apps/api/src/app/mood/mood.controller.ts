import { CreateMoodDto, UpdateMoodDto } from '@mood-tracker/api-interfaces';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { MoodService } from '../mood/mood.service';

@Controller('mood')
@UseGuards(AuthGuard())
export class MoodController {
  constructor(private moodService: MoodService) {}

  @Get()
  async getAllMoods(@Request() req) {
    return await this.moodService.getAllMoods(req.user);
  }

  @Get('/:date')
  async getMoodByDate(@Request() req, @Param('date') date: string) {
    return await this.moodService.getMoodByDate(req.user, date);
  }

  @Patch('/:id')
  async updateMood(@Request() req, @Param('id') id, @Body() body: UpdateMoodDto) {
    return await this.moodService.updateMood(id, req.user, body);
  }
  
  @Post()
  async createMood(@Request() req, @Body() body: CreateMoodDto) {
    return await this.moodService.createMood(req.user, body);
  }

  @Delete('/:id')
  async deleteMood(@Request() req, @Param('id') id) {
    return await this.moodService.deleteMood(req.user, id);
  }
}
