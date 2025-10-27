import { Static } from 'elysia';
// from:packages
import type { InferSelectModel as InferSelect, InferInsertModel as InferInsert } from 'drizzle-orm';
import type { SQL as TypeSql } from 'drizzle-orm';

declare global {
    // infers db
    type InferInsertModel<T> = InferInsert<T>;
    type InferSelectModel<T> = InferSelect<T>;
    type InferSelectModelNoAts<T> = Omit<InferSelect<T>, "createdAt" | "updatedAt" | "deletedAt">;
    type InferSelectModelPick<T, K extends keyof InferSelectModel<T> = keyof InferSelectModel<T>> = Pick<InferSelectModel<T>, K>;

    // utils db
    type SQL = TypeSql<unknown> | undefined;

    /**
     * Utility type for standardizing API responses.
     * @template T The type of the data payload.
     */
    type ApiResponse<T = any> = {
        success: boolean;
        data?: T;
        error?: string;
        message?: string;
    };

    /**
     * Utility type to make specific properties of an object optional.
     * @template T The base object type.
     * @template K The keys to make optional.
     */
    type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

    /**
     * Utility type for deep partial objects, useful for updates.
     * @template T The base object type.
     */
    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };

    /**
     * Utility type to dynamically extract TypeScript types from Elysia schemas.
     * @template T The schema object with input and optional output properties.
     */
    type SchemaType<T> = T extends { input: infer I, output?: infer O }
        ? { input: Static<I>, output: O extends undefined ? never : Static<O> }
        : never;

    // helper types*
    type NonNullableObject<T> = {
        [P in keyof T]: NonNullable<T[P]>;
    };

}

export { };