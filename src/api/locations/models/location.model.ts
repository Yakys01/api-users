import { db, d, schema } from '@drizzle';
const { departments, provinces, districts, population_centers } = schema;

type TypeInsertDepartment = InferInsertModel<typeof departments>;
type TypeSelectDepartment = InferSelectModel<typeof departments>;
type TypeInsertProvince = InferInsertModel<typeof provinces>;
type TypeSelectProvince = InferSelectModel<typeof provinces>;
type TypeInsertDistrict = InferInsertModel<typeof districts>;
type TypeSelectDistrict = InferSelectModel<typeof districts>;
type TypeInsertPopulationCenter = InferInsertModel<typeof population_centers>;
type TypeSelectPopulationCenter = InferSelectModel<typeof population_centers>;

interface TypeWithState {
    department: string | null;
    province: string | null;
    district: string | null;
}

interface TypeUbigeo {
    id: number;
    name: string;
    code: string;
    provinces: {
        id: number;
        name: string;
        code: string;
        department_id: number;
        districts: {
            id: number;
            name: string;
            code: string;
            province_id: number;
            capital_name: string | null;
        }[];
    }[];
}

export default class {

    private departmentFields = {
        id: true,
        code: true,
        name: true,
    } as const;

    private provinceFields = {
        id: true,
        code: true,
        department_id: true,
        name: true,
    } as const;

    private districtFields = {
        id: true,
        code: true,
        province_id: true,
        name: true,
        capital_name: true,
    } as const;

    private populationCenterFields = {
        id: true,
        code: true,
        district_id: true,
        name: true,
    } as const;

    /**
     * Split de datos de ubigeo adress
     * @param user 
     */
    _withState(location: undefined | TypeUbigeo = undefined) {

        let data: TypeWithState = {
            department: null,
            province: null,
            district: null
        }

        if (location && location !== null) {
            data.department = location.name;
            data.province = location.provinces[0].name;
            data.district = location.provinces[0].districts[0].name;
        }

        return data;
    }

    /**
     * Find location info by ubigeo code
     * @param ubigeo
     * @returns
     */
    async findLocationByUbigeo(ubigeo: string) {

        const code_department = ubigeo.substring(0, 2);
        const code_province = ubigeo.substring(0, 4);
        const code_district = ubigeo.substring(0, 6);

        // console.log(ubigeo, code_department, code_province, code_district);

        return db.query.departments.findFirst({
            where: d.eq(departments.code, code_department),
            with: {
                provinces: {
                    where: d.eq(provinces.code, code_province),
                    with: {
                        districts: {
                            where: d.eq(districts.code, code_district),
                            limit: 1
                        }
                    },
                    limit: 1
                }
            }
        });

        // return db.select()
        //     .from(departments)
        //     .innerJoin(provinces, d.eq(provinces.department_id, departments.id))
        //     .innerJoin(districts, d.eq(districts.province_id, provinces.id))
        //     .where(d.and(
        //         d.eq(departments.code, code_department),
        //         d.eq(provinces.code, code_province),
        //         d.eq(districts.code, code_district)
        //     ));


    }
}