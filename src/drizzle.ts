import { drizzle } from 'drizzle-orm/node-postgres';
import * as d from 'drizzle-orm';
import * as dv from 'drizzle-valibot';

import { schemas } from "../drizzle/schemas";
import config from './config';

const db = drizzle({
    schema: { ...schemas },
    connection: {
        connectionString: config.DATABASE_URL,
        // ssl: true
    }
});
const schema = schemas;

export { db, d, dv, schema };