import { CreateReminderDto, UpdateReminderDto } from '@mood-tracker/api-interfaces';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RemindersService } from './reminders.service';

@Controller('reminders')
@UseGuards(AuthGuard())
export class RemindersController {
  constructor(private remindersService: RemindersService) {}

  @Get()
  async getAllReminders(@Request() req) {
    return await this.remindersService.getAllReminders(req.user);
  }

  @Get('/:id')
  async getReminderById(@Request() req, @Param('id') id) {
    return await this.remindersService.getReminderById(req.user, id);
  }

  @Post()
  async createReminder(@Request() req, @Body() body: CreateReminderDto) {
    return await this.remindersService.createReminder(req.user, body);
  }

  @Put('/:id')
  async updateReminder(@Request() req, @Param('id') id, @Body() body: UpdateReminderDto) {
    return await this.remindersService.updateReminder(req.user, id, body);
  }

  @Delete('/:id')
  async deleteReminder(@Request() req, @Param('id') id) {
    return await this.remindersService.deleteReminder(req.user, id);
  }
}
