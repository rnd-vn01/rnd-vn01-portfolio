import { UserRoleEnum } from '../users/enums/user-role.enum';

export interface JwtPayload {
  firebase_id: string;
  email?: string;
  name?: string;
  roles?: UserRoleEnum[];
}
