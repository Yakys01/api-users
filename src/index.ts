import { Elysia } from "elysia";
import config from "./config";
import { db } from "./db";
import { sql } from "drizzle-orm";

const app = new Elysia()
  .get("/", () => 'uuuiiiaa ')
  .get("/connection", async () => {
    try {
      // Simple query to test connection
      const result = await db.execute(sql`SELECT 1 as test`);
      return { status: "success", message: "Database connection successful", data: result };
    } catch (error) {
      return { status: "error", message: "Database connection failed", error: (error as Error).message };
    }
  })
  .listen({
    port: config.SERVER_PORT,
    hostname: config.SERVER_HOST,
  });

console.log(
  `Api Users running at ${app.server?.hostname}:${app.server?.port}`
);
