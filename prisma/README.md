# Prisma ORM Setup Guide

This guide documents the professional Prisma ORM setup for the Auth NestJS application.

## 📁 Directory Structure

```
prisma/
├── schema.prisma          # Main Prisma schema definition
├── migrations/            # Database migration files
└── README.md              # This file

src/prisma/
├── prisma.module.ts       # Global Prisma NestJS module
├── prisma.service.ts      # Prisma ORM service with lifecycle management
└── prisma.utils.ts        # Utility functions for common operations
```

## 🚀 Quick Start

### 1. **Initialize Database**

```bash
# Generate Prisma client
npx prisma generate

# Create initial migration
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy
```

### 2. **Environment Variables**

Copy `.env.example` to `.env` and configure your database connection:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` with your PostgreSQL connection string:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/auth_db
```

### 3. **Run Application**

```bash
npm run start:dev
```

The PrismaService will automatically connect to the database on startup.

## 📊 Database Schema

### Models Overview

#### User Management
- **User**: Core user account with authentication fields
- **OAuthAccount**: OAuth provider integration
- **Session**: Active user sessions with refresh tokens
- **LoginAttempt**: Track login attempts for security

#### Authorization
- **Role**: User roles (admin, user, etc.)
- **Permission**: System permissions
- **RolePermission**: Role-permission mapping
- **UserRole**: User-role assignment

#### Security & Audit
- **VerificationToken**: Email verification tokens
- **PasswordResetToken**: Password reset tokens
- **AuditLog**: Audit trail of system actions

## 🔧 Configuration

### PrismaService

The `PrismaService` automatically handles:
- ✅ Database connection on app startup
- ✅ Connection pooling
- ✅ Error logging
- ✅ Graceful shutdown

```typescript
// Usage in any NestJS service
constructor(private prisma: PrismaService) {}

async getUser(id: string) {
  return this.prisma.user.findUnique({ where: { id } });
}
```

### PrismaModule

Imported as a **Global Module**, making `PrismaService` available throughout the application without explicit imports.

```typescript
// In app.module.ts
@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

## 📝 Common Operations

### Pagination

```typescript
import { formatPaginatedResponse, calculateSkip } from './prisma/prisma.utils';

const page = 1;
const limit = 10;
const skip = calculateSkip(page, limit);

const [users, total] = await Promise.all([
  this.prisma.user.findMany({ skip, take: limit }),
  this.prisma.user.count(),
]);

return formatPaginatedResponse(users, total, { page, limit });
```

### Error Handling

```typescript
import { PrismaErrorHandler } from './prisma/prisma.utils';

try {
  await this.prisma.user.create({ data: userData });
} catch (error) {
  if (PrismaErrorHandler.isUniqueConstraintError(error)) {
    throw new ConflictException('User already exists');
  }
  throw error;
}
```

### Soft Deletes

```typescript
// Soft delete
await this.prisma.user.update({
  where: { id },
  data: { deletedAt: new Date() },
});

// Query without deleted records
const activeUsers = await this.prisma.user.findMany({
  where: { deletedAt: null },
});
```

## 🔄 Migrations

### Create a Migration

```bash
# Create migration (generates from schema changes)
npx prisma migrate dev --name add_new_field

# Create empty migration
npx prisma migrate dev --name description
```

### Apply Migrations

```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

### Rollback

```bash
# Resolve migration issues
npx prisma migrate resolve --rolled-back migration_name
```

## 🌱 Database Seeding

Create `prisma/seeds/main.seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  await prisma.role.createMany({
    data: [
      { name: 'admin', description: 'Administrator' },
      { name: 'user', description: 'Regular User' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Update `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seeds/main.seed.ts"
  }
}
```

Run seed:

```bash
npx prisma db seed
```

## 📚 Best Practices

### ✅ DO

- Use `@updatedAt` for tracking updates
- Add `@@index` for frequently queried fields
- Use proper `onDelete` cascade strategies
- Add field length constraints (`@db.VarChar(n)`)
- Use transactions for multiple operations
- Validate data before persistence

### ❌ DON'T

- Use `@relation` without proper `references`
- Forget soft delete filters in queries
- Ignore Prisma error codes
- Use `any` types with Prisma queries
- Mix business logic with data access

## 🔐 Security Considerations

### Password Storage
- Passwords are hashed with bcryptjs (not stored directly)
- Use `passwordHash` field instead of plain `password`

### Token Management
- Refresh tokens are unique and indexed
- Verification and password reset tokens have expiration
- Tokens are invalidated after use

### Audit Logging
- All sensitive operations are logged
- User agent and IP address are captured
- Soft deletes preserve data for audit trails

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test connection
npx prisma db execute --stdin --file=test.sql

# Check migration status
npx prisma migrate status

# Reset database (development only!)
npx prisma migrate reset
```

### Schema Validation

```bash
# Validate schema
npx prisma validate

# Format schema
npx prisma format
```

### Generate Client

```bash
# Regenerate Prisma client
npx prisma generate

# Force re-generation
npx prisma generate --force
```

## 📖 Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [NestJS + Prisma Guide](https://docs.nestjs.com/recipes/prisma)

## 🔄 Version Information

- Prisma: See `package.json`
- PostgreSQL: 12+
- Node.js: 18+

---

**Last Updated**: 2026-05-06
