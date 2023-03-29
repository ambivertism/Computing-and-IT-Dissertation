import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

import { User } from '../users/user.schema';

export class UpdateMoodDto {
  @IsMongoId()
  @IsOptional()
  user?: User;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(7)
  mood: number;
}