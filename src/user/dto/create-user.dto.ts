import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEmail,
  IsEnum,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsMongoId,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '../enums/role.enum';

export class UserRoleDto {
  @IsEnum(UserRole, {
    message: `role must be one of: ${Object.values(UserRole).join(', ')}`,
  })
  @IsNotEmpty()
  role: UserRole;

  @IsMongoId({ message: 'department must be a valid MongoDB ObjectId' })
  @IsNotEmpty()
  department: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @Min(1)
  @Max(120)
  @IsNotEmpty()
  age: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one role must be assigned' })
  @ValidateNested({ each: true })
  @Type(() => UserRoleDto)
  roles: UserRoleDto[];

  @IsString()
  @IsNotEmpty()
  password: string;
}