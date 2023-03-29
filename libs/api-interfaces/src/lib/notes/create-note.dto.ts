import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { User } from '../users/user.schema';

export class CreateNoteDto {
  @IsMongoId()
  @IsOptional()
  user?: User;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  note: string;
}