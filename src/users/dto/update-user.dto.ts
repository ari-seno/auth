export class UpdateUserDto {
  email?: string;
  username?: string;
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  emailVerified?: boolean;
  mfaEnabled?: boolean;
  isActive?: boolean;
}
