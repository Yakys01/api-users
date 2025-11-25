import { db, d, schema } from '@drizzle';
const { companies } = schema;

type TypeInsertCompany = InferInsertModel<typeof companies>;
type TypeSelectCompany = InferSelectModel<typeof companies>;

export default class {

    private companyFields = {
        id: true,
        ruc: true,
        company_name: true,
        taxpayer_status: true,
        address_condition: true,
        ubigeo: true,
        road_type: true,
        road_name: true,
        zone_code: true,
        zone_type: true,
        number: true,
        interior: true,
        lote: true,
        apartment: true,
        block: true,
        kilometer: true,
    } as const;

    /**
     * Buildear la direccion  
     */

    _withAddress(company: TypeSelectCompany) {
        const { road_type, road_name, zone_code } = company;

        let address: string | null = null;
        let address_info = {
            interior: company.interior,
            lote: company.lote,
            apartment: company.apartment,
            block: company.block,
            kilometer: company.kilometer,
        }
        if ([road_type, road_name, zone_code].includes(null)) return {
            address,
            address_info
        };

        address = `${company.road_type} ${company.road_name} ${company.zone_code} #${company.number ?? 'S/N'}`;

        return {
            address,
            address_info
        }
    }

    /**
     * Find company by id
     * @param id
     * @returns
     */
    async findCompanyById(id: number) {
        return db.query.companies.findFirst({
            columns: this.companyFields,
            where: d.and(d.eq(companies.id, id)),
        });
    }

    /**
     * Find company by RUC
     * @param ruc
     * @returns
     */
    async findCompanyByRuc(ruc: number) {
        return db.query.companies.findFirst({
            columns: this.companyFields,
            where: d.eq(companies.ruc, ruc)
        });
    }
}