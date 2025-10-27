import router from "@router/index";
import { userSchema } from "@api/users/schemas/user.schema";

// controllers
import UserController from "@api/users/controllers/user.controller";
const user_controller = new UserController();

const models = router().model({
    'info.input': userSchema.input,
    'info.output': userSchema.output,
    // ruc
})

export default router({ name: 'users', prefix: '/user' })
    .use(models)
    .get('/info/:document', async (req) => {
        const { params } = req;
        const userdata = await user_controller.authAppVerify(params.document);

        console.log('userdata : ', userdata)
        return {
            fullname: 'asdasd'
        }
    }, {
        params: 'info.input',
        response: 'info.output'
    })
    .get('/company/:ruc', (req) => {

        return {
            
        }

    }, {
        params: 'info.input',
        response: 'info.output'
    })