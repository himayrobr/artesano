variables de entorno

EXPRESS_HOST="localhost"
EXPRESS_PORT=5000
MONGO_URI="mongodb+srv://topetusam:campus2023@mongo-learn-101.ij8au6n.mongodb.net/"
MONGO_DB="artesanias"
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

por favor imformar sobre cualquier cambio o error de haberlo

importante ver el archivo apiconfig.js en el frontend para hacer el fecht

 y en el app.js


Objetivo del Proyecto
Desarrollar una aplicación de compra y venta de artesanías, utilizando React-Vite para el frontend, Node.js y Express.js para el backend, MongoDB para la base de datos, y CSS para el estilo.

Plan de Proyecto
Día 1-2: Configuración Inicial y Planificación
Configuración del Proyecto: Configurar el entorno de desarrollo, instalar dependencias y configurar los repositorios.

Configurar Vite para React.

Configurar un servidor Express.

Conectar MongoDB a través de Mongoose.

Configurar las variables de entorno.

Planificación: Definir las historias de usuario y los requisitos del proyecto.

Crear un backlog con las tareas necesarias.

Establecer la prioridad de las tareas.

Día 3-5: Autenticación y Gestión de Usuarios
Autenticación:

Implementar registro e inicio de sesión utilizando JWT.

Configurar la autenticación social con Passport.js (Google, Facebook, Discord).

Perfiles de Usuario:

Crear endpoints para actualizar información del perfil y foto de perfil.

Implementar la funcionalidad de favoritos para productos y talleres.

Día 6-8: Gestión de Productos
Modelo y Endpoints:

Crear el modelo de productos en MongoDB.

Implementar endpoints para CRUD de productos.

Interfaz de Usuario:

Crear vistas para listar y visualizar productos.

Implementar formularios para agregar y editar productos.

Día 9-11: Carrito de Compras y Proceso de Pago
Carrito de Compras:

Implementar la funcionalidad del carrito de compras en el frontend.

Crear endpoints para gestionar el carrito de compras y procesar pedidos.

Integración de Pagos (opcional):

Integrar una pasarela de pago como Stripe o PayPal.

Día 12-13: Talleres Artesanales y Cupones
Talleres:

Crear el modelo de talleres en MongoDB.

Implementar endpoints para gestionar talleres.

Desarrollar vistas para listar y visualizar talleres.

Cupones:

Crear el modelo de cupones en MongoDB.

Implementar endpoints para crear y canjear cupones.

Añadir funcionalidad en el carrito de compras para aplicar cupones.

Día 14: Búsqueda y Filtrado de Productos y Talleres
Búsqueda:

Implementar la funcionalidad de búsqueda en el frontend.

Crear endpoints para buscar productos y talleres en el backend.

Filtrado:

Desarrollar filtros por categoría para productos y talleres.

Día 15: Pruebas y Despliegue
Pruebas:

Realizar pruebas funcionales y de integración.

Asegurar que todas las funcionalidades trabajan como se espera.

Despliegue:

Preparar la aplicación para su despliegue en un servidor o servicio de nube (Vercel, Heroku, etc.).

Configurar las variables de entorno en el entorno de producción.

Desplegar la aplicación.

Historias de Usuario
Autenticación:

Como usuario, quiero registrarme e iniciar sesión para acceder a mi perfil.

Como usuario, quiero iniciar sesión utilizando mis cuentas de Google, Facebook o Discord.

Perfiles de Usuario:

Como usuario, quiero actualizar mi información personal y mi foto de perfil.

Como usuario, quiero marcar productos y talleres como favoritos.

Gestión de Productos:

Como artesano, quiero agregar y gestionar mis productos en la plataforma.

Como comprador, quiero ver una lista de productos disponibles.

Carrito de Compras:

Como comprador, quiero añadir productos a mi carrito y proceder al pago.

Como comprador, quiero aplicar cupones de descuento en mi compra.

Talleres Artesanales:

Como usuario, quiero ver e inscribirme en talleres artesanales.

Como artesano, quiero crear y gestionar talleres en la plataforma.

Búsqueda y Filtrado:

Como usuario, quiero buscar productos y talleres por nombre o descripción.

Como usuario, quiero filtrar productos y talleres por categorías específicas.

Tecnologías y Herramientas
Frontend: React-Vite, CSS.

Backend: Node.js, Express.js, Passport.js.

Base de Datos: MongoDB, Mongoose.

Autenticación: JWT, Passport.js.

Pagos: Stripe o PayPal (opcional).

Despliegue: Vercel, Heroku, o similar.

Gestión de Tareas
Usar una herramienta de gestión de proyectos como Trello o Jira para organizar y seguir el progreso de las tareas de cada sprint. Crear tableros con columnas para Backlog, En Progreso, En Revisión, y Completado.

Documentación
Mantén la documentación del proyecto actualizada en un archivo README en el repositorio. Incluye:

Descripción del proyecto.

Requisitos de instalación.

Instrucciones de uso.

Notas sobre el despliegue.

Tecnologías y herramientas utilizadas.

Estructura del proyecto.

Reuniones Diarias (Daily Stand-Up)
Realiza reuniones diarias cortas para discutir:

Lo que se hizo ayer.

Lo que se hará hoy.

Bloqueadores o problemas que se necesitan resolver.

Revisión del Sprint
Al final de cada sprint, revisa las tareas completadas y planifica las siguientes. Ajusta el backlog y las prioridades según sea necesario.

¡Listo! Con este plan estructurado, estarás bien preparado para llevar a cabo tu proyecto de manera efectiva y organizada. ¿Listo para empezar? 🚀📓