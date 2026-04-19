import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Patch('change-password')
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
   return  this.authService.changePassword(
      dto.username,
      dto.currentPassword,
      dto.newPassword,
    );
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
