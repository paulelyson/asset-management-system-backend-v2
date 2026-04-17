import { UserRoleDto } from 'src/user/dto/create-user.dto';
import { UserRole } from 'src/user/enums/role.enum';

/**
 * Checks if a user has a specific role within a specific department.
 */
export const hasRole = (
  role: UserRole,
  departmentId: string,
  roles: UserRoleDto[],
): boolean =>
  roles.some((r) => r.role === role && r.department === departmentId);
