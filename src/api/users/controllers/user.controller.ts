import UserModel from "@api/users/models/user.model";

export default class {
    private userModel: UserModel

    constructor() {
        this.userModel = new UserModel();
    }

    async authAppVerify(document: string) {
        const documentNumber = Number(document);
        return await this.userModel.findUserByDocument(documentNumber);
    }
}