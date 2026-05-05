import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // CREATE - Membuat user baru
  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        profilePictureUrl: data.profilePictureUrl,
      },
    });
  }

  // READ - Mendapatkan semua user
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null, // Hanya user yang tidak dihapus
      },
    });
  }

  // READ - Mendapatkan user by ID
  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // READ - Mendapatkan user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // UPDATE - Update user
  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        username: data.username,
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        profilePictureUrl: data.profilePictureUrl,
        emailVerified: data.emailVerified,
        mfaEnabled: data.mfaEnabled,
        isActive: data.isActive,
      },
    });
  }

  // DELETE - Soft delete user (set deletedAt)
  async remove(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  // DELETE - Hard delete user (benar-benar dihapus dari database)
  async hardDelete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
