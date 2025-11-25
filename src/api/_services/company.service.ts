/**
 * Tipos para el diccionario de estados SUNAT
 */
type SunatState = {
    code: string;
    description: string;
};

/**
 * Servicio para manejar estados SUNAT
 */
class SunatService {

    /**
     * Diccionario principal para match directo (clave: código abreviado, valor: descripción breve y precisa)
     */
    static sunatStates: Record<string, string> = {
        "ACTIVO": "Contribuyente realizando actividades tributarias habituales; operaciones normales sin restricciones.",
        "BAJA DE OFICIO": "Baja administrativa por SUNAT por inactividad o irregularidades; posible apelación para reactivar.",
        "BAJA DEFINITIVA": "Cese permanente de actividades; RUC cancelado, requiere nuevo registro para operar.",
        "SUSPENSION TEMPORAL": "Suspensión de actividades hasta 12 meses; comunicar reinicio vía SUNAT Virtual para levantar.",
        "NUM. INTERNO IDENTIF": "Identificador interno de SUNAT para control provisional; habilita trámites administrativos básicos.",
        "BAJA PROV. POR OFICI": "Baja temporal de oficio por presunción de inactividad; regularizar para evitar baja definitiva.",
        "INHABILITADO-VENT.UN": "Inhabilitado para Ventanilla Única; no emite comprobantes por deudas o incumplimientos pendientes.",
        "BAJA MULT.INSCR. Y O": "Baja por múltiples inscripciones o infracciones acumuladas; cancela RUC duplicado o irregular.",
        "OTROS OBLIGADOS": "Sujetos con obligaciones tributarias especiales (ej. retenedores); no en régimen general activo.",
        "ANULACION - ERROR SU": "Anulación por error en inscripción o datos; permite corrección y reinscripción inmediata.",
        "BAJA PROVISIONAL": "Baja temporal solicitada por cese de actividades; suspende obligaciones hasta reinicio comunicado.",
        "PENDIENTE DE INI. DE": "RUC inscrito pero pendiente de iniciar actividades formales; no genera obligaciones aún.",
        "ANUL.PROVI.-ACTO ILI": "Anulación provisional por acto ilícito detectado; suspende operaciones durante investigación SUNAT.",
        "ANULACION - ACTO ILI": "Anulación definitiva por acto ilícito (ej. fraude); RUC invalidado permanentemente."
    };

    /**
     * Obtiene la descripción de un estado SUNAT por su código.
     * @param state El código del estado.
     * @returns La descripción del estado o un mensaje de error si no se encuentra.
     */
    static getCondition(state: string): string {
        return this.sunatStates[state.toUpperCase()] || '';
    }

    /**
     * Array de objetos para iteración o tablas (opcional, para UI en CRM)
     */
    static stateList: { code: string; description: string }[] = Object.entries(this.sunatStates).map(([code, description]) => ({
        code,
        description
    }));
}

export { SunatService, SunatState };