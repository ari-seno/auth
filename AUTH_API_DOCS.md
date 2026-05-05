# Sistem Autentikasi Dasar - API Endpoints

## Endpoints Autentikasi

### 1. Register (Pendaftaran User)
**POST** `/auth/register`

Request body:
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:
```json
{
  "message": "User berhasil terdaftar",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2026-05-05T00:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Login (Masuk)
**POST** `/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login berhasil",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Get Profile (Ambil Profil - Memerlukan Token)
**GET** `/auth/profile`

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## Struktur Direktori Auth

```
src/auth/
├── auth.controller.ts      # Controller untuk endpoints
├── auth.service.ts         # Logika bisnis autentikasi
├── auth.module.ts          # Module auth
├── dto/
│   ├── login.dto.ts        # DTO untuk login
│   ├── register.dto.ts     # DTO untuk register
│   └── index.ts            # Export semua DTOs
├── guards/
│   └── jwt-auth.guard.ts   # Guard untuk proteksi route
└── strategies/
    └── jwt.strategy.ts     # Strategi JWT Passport
```

## Instalasi Dependencies

```bash
npm install bcryptjs @nestjs/jwt @nestjs/passport passport passport-jwt @types/bcryptjs
```

## Environment Variables

Buat file `.env` di root project:

```
JWT_SECRET=your-super-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/auth_nestjs
NODE_ENV=development
```

## Cara Menggunakan

1. **Register user baru**: POST ke `/auth/register`
2. **Login user**: POST ke `/auth/login` 
3. **Akses protected route**: Gunakan token yang didapat dari login/register di header `Authorization: Bearer <token>`

## Fitur yang Sudah Diimplementasikan

- ✅ User registration dengan password hashing (bcryptjs)
- ✅ User login dengan JWT token
- ✅ JWT token validation
- ✅ Protected routes menggunakan JwtAuthGuard
- ✅ Basic password validation (minimum 6 karakter)
- ✅ Email validation

## Untuk Update Advance Nanti

Anda dapat menambahkan:
- Refresh tokens
- Role-based access control (RBAC)
- Two-factor authentication (2FA)
- OAuth integration (Google, GitHub, dll)
- Email verification
- Password reset flow
- Rate limiting untuk login attempts
- Audit logging untuk aktivitas auth
- Session management
