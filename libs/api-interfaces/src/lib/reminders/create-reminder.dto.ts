import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { User } from '../users/user.schema';

export class CreateReminderDto {
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  user?: User;

  @IsArray()
  @IsNumber(undefined, { each: true })
  @IsNotEmpty()
  ids: number[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsArray()
  @IsNumber(undefined, { each: true })
  days: number[];
}