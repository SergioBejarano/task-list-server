# ¿ Qué es mi producto y para qué sirve?

Task List Server es una API construida con Express que permite a equipos y emprendedores centralizar la administracion de pendientes en un solo lugar. Automatiza el registro, actualizacion y seguimiento de tareas para que cada integrante sepa exactamente que debe hacer, cuando debe hacerlo y como avanza el equipo. En lugar de depender de hojas de calculo o mensajes dispersos, la API se integra con cualquier cliente web o movil y expone endpoints claros para crear, listar, editar y cerrar tareas en tiempo real.

# ¿ Cuáles son las funcionalidades más importantes y por que los usuarios las usarian?

1. Creacion y edicion de tareas con metadatos (responsable, prioridad, fecha objetivo). Esto permite que cada tarea tenga contexto y que los lideres asignen responsabilidades sin ambiguedades.
2. Listado filtrado y ordenado. Los usuarios pueden consumir la API para armar vistas personalizadas (por estado, prioridad o responsable) y asi enfocarse en lo que realmente importa cada dia.
3. Persistencia y consistencia via middlewares de validacion. Se bloquean entradas incompletas y se mantiene la integridad del backlog, evitando reprocesos y asegurando datos confiables para reportes o dashboards.
4. Integracion sencilla con frontends existentes. Al basarse en JSON estandar y rutas REST, cualquier cliente puede conectarse rapidamente y extender la experiencia (notificaciones, tableros kanban, chatbots, etc.).

# ¿ Que tecnologias usaste y por qué?

- Express.js: ofrece un enrutamiento minimalista y flexible ideal para montar APIs rapidas sin sobrecarga innecesaria.
- Node.js: permite un backend asincrono que maneja multiples solicitudes simultaneas con bajo costo computacional.
- Middleware personalizados y JSON nativo: facilitan la validacion temprana de datos y la comunicacion fluida con interfaces modernas.
- NPM scripts y modularizacion en routers: agilizan el mantenimiento, las pruebas y la futura expansion hacia microservicios o despliegues en la nube.
