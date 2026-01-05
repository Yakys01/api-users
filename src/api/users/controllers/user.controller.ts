import { NotFoundError } from "elysia";
// models
import UserModel from "@api/users/models/user.model";
// utils
import { parseDate } from "@utils/helpers/index";

export default class {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    async getAnUser(document: string) {

        const documentNumber = Number(document);
        const user = await this.userModel.findUserByDocument(documentNumber);

        if (!user) throw new NotFoundError('User not founded, please try again');

        const birth_date = parseDate(user.birth_date as string);
        const gender = this.userModel._withGender(user);
        const age = this.userModel._withAge(user);
        const fullname = this.userModel._withFullName(user);
        const state = this.userModel._withState(user);
        // const _document =  padZeroLeft(user.document);

        return {
            ...user,
            ...state,
            document,
            birth_date,
            gender,
            fullname,
            age,
        }
    }

}