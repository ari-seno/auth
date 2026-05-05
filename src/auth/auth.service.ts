import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Cek apakah email sudah terdaftar
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(registerDto.password, 10);

    // Buat user baru
    const user = await this.usersService.create({
      email: registerDto.email,
      username: registerDto.username,
      passwordHash: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
    });

    // Hapus password dari response
    const { passwordHash, ...userWithoutPassword } = user;

    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      message: 'User berhasil terdaftar',
      user: userWithoutPassword,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    // Cari user berdasarkan email
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Bandingkan password
    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Hapus password dari response
    const { passwordHash, ...userWithoutPassword } = user;

    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      message: 'Login berhasil',
      user: userWithoutPassword,
      token,
    };
  }

  async validateUser(id: string) {
    return this.usersService.findOne(id);
  }
}
