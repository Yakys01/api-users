# API USER COLLECTOR

## Descripción
Esta es una API construida con Elysia (framework para Bun) que permite la gestión de usuarios, empresas, ubicaciones y taxonomías. Incluye funcionalidades de autenticación, recopilación de datos de usuarios desde APIs externas y servicios relacionados.

## Tecnologías
- **Framework**: Elysia (Bun)
- **Base de datos**: Drizzle ORM
- **Lenguaje**: TypeScript

## Instalación
1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   bun install
   ```
3. Configura las variables de entorno en un archivo `.env` basado en `.env.example`.

## Desarrollo
Para iniciar el servidor de desarrollo:
```bash
bun run dev
```
La API estará disponible en `http://localhost:3000`.

## Uso
La API proporciona endpoints para:
- **Usuarios**: Crear, leer, actualizar y eliminar usuarios.
- **Empresas**: Gestión de empresas.
- **Ubicaciones**: Manejo de ubicaciones.
- **Taxonomías**: Administración de taxonomías.
- **Autenticación**: Login y registro.
- **Recopilación**: Servicios para recolectar datos de usuarios desde APIs externas.

Consulta los archivos en `src/routes/` y `src/api/` para más detalles sobre los endpoints.

## Migraciones de Base de Datos
Para ejecutar migraciones con Drizzle:
```bash
bun run db:migrate
```

## Contribución
1. Haz un fork del proyecto.
2. Crea una rama para tu feature.
3. Envía un pull request.