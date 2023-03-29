import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import { User } from '../users/user.schema';

export class CreateMoodDto {
  @IsMongoId()
  @IsOptional()
  user?: User;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(7)
  mood: number;
}