/**
 * Prisma Utilities & Extensions
 * 
 * Common helper functions for Prisma operations including pagination,
 * filtering, and error handling.
 */

/**
 * Pagination interface
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Calculate skip value for pagination
 * 
 * @param page - Page number (1-indexed)
 * @param limit - Items per page
 * @returns Skip value for Prisma skip parameter
 */
export function calculateSkip(page: number = 1, limit: number = 10): number {
  return Math.max(0, (page - 1) * limit);
}

/**
 * Format pagination response
 * 
 * @example
 * ```typescript
 * const users = await prisma.user.findMany({ take: 10, skip: 0 });
 * const total = await prisma.user.count();
 * return formatPaginatedResponse(users, total, { page: 1, limit: 10 });
 * ```
 */
export function formatPaginatedResponse<T>(
  data: T[],
  total: number,
  params: PaginationParams,
): PaginatedResponse<T> {
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, Math.min(100, params.limit || 10));
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

/**
 * Prisma error type checking
 */
export class PrismaErrorHandler {
  /**
   * Check if error is a unique constraint violation
   */
  static isUniqueConstraintError(error: any): boolean {
    return error?.code === 'P2002';
  }

  /**
   * Check if error is a not found error
   */
  static isNotFoundError(error: any): boolean {
    return error?.code === 'P2025';
  }

  /**
   * Check if error is a foreign key constraint error
   */
  static isForeignKeyError(error: any): boolean {
    return error?.code === 'P2003';
  }

  /**
   * Check if error is a validation error
   */
  static isValidationError(error: any): boolean {
    return error?.code === 'P2007';
  }

  /**
   * Get user-friendly error message
   */
  static getErrorMessage(error: any): string {
    if (this.isUniqueConstraintError(error)) {
      return `Record with this ${error.meta?.target?.[0] || 'field'} already exists`;
    }

    if (this.isNotFoundError(error)) {
      return 'Record not found';
    }

    if (this.isForeignKeyError(error)) {
      return 'Referenced record does not exist';
    }

    if (this.isValidationError(error)) {
      return 'Invalid data provided';
    }

    return 'An error occurred while processing your request';
  }
}

/**
 * Common Prisma query helpers
 */
export const PrismaQueryHelpers = {
  /**
   * Get pagination params for Prisma query
   */
  getPaginationParams(page?: number, limit?: number) {
    const p = Math.max(1, page || 1);
    const l = Math.max(1, Math.min(100, limit || 10));

    return {
      take: l,
      skip: (p - 1) * l,
    };
  },

  /**
   * Get soft delete filter (exclude deleted records)
   */
  getSoftDeleteFilter() {
    return {
      deletedAt: null,
    };
  },

  /**
   * Common include patterns
   */
  includePatterns: {
    userWithRoles: {
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
          },
        },
      },
    },

    userWithSessions: {
      include: {
        sessions: {
          orderBy: {
            createdAt: 'desc' as const,
          },
          take: 5,
        },
      },
    },

    auditLogWithUser: {
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    },
  },
};
