/**
 * Prisma-related Constants
 * 
 * Central location for Prisma configuration constants and enums
 */

/**
 * Default pagination values
 */
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

/**
 * Token types for verification and password reset
 */
export enum TokenType {
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
  TWO_FACTOR = 'TWO_FACTOR',
}

/**
 * Token expiration times (in milliseconds)
 */
export const TOKEN_EXPIRATION = {
  EMAIL_VERIFICATION: 24 * 60 * 60 * 1000, // 24 hours
  PASSWORD_RESET: 60 * 60 * 1000, // 1 hour
  TWO_FACTOR: 5 * 60 * 1000, // 5 minutes
} as const;

/**
 * OAuth provider types
 */
export enum OAuthProvider {
  GOOGLE = 'google',
  GITHUB = 'github',
  MICROSOFT = 'microsoft',
}

/**
 * Default user roles
 */
export enum DefaultRoles {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

/**
 * Default permissions
 */
export enum DefaultPermissions {
  // User management
  USER_READ = 'user:read',
  USER_CREATE = 'user:create',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  // Role management
  ROLE_READ = 'role:read',
  ROLE_CREATE = 'role:create',
  ROLE_UPDATE = 'role:update',
  ROLE_DELETE = 'role:delete',

  // Permission management
  PERMISSION_READ = 'permission:read',
  PERMISSION_CREATE = 'permission:create',
  PERMISSION_UPDATE = 'permission:update',
  PERMISSION_DELETE = 'permission:delete',

  // Audit logs
  AUDIT_READ = 'audit:read',
}

/**
 * Audit log actions
 */
export enum AuditAction {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  MFA_ENABLED = 'MFA_ENABLED',
  MFA_DISABLED = 'MFA_DISABLED',
  OAUTH_LINKED = 'OAUTH_LINKED',
  OAUTH_UNLINKED = 'OAUTH_UNLINKED',
  ROLE_ASSIGNED = 'ROLE_ASSIGNED',
  ROLE_REVOKED = 'ROLE_REVOKED',
  PERMISSION_GRANTED = 'PERMISSION_GRANTED',
  PERMISSION_REVOKED = 'PERMISSION_REVOKED',
}

/**
 * Audit log resources
 */
export enum AuditResource {
  USER = 'user',
  ROLE = 'role',
  PERMISSION = 'permission',
  OAUTH_ACCOUNT = 'oauth_account',
  SESSION = 'session',
}

/**
 * Query include patterns for relations
 */
export const PRISMA_INCLUDE = {
  USER_WITH_ROLES: {
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

  USER_WITH_SESSIONS: {
    include: {
      sessions: {
        orderBy: { createdAt: 'desc' as const },
        take: 5,
      },
    },
  },

  USER_WITH_OAUTH: {
    include: {
      oauthAccounts: true,
    },
  },

  ROLE_WITH_PERMISSIONS: {
    include: {
      permissions: true,
    },
  },

  AUDIT_LOG_FULL: {
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
} as const;

/**
 * Prisma error codes
 * Reference: https://www.prisma.io/docs/reference/api-reference/error-reference
 */
export enum PrismaErrorCode {
  UNIQUE_CONSTRAINT_FAILED = 'P2002',
  RECORD_NOT_FOUND = 'P2025',
  FOREIGN_KEY_CONSTRAINT_FAILED = 'P2003',
  REQUIRED_RELATION_VIOLATION = 'P2014',
  REQUIRED_UNIQUE_ARGUMENT_MISSING = 'P2016',
  INVALID_DATA_PROVIDED = 'P2007',
  INVALID_CONNECTION_STRING = 'P1000',
  AUTHENTICATION_FAILED = 'P1001',
  CONNECTION_TIMEOUT = 'P1002',
  DATABASE_DOES_NOT_EXIST = 'P1003',
}

/**
 * Database constraints naming convention
 * Used for error message mappings
 */
export const UNIQUE_CONSTRAINTS = {
  USERS_EMAIL = 'users_email_key',
  USERS_USERNAME = 'users_username_key',
  OAUTH_PROVIDER_USER = 'oauth_accounts_provider_provideruserid_key',
  ROLE_NAME = 'roles_name_key',
  PERMISSION_NAME = 'permissions_name_key',
  VERIFICATION_TOKEN = 'verification_tokens_token_key',
  PASSWORD_RESET_TOKEN = 'password_reset_tokens_token_key',
  SESSION_REFRESH_TOKEN = 'sessions_refreshtoken_key',
} as const;

/**
 * Default query select patterns (for security)
 * Excludes sensitive fields from queries
 */
export const SECURE_USER_SELECT = {
  id: true,
  email: true,
  username: true,
  firstName: true,
  lastName: true,
  profilePictureUrl: true,
  emailVerified: true,
  mfaEnabled: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  // Exclude: passwordHash, mfaSecret
} as const;
