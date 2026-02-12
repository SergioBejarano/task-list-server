# ¿Qué es mi producto y para qué sirve?

Task List Server 3.0 es una API REST para organizar tareas, ahora con autenticación y rutas protegidas mediante JWT. Permite a equipos y sistemas externos gestionar pendientes de forma centralizada, segura y controlada, asegurando que solo usuarios autenticados puedan acceder a información sensible o realizar operaciones críticas.

# ¿Cuáles son las funcionalidades más importantes y por qué los usuarios las usarían?

1. **Autenticación de usuarios**: Solo usuarios válidos pueden obtener un token de acceso, lo que protege la información y restringe acciones a quienes tengan permisos.
2. **Rutas protegidas con JWT**: Ciertas operaciones requieren un token válido, evitando accesos no autorizados y mejorando la seguridad general del sistema.
3. **Validación proactiva**: Se rechazan solicitudes incompletas o mal formadas, lo que reduce errores y mejora la experiencia de integración.
4. **API modular y clara**: Separación de rutas de autenticación, rutas protegidas y gestión de tareas, facilitando el mantenimiento y la extensión del sistema.
5. **Formato estándar (JSON)**: Facilita la integración con frontends, bots, tableros y otros servicios.

# ¿Qué tecnologías usaste y por qué?

- **Node.js**: Permite manejar múltiples conexiones concurrentes de manera eficiente.
- **Express.js**: Facilita la organización de rutas y middlewares, manteniendo el código limpio y modular.
- **jsonwebtoken**: Implementa la autenticación segura mediante tokens JWT, estándar en la industria.
- **dotenv**: Permite gestionar secretos y configuraciones sensibles fuera del código fuente.
- **Middlewares personalizados**: Para validar datos y proteger rutas, asegurando calidad y seguridad.
- **NPM Scripts**: Simplifican la instalación y ejecución del servidor.
