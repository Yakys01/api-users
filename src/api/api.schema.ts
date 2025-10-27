import { t } from 'elysia';

const apiSchema = t.Object({
    success: t.Boolean(),
    errors: t.Array(t.String()),
    message: t.String(),
    data: t.Any()
});

export { apiSchema }
export type TypeApiSchema = SchemaType<typeof apiSchema>;