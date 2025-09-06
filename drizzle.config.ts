import config from './src/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle-dist',
    schema: './drizzle/schema/user.schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: config.DB_URI_CONNECTION
    },
});
