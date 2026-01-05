import type { TypeUserPostSchema } from "@api/users/schemas/user.schema";

/**
 * Representa la configuración de una petición HTTP.
 */
interface TypeApiRequest {
    url: string,
    method: string,
    headers?: Headers,
    body: BodyInit,
    referrer?: string,
    mode?: RequestMode,
    credentials?: RequestCredentials
}

/**
 * Define la estructura esperada de la respuesta de la API.
 */
interface TypeApiResponse {
    type: 'object' | 'array',
    search: string,
    example: unknown,
    extract?: string[]
}

/**
 * Colección de configuraciones para recolectar datos de APIs.
 */
interface TypeFechtCollector {
    _type: 'user' | 'company',
    _request: TypeApiRequest,
    _replacements_user: Partial<Record<keyof TypeUserPostSchema['input'], string>>,
    _replacements_company: Partial<Record<string, string>>,
    _response: TypeApiResponse
}

interface TypeResponseCollector {
    current: unknown,
    replacement: Record<string, unknown>,
    data: unknown
}


/**
 * Lista de colecciones de APIs para recolectar datos.
 */
const API_COLLECTIONS: TypeFechtCollector[] = [
    {
        _type: 'user',
       
        _request: {
            url: "https://consultadni.com/php/notaria_api_proxy.php",
            method: "POST",
            headers: {
                "accept": "*/*",
                "accept-language": "es-419,es;q=0.6",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"142\", \"Brave\";v=\"142\", \"Not_A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "Referer": "https://consultadni.com/"
            },
            body: "{\"dni\":\"{document}\"}"
        },
        _replacements_user: {
            document: 'id',
            names: 'nombres',
            father_lastname: 'apellido_paterno',
            mother_lastname: 'apellido_materno',
            gender: 'genero',
            birth_date: 'fecha_nacimiento',
            digit_ruc: 'codigo_verificacion'
        },
        _response: {
            type: 'object',
            search: 'resultado',
            example: { "estado": true, "resultado": { "id": "74241736", "nombres": "WILDER CRISTIAN", "apellido_paterno": "MAMANI", "apellido_materno": "LUNA", "nombre_completo": "WILDER CRISTIAN MAMANI LUNA", "genero": "M", "fecha_nacimiento": "1996-03-14", "codigo_verificacion": "6" } },
        }
    },
    {
        _type: 'user',
        _request: {
            url: "https://consultas.axusperu.com/dni_files/consulta.php",
            method: "POST",
            headers: {
                "accept": "*/*",
                "accept-language": "es-419,es;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"142\", \"Brave\";v=\"142\", \"Not_A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-requested-with": "XMLHttpRequest",
                "Referer": "https://consultas.axusperu.com/consulta-dni.php"
            },
            body: "dni={document}"
        },
        _replacements_user: {
            document: 'numeroDocumento',
            names: 'nombres',
            father_lastname: 'apellidoPaterno',
            mother_lastname: 'apellidoMaterno',
        },
        _response: {
            type: 'object',
            search: '',
            example: {
                "nombre": "YRALA CASTILLO FATIMA",
                "tipoDocumento": "1",
                "numeroDocumento": "74231654",
                "estado": "",
                "condicion": "",
                "direccion": "",
                "ubigeo": "",
                "viaTipo": "",
                "viaNombre": "",
                "zonaCodigo": "",
                "zonaTipo": "",
                "numero": "",
                "interior": "",
                "lote": "",
                "dpto": "",
                "manzana": "",
                "kilometro": "",
                "distrito": "",
                "provincia": "",
                "departamento": "",
                "apellidoPaterno": "YRALA",
                "apellidoMaterno": "CASTILLO",
                "nombres": "FATIMA"
            },
        }
    }
];

/**
 * Constructor para construir y ejecutar peticiones a APIs externas.
 */
class ApiBuilder {

    private _request: TypeApiRequest;
    private _response: TypeApiResponse;
    private _document: string;
    private requestfetch: Promise<Response> | undefined;
    private responsefetch: unknown;
    private _replacements: Record<string, string>

    /**
     * Inicializa el constructor con configuración de petición y documento.
     * @param fetchRequest Configuración de la petición.
     * @param fetchResponse Configuración de la respuesta.
     * @param document Documento a usar en la petición.
     */
    constructor(api: TypeFechtCollector, document: string, type: TypeFechtCollector["_type"]) {
        const {_request, _response } = api 
        
        this._request = _request;
        this._response = _response;
        this._replacements = (type === 'user' ) ? api._replacements_user : api._replacements_company;

        this._document = document;
        this.requestfetch = undefined;
        this.responsefetch = undefined;

        this.build();
    }

    /**
     * Construye la petición fetch con el documento reemplazado.
     */
    build() {
        const { url, body, ...rest } = this._request;
        const _bodyString = JSON.stringify(body);
        const bodyReplaced = _bodyString.replace('{document}', this._document);
        const bodyParced = JSON.parse(bodyReplaced);

        console.log(`build for:${this._document}`, { bodyReplaced, bodyParced })

        this.requestfetch = fetch(url, {
            ...rest,
            body: bodyParced
        })
    }

    /**
     * Ejecuta la petición y resuelve la respuesta.
     * @returns Promesa que resuelve con el resultado procesado.
     */
    run() {
        return new Promise(async (resolve, reject) => {
            if (this.requestfetch) {
                try {
                    const response = await this.requestfetch;
                    if (response && response.ok) {
                        this.responsefetch = await this.resolver(response);
                        resolve(this.responsefetch);
                    }
                } catch (error) {
                    reject('api failed')
                }

            } else {
                reject('api not provided')
            }

        })
    }

    _replacementsColumns(current: Record<string, unknown>) {
        let datareplacement:Record<string, unknown> = {};

        for (const prop in this._replacements) {
            const _prop_value = this._replacements[prop];
            const _value = current[_prop_value];
            
            // push to tree
            datareplacement[prop] = _value;
        }

        return datareplacement;
    }

    /**
     * Procesa datos como string (no implementado).
     * @param data Datos a procesar.
     * @returns String vacío.
     */
    _string(data: unknown) {
        return ''
    }

    /**
     * Procesa datos como array, extrayendo por clave de búsqueda.
     * @param data Datos JSON a procesar.
     * @returns Objeto con datos extraídos.
     */
    _array(data: unknown) {
        const { search } = this._response;
        let current: any = data;
        const keys = search.split('.');

        for (const key of keys) {
            if (current === null || current === undefined) {
                return undefined; // O manejar el error/valor por defecto
            }
            current = current[key];
        }

        return {
            current,
            replacement: this._replacementsColumns(current),
            data
        };

    }

    /**
     * Procesa datos como objeto, extrayendo por clave de búsqueda.
     * @param data Datos JSON a procesar.
     * @returns Objeto con datos extraídos.
     */
    _object(data: unknown) {
        const { search } = this._response;
        let current: any = data;
        const keys = search.length ? search.split('.') : [];

        for (const key of keys) {
            if (current === null || current === undefined) {
                return undefined; // O manejar el error/valor por defecto
            }
            current = current[key];
        }

        return {
            current,
            replacement: this._replacementsColumns(current),
            data
        };
    }

    /**
     * Resuelve la respuesta HTTP según el tipo configurado.
     * @param response Respuesta HTTP.
     * @returns Datos procesados.
     */
    async resolver(response: Response) {
        const { type } = this._response;

        if (type === 'object') {
            const data = await response.json();
            return this._object(data);
        }
        if (type === 'array') {
            const data = await response.json();
            return this._array(data);
        }

        const data = await response.text();
        return this._string(data)
    }
}


/**
 * Clase principal para recolectar datos de múltiples APIs.
 */
export default class {

    private identification: string;
    private type: TypeFechtCollector["_type"];
    /**
     * Inicializa con el documento a consultar.
     * @param document Documento para las consultas.
     */
    constructor(document: string, type: TypeFechtCollector["_type"]) {
        this.type = type;
        this.identification = document;
    }

    /**
     * Ejecuta todas las colecciones de APIs y retorna resultados exitosos.
     * @returns Array de resultados procesados.
     */
    async run(): Promise<TypeResponseCollector[]> {
        const mapCollections = API_COLLECTIONS.map((api) => {
            const apibuilder = new ApiBuilder(api, this.identification, this.type); // load to value
            return apibuilder.run();
        });

        const mapResponses = await Promise.allSettled(mapCollections);

        const mapResults = mapResponses.reduce((acc, result) => {
            if (result.status === 'fulfilled') {
                acc.push(result.value as TypeResponseCollector);
            } else {
                // Registrar errores para debugging
                console.warn('API failed:', result.reason);
            }
            return acc;
        }, [] as TypeResponseCollector[]);

        return mapResults;
    }
}