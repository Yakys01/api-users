import { Elysia } from "elysia";
import type { ElysiaConfig } from "elysia";

export default function (config?: ElysiaConfig<string | undefined>) {
    return new Elysia({
        strictPath: true,
        ...config,
    });
}
