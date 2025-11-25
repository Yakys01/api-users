import { db, d, schema } from '@drizzle';
const { taxonomies } = schema;

type TypeInsertTaxonomy = InferInsertModel<typeof taxonomies>;
type TypeSelectTaxonomy = InferSelectModel<typeof taxonomies>;

export default class {

    private taxonomyFields = {
        id: true,
        module: true,
        type: true,
        category: true,
        value: true,
        json: true,
        created_at: true,
        updated_at: true,
    } as const;

    /**
     * Find taxonomy by id
     * @param id
     * @returns
     */
    async findTaxonomyById(id: number) {
        return db.query.taxonomies.findFirst({
            columns: this.taxonomyFields,
            where: d.and(d.eq(taxonomies.id, id)),
        });
    }

    /**
     * Find taxonomy by module
     * @param module
     * @returns
     */
    async findTaxonomyByModule(module: string) {
        return db.query.taxonomies.findFirst({
            columns: this.taxonomyFields,
            where: d.eq(taxonomies.module, module)
        });
    }
}