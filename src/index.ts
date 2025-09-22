import router from "@router/index";
import config from "./config";

const app = router()
    .get("/", () => 'uuuiiiaa 😺 https://youtu.be/bN1shALfJqg')
    .listen({
        port: config.SERVER_PORT,
        hostname: config.SERVER_HOST,
    });

console.log(
    `Api Users running at ${app.server?.hostname}:${app.server?.port}`
);
