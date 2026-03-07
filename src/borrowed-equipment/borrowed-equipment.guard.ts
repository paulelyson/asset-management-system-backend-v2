import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class TransactionUpdateGuard implements CanActivate {
  constructor(private usersService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    const user = request.user;

    // // if not changing status to approved → allow
    // if (body.status !== 'approved') {
    //   return true;
    // }

    // // if trying to approve → check roles
    // const dbUser = await this.usersService.findById(user.id);

    // if (!dbUser.roles.includes('admin')) {
    //   throw new ForbiddenException(
    //     'Only admins can approve transactions',
    //   );
    // }

    return true;
  }
}