# Task List Server

Task List Server es una API REST construida con Express para administrar listas de tareas desde cualquier cliente web o móvil. Centraliza la captura, consulta y actualización de pendientes para equipos que necesitan visibilidad en tiempo real sobre el avance de su backlog.

## ¿Qué se construyó?

- **Routers dedicados** para separar responsabilidades: `list-view-router` expone las lecturas y `list-edit-router` encapsula las operaciones de creación/edición.
- **JSON como contrato único** entre backend y clientes, simplificando integraciones con frontends ligeros, tableros kanban o bots de chat.
- **Middlewares de validación ligera** que aseguran que cada tarea tenga descripción y que los cambios se apliquen solo a tareas existentes.
- **Datos de ejemplo en memoria** para demostrar los flujos completos (listar, filtrar, crear, actualizar y eliminar) sin depender de una base externa.

## Beneficios para el cliente

1. Trazabilidad inmediata del estado de cada tarea (responsables, progreso y pendientes críticos).
2. Integración rápida gracias a endpoints REST convencionales y respuestas consistentes.
3. Menos reprocesos porque la API rechaza peticiones incompletas y mantiene la integridad del backlog.
4. Preparado para evolucionar a microservicios o despliegues en la nube al usar prácticas modulares desde la base.

## Tecnologías empleadas

- **Node.js** para aprovechar un bucle de eventos asíncrono y eficiente.
- **Express.js** por su router minimalista y fácil de extender mediante middlewares.
- **NPM Scripts** (vía `package.json`) para instalar dependencias y levantar el servidor con un único comando.

## Referencia de endpoints

| Método | Ruta                    | Descripción                                                       |
| ------ | ----------------------- | ----------------------------------------------------------------- |
| GET    | `/tasks`                | Lista todas las tareas disponibles.                               |
| GET    | `/tasks/:taskId`        | Devuelve una tarea específica por identificador numérico.         |
| GET    | `/tasks/status/:status` | Filtra por estado `complete` o `incomplete`.                      |
| POST   | `/tasks`                | Crea una tarea (requiere `description`, acepta `isCompleted`).    |
| PUT    | `/tasks/:taskId`        | Actualiza descripción y/o estado de una tarea existente.          |
| DELETE | `/tasks/:taskId`        | Elimina la tarea indicada y retorna el registro removido.         |
| POST   | `/login`                | Autentica usuarios predefinidos y retorna un JWT.                 |
| GET    | `/protected`            | Requiere JWT válido y devuelve los datos del usuario autenticado. |

## Autenticación y seguridad

- Existe un arreglo de usuarios demo (`admin`, `editor`, `viewer`) para probar el flujo de autenticación.
- `POST /login` valida `username` y `password` y responde con un token JWT con vigencia de 1 hora.
- Las rutas protegidas usan el header `Authorization: Bearer <token>`; si falta, está mal formado o el token expiró, el servidor devuelve el mensaje de error correspondiente.

## Configuración de entorno

1. Duplica `.env.example` como `.env`.
2. Define `JWT_SECRET` con una cadena larga y aleatoria.
3. (Opcional) Ajusta `PORT` si no quieres usar `3000`.

Sin un `JWT_SECRET` válido el servidor no se inicia, lo cual evita exponer rutas protegidas sin criptografía.

## Ejecución local

1. Instala dependencias: `npm install`.
2. Inicia el servidor: `npm start` (por defecto usa el puerto `3000`).
3. Prueba los endpoints desde tu cliente preferido (Postman, curl, frontend React/Vue, etc.).

El servidor expone los endpoints anteriores y persiste los cambios en memoria durante la sesión, ideal para demostraciones o pruebas rápidas.

## Escenarios comunes

- **Tableros de equipo:** consumir `GET /tasks/status/:status` para mostrar columnas por estado.
- **Bots o asistentes:** crear comandos que llamen a `POST /tasks` cuando un usuario capture un pendiente en chat.
- **Integraciones con dashboards:** usar `GET /tasks` para alimentar reportes de productividad o SLA.

