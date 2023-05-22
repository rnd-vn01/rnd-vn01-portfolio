import { UserRoleEnum } from '../enums/user-role.enum';

export class UserDto {
  firebase_id: string;
  email: string;
  image: string;
  name: string;
  roles: UserRoleEnum[];
}
