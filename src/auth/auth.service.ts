import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      _id: user._id,
      idNumber: user.idNumber,
      name: user.firstName + ' ' + user.lastName,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(
    username: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Replace with bcrypt.compare() if you're hashing passwords (you should be)
    if (user.password !== currentPassword) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    await this.userService.updatePassword(username, newPassword);
    return { message: 'Password updated successfully' };
  }
}
