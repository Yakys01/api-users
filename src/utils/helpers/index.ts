/**
 * Parsear fecha yyy-mmm--dd a dd/mm/yyyy
 * @param value 
 * @returns 
 */
function parseDate(value: string) {
    if (!value) return null;
    return value.split('-').reverse().join('/');
}

/**
 * Agregar ceros a la izquierda
 * @param value 
 * @param limit 
 * @returns 
 */
function padZeroLeft(value: number, limit: number = 8): string {
    const valuestr = String(value);
    const valuecount = valuestr.length;

    if (valuecount === limit) return valuestr;
    const difference = (limit - valuecount);

    return value.toString().padStart(difference, '0');
}

export { parseDate, padZeroLeft }