import { t } from "elysia";

const companySchema = {
    input: t.Object({
        ruc: t.String({ pattern: '^[0-9]{11}$', error: 'ruc is required' }),
    }),
    output: t.Object({
        ruc: t.String(),
        company_name: t.String(),
        contribuitor_status: t.String(),
        contribuitor_condition: t.String(),
        // address
        address: t.Nullable(t.String()),
        address_info: t.Object({
            interior: t.Nullable(t.String()),
            lote: t.Nullable(t.String()),
            apartment: t.Nullable(t.String()),
            block: t.Nullable(t.String()),
            kilometer: t.Nullable(t.String())
        }),
        // ubigeo 
        department: t.Nullable(t.String()),
        province: t.Nullable(t.String()),
        district: t.Nullable(t.String()),
        observations: t.Record(t.String(), t.Any())
    })
}

export { companySchema }
type TypeCompanySchema = SchemaType<typeof companySchema>;