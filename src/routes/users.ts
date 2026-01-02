import router from "@router/index";
import { models } from "@routes/models.route";

// controllers
import UserController from "@api/users/controllers/user.controller";
const user_controller = new UserController();

// providers
import ApiProvider from "@api/_providers/apis.collector";

export default router({ name: 'users', prefix: '/user' })
    .use(models)
    .get('/info/:document', async (req) => {
        const { params } = req;
        const data = await user_controller.getAnUser(params.document);

        return data;
    }, {
        params: 'user.input',
        response: 'user.output'
    })
    .get('/collector/:document', async (req) => {
        const { params } = req;
        
        const apicollector = new ApiProvider(params.document);
        const data = await apicollector.run();

        console.log(data);
        
        return {
            data: 'nice'
        }
    })
