import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * PrismaModule
 * 
 * Global module that provides PrismaService to all other modules.
 * The @Global decorator makes PrismaService available throughout the application
 * without needing to import this module explicitly.
 * 
 * @example
 * ```typescript
 * // In app.module.ts
 * import { PrismaModule } from './prisma/prisma.module';
 * 
 * @Module({
 *   imports: [PrismaModule],
 * })
 * export class AppModule {}
 * 
 * // In any service
 * constructor(private prisma: PrismaService) {}
 * ```
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
