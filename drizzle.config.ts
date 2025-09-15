import config from './src/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle-dist',
    schema: './drizzle/schemas/users.schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: config.DATABASE_URL
    },
});
