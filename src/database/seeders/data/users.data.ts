import { UserRole } from 'src/user/enums/role.enum';

// ─── Raw Name Strings ────────────────────────────────────────────────────────
// Format: '<idNumber> LASTNAME, FIRSTNAME MIDDLENAME'
// Group your users by role and department here.
// ─────────────────────────────────────────────────────────────────────────────

export interface RawUserGroup {
  role: UserRole;
  department: string; // MongoDB ObjectId string
  users: string[];
}

export const rawUserGroups: RawUserGroup[] = [
  {
    role: UserRole.INSTRUCTOR,
    department: '',
    users: [],
  }
];
