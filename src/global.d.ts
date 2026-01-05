import { Static } from 'elysia';
// from:packages
import type { InferSelectModel as InferSelect, InferInsertModel as InferInsert } from 'drizzle-orm';
import type { SQL as TypeSql } from 'drizzle-orm';

declare global {
    // infiere tipos de db
    type InferInsertModel<T> = InferInsert<T>;
    type InferSelectModel<T> = InferSelect<T>;
    type InferSelectModelNoAts<T> = Omit<InferSelect<T>, "createdAt" | "updatedAt" | "deletedAt">;
    type InferSelectModelPick<T, K extends keyof InferSelectModel<T> = keyof InferSelectModel<T>> = Pick<InferSelectModel<T>, K>;

    // utilidades db
    type SQL = TypeSql<unknown> | undefined;

    /**
     * Tipo de utilidad para estandarizar respuestas de API.
     * @template T El tipo de la carga útil de datos.
     */
    type ApiResponse<T = any> = {
        success: boolean;
        data?: T;
        error?: string;
        message?: string;
    };

    /**
     * Tipo de utilidad para hacer opcionales propiedades específicas de un objeto.
     * @template T El tipo de objeto base.
     * @template K Las claves a hacer opcionales.
     */
    type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

    /**
     * Tipo de utilidad para objetos parcialmente profundos, útil para actualizaciones.
     * @template T El tipo de objeto base.
     */
    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };

    /**
     * Tipo de utilidad para extraer dinámicamente tipos TypeScript de esquemas Elysia.
     * @template T El objeto de esquema con propiedades de entrada y salida opcional.
     */
    type SchemaType<T> = T extends { input: infer I, output?: infer O }
        ? { input: Static<I>, output: O extends undefined ? never : Static<O> }
        : never;

    // tipos auxiliares*
    type NonNullableObject<T> = {
        [P in keyof T]: NonNullable<T[P]>;
    };

}

export { };