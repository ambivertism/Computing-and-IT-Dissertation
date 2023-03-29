import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateReminderDto {
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