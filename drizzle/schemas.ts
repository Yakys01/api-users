import * as schemaUsers from './schemas/users.schema';
import * as schemaCompanies from './schemas/companies.schema';
import * as schemaTaxonomies from './schemas/taxonomies.schema';
import * as schemaLocations from './schemas/locations.schema';

export const schemas = { ...schemaUsers, ...schemaCompanies, ...schemaTaxonomies, ...schemaLocations };