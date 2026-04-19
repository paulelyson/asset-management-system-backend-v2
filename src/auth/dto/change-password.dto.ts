import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
 @IsString()
  username: string;

  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(5)
  newPassword: string;
}