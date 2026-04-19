import { CreateDepartmentDto } from 'src/department/dto/create-department.dto';
import { UserRole } from 'src/user/enums/role.enum';

type DeptartmentWithId = CreateDepartmentDto & { _id: string };
interface UserRoleDto {
  role: UserRole;
  department: DeptartmentWithId
}

/**
 * Checks if a user has a specific role within a specific department.
 */

export const getRole = (
  role: UserRole,
  roles: UserRoleDto[],
): UserRoleDto | undefined =>
  roles.find((r) => r.role === role);