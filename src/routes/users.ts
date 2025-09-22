import router from "@router/index";
import { userSchema } from "@api/users/schemas/user.schema";

const models = router().model({
    'info.input': userSchema.input,
    'info.output': userSchema.output
})

export default router({ name: 'users', prefix: '/user' })
    .use(models)
    .get('/info/:document', (req) => {
        return {
            fullname: undefined
        }
    }, {
        params: 'info.input',
        response: 'info.output'
    })
    .get('/ruc/:ruc', (req) => {

    }, {
        params: 'info.input',
        response: 'info.output'
    })