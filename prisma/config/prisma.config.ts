import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Helper: ensure env exists
function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing required env: ${name}`);
  }
  return value;
}

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  schema: 'prisma/schema.prisma',

  migrations: {
    path: 'prisma/migrations',
  },

  datasource: {
    url: requiredEnv('DATABASE_URL'),
  },

});