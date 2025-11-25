import router from "@router/index";
import { userSchema } from "@api/users/schemas/user.schema";
import { companySchema } from "@api/companies/schemas/company.schema";

export const models = router().model({
    'user.input': userSchema.input,
    'user.output': userSchema.output,
    'company.input': companySchema.input,
    'company.output': companySchema.output
})