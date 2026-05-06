import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

/**
 * PrismaService
 * 
 * Manages Prisma ORM lifecycle and connection.
 * Automatically connects on module initialization and disconnects on destroy.
 * 
 * @example
 * ```typescript
 * constructor(private prisma: PrismaService) {}
 * 
 * async findUser(id: string) {
 *   return this.prisma.user.findUnique({ where: { id } });
 * }
 * ```
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'stdout',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
  }

  /**
   * Connect to database on module initialization
   */
  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('✅ Prisma database connection established');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database', error);
      throw error;
    }
  }

  /**
   * Disconnect from database on module destroy
   */
  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.logger.log('✅ Prisma database connection closed');
    } catch (error) {
      this.logger.error('❌ Failed to disconnect from database', error);
    }
  }
}
