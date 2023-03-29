import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../users/user.schema';

export class UpdateNoteDto {
  @IsMongoId()
  @IsOptional()
  user?: User;

  @IsString()
  @IsNotEmpty()
  note: string;
}