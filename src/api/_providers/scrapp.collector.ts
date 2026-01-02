interface SelectorConfig {
  /** Selector CSS para el elemento */
  selector: string;
  /** Nombre del campo en el objeto resultado */
  field: string;
  /** Nombre del atributo a extraer (ej: 'href', 'content'). Si presente, extrae atributo en lugar de textContent */
  attr?: string;
}

/** Clase utilitaria para scrapear páginas web y extraer estructuras de datos usando HTMLRewriter nativo de Bun.js */
export class Scrapper {
  /** 
   * Extrae datos estructurados de una página web basada en selectores CSS.
   * 
   * @param url - URL de la página a scrapear
   * @param configs - Lista de configuraciones de selectores
   * @returns Objeto con los datos extraídos (solo primera ocurrencia por campo)
   * @throws Error si la respuesta HTTP no es OK
   * 
   * @example
   * const data = await Scrapper.scrape('https://ejemplo.com', [
   *   { selector: 'h1', field: 'titulo' },
   *   { selector: 'meta[property="og:description"]', field: 'descripcion', attr: 'content' },
   *   { selector: 'a.main-link', field: 'enlace', attr: 'href' }
   * ]);
   * // data = { titulo: '...', descripcion: '...', enlace: '...' }
   */
  static async scrape(
    url: string,
    configs: SelectorConfig[]
  ): Promise<Record<string, string>> {
    const data: Record<string, string> = {};

    const rewriter = new HTMLRewriter();

    for (const config of configs) {
      rewriter.on(config.selector, {
        element(element: any) {
          const value = config.attr
            ? element.getAttribute(config.attr) ?? ''
            : element.textContent?.trim() ?? '';

          if (!data[config.field]) {
            data[config.field] = value;
          }
        },
      });
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    }

    const transformedResponse = rewriter.transform(response);
    await transformedResponse.text(); // Ejecuta los handlers consumiendo el stream

    return data;
  }
}
