export class CreateUserDto {
  email: string;
  username?: string;
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
}
