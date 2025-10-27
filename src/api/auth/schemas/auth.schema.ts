import { t } from 'elysia';

const apiSchema = t.Object({
    success: t.Boolean(),
    errors: t.Array(t.String()),
    message: t.String(),
    data: t.Any()
})

const authSchema = {
    input: t.Object({
        api_id: t.String({ maxLength: 8, minLength: 8 }),
        client_id: t.String({ maxLength: 8, minLength: 8 }),
    }),
    output: apiSchema
};
