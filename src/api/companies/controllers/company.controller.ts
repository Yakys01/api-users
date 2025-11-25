import { NotFoundError } from "elysia";
// models
import CompanyModel from "@api/companies/models/company.model";
import LocationModel from "@api/locations/models/location.model";
// services
import { SunatService } from "@api/_services/company.service";

export default class {
    private companyModel: CompanyModel;
    private locationModel: LocationModel;

    constructor() {
        this.companyModel = new CompanyModel();
        this.locationModel = new LocationModel();
    }

    async getAnCompany(ruc: string) {
        const rucNumber = Number(ruc);
        const company = await this.companyModel.findCompanyByRuc(rucNumber);

        if (!company) throw new NotFoundError('Company not found, please try again');

        const {
            taxpayer_status,
            address_condition,
            ...restcompany
        } = company;

        const description_status = SunatService.getCondition(taxpayer_status);
        const contribuitor_status = taxpayer_status;
        const contribuitor_condition = address_condition;

        // identificar ubigeo
        let state = this.locationModel._withState();

        if (restcompany.ubigeo) {
            const location = await this.locationModel.findLocationByUbigeo(restcompany.ubigeo);
            if (location) state = this.locationModel._withState(location);
        }

        const { address, address_info } = this.companyModel._withAddress(company);

        return {
            ...state,
            ruc: String(rucNumber),
            company_name: restcompany.company_name,
            contribuitor_status,
            contribuitor_condition,
            address,
            address_info,
            // location

            observations: {
                description: {
                    contribuitor_status: description_status
                }
            }
        }
    }
}

// fetch("https://www.reniec.gob.pe/Adherentes/ubigeos", {
//     "headers": {
//       "accept": "*/*",
//       "accept-language": "en;q=0.5",
//       "content-type": "application/x-www-form-urlencoded",
//       "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Brave\";v=\"139\", \"Chromium\";v=\"139\"",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "\"Linux\"",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "sec-gpc": "1",
//       "cookie": "JSESSIONID=b2b68a458a985b15bcf4aeccd0dc8f57668b03d67653c34256db55e5e26ce260.e34Mb3uKahmMai0Qa40; uzmx=7f90005dacadfd-97a9-4b0c-9063-c63b67c4bec71-17585162696133409-066bdf08527153f322",
//       "Referer": "https://www.reniec.gob.pe/Adherentes/jsp/ListaUbigeos.jsp"
//     },
//     "body": "cmbSeleccionado=5&coUbigeo=150103",
//     "method": "POST"
//   });