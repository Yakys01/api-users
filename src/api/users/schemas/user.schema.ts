import { apiSchema } from "@api/api.schema";
import { t } from 'elysia';

const userSchema = {
    input: t.Object({
        document: t.String({ maxLength: 8, minLength: 8 }),
    }),
    output: t.Object({
        fullname: t.Optional(t.String()),
        // names: t.String(),
        // surname: t.String(),
        // document: t.String(),
        // age: t.Number(),
        // birth_date: t.String(),
        // address: t.String(),
        // ubigeo: t.String(),
        // gender: t.String(),
        // civil_status: t.String(),
        // department: t.String(),
        // province: t.String(),
        // district: t.String(),
        // digit_ruc: t.String(),
        // ruc_10: t.String(),
        // _redirects: t.Object({
        //     user: t.String(), // enlace de informacion de usuario
        //     user_ruc_10: t.String(), // enlace de informacion de usuario ruc
        // })
    })
};

const userCompanySchema = {
    input: t.Object({
        ruc: t.String()
    }),
    output: t.Object({

    })
}

const userPostSchema = {
    input: t.Object({
        document: t.String(),
    })
};

export { userSchema, userPostSchema }

type TypeUserSchema = SchemaType<typeof userSchema>;