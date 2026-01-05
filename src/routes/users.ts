import router from "@router/index";
import { models } from "@routes/models.route";

// controllers
import UserController from "@api/users/controllers/user.controller";
const user_controller = new UserController();

// services
// import ApiProvider from "@api/_providers/apis.collector";
import CollectorService from "@api/_services/collector.service";

const collectorService = new CollectorService();

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
        
        const apicollector = await collectorService._collector(params.document, "user");
        
        return {
            data: 'nice'
        }
    })
