import router from "@router/index";
import ApiError from "@router/error";
import config from "./config";

// routes
import userRoutes from "@routes/users";
import companyRoutes from "@routes/companies";

const app = router()
    .use(userRoutes)
    .use(companyRoutes)
    .error({ ApiError })
    .onError((evterror) => {
        const { code, error } = evterror;
        if (code === "VALIDATION") return error;

    })
    .get("/", () => 'uuuiiiaa 😺 https://youtu.be/bN1shALfJqg')
    .listen({
        port: config.SERVER_PORT,
        hostname: config.SERVER_HOST,
    });

console.log(
    `Api Users running at ${app.server?.hostname}:${app.server?.port}`
);
