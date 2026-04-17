import { toTitleCase } from 'src/common/utils/string.util';
import { CreateUserDto, UserRoleDto } from 'src/user/dto/create-user.dto';



/**
 * Parses a raw user string into a CreateUserDto.
 *
 * Input format:  '27737 DOE, JOHN SMITH'
 * Name structure: LASTNAME, FIRSTNAME MIDDLENAME
 */
export const parseUserString = (
  raw: string,
  roles: UserRoleDto[],
): CreateUserDto => {
  const spaceIndex = raw.indexOf(' ');
  const idNumber = raw.slice(0, spaceIndex).trim();
  const namePart = raw.slice(spaceIndex + 1).trim();

  const [lastNameRaw, restNameRaw] = namePart.split(',').map((s) => s.trim());
  const [firstNameRaw, ...middleParts] = restNameRaw.split(' ');

  const firstName = toTitleCase(firstNameRaw);
  const lastName = toTitleCase(lastNameRaw);
  const middleName = middleParts.length
    ? middleParts.map(toTitleCase).join(' ')
    : undefined;

  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@exampleemail.com`;

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