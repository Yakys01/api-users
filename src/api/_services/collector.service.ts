import { TypeApiUpdateUser } from "@api/users/models/user.model";
// schemas
import type { TypeUserPostSchema } from "@api/users/schemas/user.schema";
// models
import UserModel from "@api/users/models/user.model";
// providers
import ApisCollector from "@api/_providers/apis.collector";

export default class {
    private userModel: UserModel;

    private genders = {
        male: ['M', 'masculino', 'MASCULINO', 'hombre', 'HOMBRE'],
        female: ['F', 'femenino', 'FEMENINO', 'mujer', 'MUJER'],
    };

    constructor() {
        this.userModel = new UserModel();
    }

    async _collector<T>(identifier: string, type: "user" | "company") {

        const apiCollector = new ApisCollector(identifier, type);
        const response = await apiCollector.run();

        console.log("_collector",response);

        return response;
    }

    /**
         * Insertar un usuario
         * @param input 
         */
    async saveUser(input: TypeUserPostSchema['input']) {

        let { birth_date, digit_ruc, document, gender, address, address_ubigeo, father_lastname, mother_lastname, names } = input

        let _birth_date = birth_date ? new Date(birth_date) : null;
        let _document = Number(document);
        const _gender = gender ? this.genders.male.includes(gender) : 2;

        const _data: Record<string, unknown> = {
            document: _document,
            birth_date: _birth_date,
            names: names?.toUpperCase(),
            father_lastname: father_lastname?.toUpperCase(),
            mother_lastname: mother_lastname?.toUpperCase(),
            gender: Number(_gender),
            address: address?.toUpperCase(),
            address_ubigeo: address_ubigeo?.toUpperCase(),
            digit_ruc
        };

        // build an object not  null or undfined
        const _process_data: Record<keyof typeof _data, unknown> = {};

        for (const key in _data) {
            const value = _data[key];
            if (value) _process_data[key] = value
        }

        return await this.userModel.updateApiUser(_process_data as TypeApiUpdateUser)
    }
}
