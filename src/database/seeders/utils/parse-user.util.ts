import { toTitleCase } from 'src/common/utils/string.util';
import { CreateUserDto, UserRoleDto } from 'src/user/dto/create-user.dto';

// CSV format: 'idNumber, LASTNAME, FIRSTNAME, MIDDLENAME, EMAIL'
// middleName and email are optional — leave as empty string if absent

export const parseUserString = (
  raw: string,
  roles: UserRoleDto[],
): CreateUserDto => {
  const [idNumber, lastNameRaw, firstNameRaw, middleNameRaw, emailRaw] = raw
    .split(',')
    .map((s) => s.trim());

  if (!idNumber || !lastNameRaw || !firstNameRaw) {
    throw new Error(
      `Missing required fields (idNumber, lastName, firstName) in: "${raw}"`,
    );
  }

  const firstName = toTitleCase(firstNameRaw);
  const lastName = toTitleCase(lastNameRaw);
  const middleName = middleNameRaw ? toTitleCase(middleNameRaw) : undefined;
  const email =
    emailRaw ||
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}@exampleemail.com`.split(' ').join('');

  return {
    firstName,
    lastName,
    ...(middleName && { middleName }),
    email,
    idNumber,
    password: 'test123',
    age: 1,
    roles,
  };
};
