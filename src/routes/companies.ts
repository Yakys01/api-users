import router from "@router/index";
import { models } from "@routes/models.route";

// controllers
import CompanyController from "@api/companies/controllers/company.controller";
const company_controller = new CompanyController();

export default router({ name: 'companies', prefix: '/company' })
    .use(models)
    .get('/info/:ruc', async (req) => {
        const { params } = req;
        const data = await company_controller.getAnCompany(params.ruc);
        return data;
    }, {
        params: 'company.input',
        response: 'company.output'
    })