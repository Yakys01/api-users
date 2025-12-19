import { db, d, schema } from '@drizzle';
const { users } = schema;

type TypeInsertUser = InferInsertModel<typeof users>;
type TypeCreateUser = Omit<TypeInsertUser, "username">;
export type TypeApiUpdateUser = Omit<TypeInsertUser, "id" | "father" | "mother" | "expiration_date" | "issue_date" | "registration_date">;
type TypeSelectUser = InferSelectModel<typeof users>;

export default class {

    private userFields = {
        id: true,
        document: true,
        names: true,
        address: true,
        father_lastname: true,
        mother_lastname: true,
        birth_date: true,
        gender: true,
        civil_status: true,
        address_ubigeo: true,
    } as const;

    /**
     * Obtener el nombre completo de 1 o más usuarios.
     * @param user 
     * @returns 
     */
    _withFullName(user: Pick<TypeSelectUser, "names" | "father_lastname" | "mother_lastname">) {
        const { names, father_lastname, mother_lastname } = user;
        if (!names) return `${father_lastname} ${mother_lastname}`;
        return `${father_lastname} ${mother_lastname}, ${names}`;
    }

    /**
     * Calcular la edad del usuario
     * @param value 
     * @returns 
     */
    _withAge(user: Pick<TypeSelectUser, "birth_date">) {
        const value = user.birth_date;
        if (!value) return null;
        const birthDate = new Date(value);

        // Validate the date to ensure it's not invalid
        if (isNaN(birthDate.getTime())) return null;

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    /**
     * Generar el genero
     * @param user 
     * @returns 
     */
    _withGender(user: Pick<TypeSelectUser, "gender">) {
        return user.gender ? 'M' : 'F'
    }

    /**
     * Split de datos de ubigeo adress
     * @param user 
     */
    _withState(user: Pick<TypeSelectUser, "address_ubigeo">) {
        const { address_ubigeo } = user;
        if (!address_ubigeo) return {
            department: null,
            province: null,
            district: null
        };

        const [department, province, district] = address_ubigeo.split('-').map((ele) => ele.length ? ele : null);

        return {
            department,
            province,
            district
        }
    }

    /**
     * Buscar usuario por id
     * @param id 
     * @returns 
     */
    async findUserId(id: number) {

        return db.query.users.findFirst({
            columns: this.userFields,
            where: d.and(d.eq(users.id, id)),
        });
    }

    /**
     * OBtener usuario por documento
     * @param document 
     * @returns 
     */
    async findUserByDocument(document: number) {
        return db.query.users.findFirst({
            columns: this.userFields,
            where: d.eq(users.document, document)
        });
    }


    /**
     * Update de  usuario de datos 
     * @param data
     * @returns
     */
    async updateApiUser(data: TypeApiUpdateUser) {
        const { document, ...restData } = data;

        return await db.update(users)
            .set(restData)
            .where(d.eq(users.document, data.document));
    }
}