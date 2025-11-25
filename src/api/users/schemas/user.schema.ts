import { t } from 'elysia';

const userSchema = {
    input: t.Object({
        document: t.String({ pattern: '^[0-9]{8}$', error: 'document is required' }),
    }),
    output: t.Object({
        names: t.Nullable(t.String()),
        father_lastname: t.Nullable(t.String()),
        mother_lastname: t.Nullable(t.String()),
        document: t.String(),
        address: t.Nullable(t.String()),
        civil_status: t.Nullable(t.String()),
        birth_date: t.Nullable(t.String()),
        gender: t.String(),
        fullname: t.String(),
        age: t.Nullable(t.Number()),
        department: t.Nullable(t.String()),
        province: t.Nullable(t.String()),
        district: t.Nullable(t.String()),
    })
};

const userPostSchema = {
    input: t.Object({
        document: t.String(),
    })
};

export { userSchema, userPostSchema }

type TypeUserSchema = SchemaType<typeof userSchema>;