import { db, d, schema } from '@drizzle';
const { users } = schema;

type TypeInsertUser = InferInsertModel<typeof users>;
type TypeCreateUser = Omit<TypeInsertUser, "username">;

export default class {

    private userFields = {
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
     * Crear usuario
     * @param data
     * @returns
     */
    /*     async createUser(data: { user: TypeCreateUser }) {
            const dataUser = {
                ...data.user,
                username: this._generateAnUsername(data.user.name),
            };
    
            return db.transaction(async (tx) => {
                const [sql] = await tx.insert(users).values(dataUser).returning({ userId: users.id });
                const dataOauthAccount = {
                    ...data.oauthaccount,
                    userId: sql.userId,
                };
                await tx.insert(oauthAccount).values(dataOauthAccount);
    
                return {
                    id: sql.userId,
                    ...data.user
                };
            });
        } */
}