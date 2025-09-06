const config = {
    // server
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_HOST: process.env.SERVER_HOST,
    // db
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_URI_CONNECTION: process.env.DB_URI_CONNECTION as string,
}

export default config