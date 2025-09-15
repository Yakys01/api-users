const config = {
    // server
    SERVER_PORT: Number(process.env.SERVER_PORT) || 3000,
    SERVER_HOST: process.env.SERVER_HOST || 'localhost',
    // db
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DATABASE_URL: process.env.DATABASE_URL as string,
}

export default config