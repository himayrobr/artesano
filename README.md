### **Aplicación de Compra y Venta de Artesanías**

### **Descripción del Proyecto**

El proyecto consiste en el desarrollo de una **Aplicación de Compra y Venta de Artesanías**. Esta aplicación tiene como objetivo conectar a artesanos de **Bucaramanga** con compradores interesados en productos artesanales únicos y auténticos. La plataforma será solicitada y gestionada por **Campuslands**, una empresa comprometida con la promoción y comercialización de productos locales, artesanales y tecnológicos.

**Problema:**

A pesar de la rica tradición artesanal en Bucaramanga, los artesanos locales enfrentan dificultades significativas para comercializar sus productos de manera efectiva. Entre los principales problemas se encuentran:

1. **Limitada Visibilidad y Alcance**: Los artesanos suelen operar en mercados locales limitados y tienen pocas oportunidades para exponer sus productos a un público más amplio. La falta de visibilidad impide que sus artesanías lleguen a compradores fuera de su área geográfica inmediata.
2. **Dificultades en la Gestión de Ventas**: La venta de artesanías a menudo requiere una gestión compleja de inventarios, precios y pedidos. Los artesanos a menudo carecen de las herramientas necesarias para manejar estas tareas de manera eficiente, lo que puede llevar a errores en el stock y pérdidas de ventas.
3. **Falta de Acceso a Recursos de Comercialización**: Los artesanos no siempre tienen acceso a recursos o plataformas que les permitan promocionar sus productos adecuadamente. Esto incluye la falta de una presencia en línea efectiva y la incapacidad de ofrecer descuentos o promociones a sus clientes.
4. **Comunicación Ineficiente con Compradores**: Los compradores interesados en artesanías a menudo encuentran difícil comunicarse directamente con los artesanos para obtener información adicional o resolver dudas sobre los productos. Esto puede llevar a una experiencia de compra frustrante y a la pérdida de ventas potenciales.

### **Variables de entorno**

```json
EXPRESS_HOST="localhost"
EXPRESS_PORT=5000
MONGO_URI="mongodb+srv://topetusam:campus2023@mongo-learn-101.ij8au6n.mongodb.net/"
MONGO_DB="artesanias"
GOOGLE_CLIENT_ID=516537379956-0qepjc7l5vuinnuhcgshvbdldgtsuuof.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

DISCORD_CLIENT_ID=1300935621199663124
DISCORD_CLIENT_SECRET=oJT2CEQZg2oZja-E_KrBhNm2Vr3sVVsQ

FACEBOOK_CLIENT_ID=894385772785638
FACEBOOK_CLIENT_SECRET=01358c2b25722e0c4865ab6c68870a93

SESSION_SECRET=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
JWT_SECRET=P7kR9RynmAN2J8P-7UWj-xukQjbo8Hga5lEEanWVCnY
```

### **Instalacion**

```json
npm i
```



### **Inicialización del Proyecto**

```json
npm run dev
```

## Endpoints que deben desarrollarse



| **Funcionalidad**               | **Método HTTP** | **Endpoint**                         | **Descripción**                                             |
| ------------------------------- | --------------- | ------------------------------------ | ----------------------------------------------------------- |
| **Usuarios**                    |                 |                                      |                                                             |
| Crear Usuario                   | POST            | `/users/register`                    | Registra un nuevo usuario.                                  |
| Iniciar Sesión                  | POST            | `/users/login`                       | Permite a un usuario iniciar sesión y obtener un token JWT. |
| Actualizar Usuario              | PUT             | `/users/{id}`                        | Actualiza la información del usuario específico.            |
| Obtener Usuario                 | GET             | `/users/{id}`                        | Obtiene los detalles de un usuario específico.              |
| Eliminar Usuario                | DELETE          | `/users/{id}`                        | Elimina un usuario específico.                              |
| Agregar Favorito                | POST            | `/users/{id}/favorites/{productId}`  | Agrega un producto a los favoritos del usuario.             |
| Eliminar Favorito               | DELETE          | `/users/{id}/favorites/{productId}`  | Elimina un producto de los favoritos del usuario.           |
| Agregar Taller                  | POST            | `/users/{id}/workshops/{workshopId}` | Asocia un taller al usuario.                                |
| Eliminar Taller                 | DELETE          | `/users/{id}/workshops/{workshopId}` | Desasocia un taller del usuario.                            |
| **Notas** (o talleres)          |                 |                                      |                                                             |
| Crear Taller                    | POST            | `/workshops/orders`                  | Crea un nuevo taller.                                       |
| Actualizar Taller               | PUT             | `/workshops/{id}`                    | Actualiza un taller específico.                             |
| Eliminar Taller                 | DELETE          | `/workshops/{id}`                    | Elimina un taller específico.                               |
| Buscar Talleres                 | GET             | `/workshops/search`                  | Busca talleres por criterios específicos.                   |
| Obtener Todos los Talleres      | GET             | `/workshops`                         | Obtiene una lista de todos los talleres disponibles.        |
| **Productos**                   |                 |                                      |                                                             |
| Crear Producto                  | POST            | `/products`                          | Crea un nuevo producto.                                     |
| Obtener Producto por ID         | GET             | `/products/{id}`                     | Obtiene los detalles de un producto específico.             |
| Buscar Productos                | GET             | `/products/search`                   | Busca productos por título o descripción.                   |
| Obtener Todos los Productos     | GET             | `/products`                          | Obtiene una lista de todos los productos.                   |
| Obtener Productos por Categoría | GET             | `/products/categoria/{categoria}`    | Obtiene productos filtrados por categoría.                  |
| Actualizar Producto             | PUT             | `/products/{id}`                     | Actualiza un producto existente.                            |
| Eliminar Producto               | DELETE          | `/products/{id}`                     | Elimina un producto específico.                             |
| **Pedidos**                     |                 |                                      |                                                             |
| Crear Pedido                    | POST            | `/orders/create`                     | Crea un nuevo pedido.                                       |
| Obtener Todos los Pedidos       | GET             | `/orders`                            | Obtiene una lista de todos los pedidos.                     |
| Obtener Pedido por ID           | GET             | `/orders/{id}`                       | Obtiene los detalles de un pedido específico.               |
| Actualizar Pedido               | PUT             | `/orders/{id}`                       | Actualiza un pedido existente.                              |
| Eliminar Pedido                 | DELETE          | `/orders/{id}`                       | Elimina un pedido específico.                               |
| **Cupones**                     |                 |                                      |                                                             |
| Crear Cupón                     | POST            | `/coupons`                           | Crea un nuevo cupón.                                        |
| Obtener Todos los Cupones       | GET             | `/coupons`                           | Obtiene una lista de todos los cupones.                     |
| Obtener Cupón por Código        | GET             | `/coupons/{codigo}`                  | Obtiene los detalles de un cupón específico.                |
| Validar Cupón                   | GET             | `/coupons/validate/{codigo}`         | Valida la disponibilidad de un cupón.                       |
| Aplicar Cupón al Carrito        | POST            | `/coupons/apply`                     | Aplica un cupón al carrito actual.                          |
| Actualizar Cupón                | PUT             | `/coupons/{codigo}`                  | Actualiza un cupón existente.                               |
| Eliminar Cupón                  | DELETE          | `/coupons/{codigo}`                  | Elimina un cupón específico.                                |
| **Carrito**                     |                 |                                      |                                                             |
| Agregar Producto al Carrito     | POST            | `/cart/add`                          | Agrega un producto al carrito del usuario.                  |
| Eliminar Producto del Carrito   | POST            | `/cart/remove`                       | Elimina un producto del carrito del usuario.                |
| Aplicar Cupón al Carrito        | POST            | `/cart/apply-coupon`                 | Aplica un cupón al carrito del usuario.                     |

### **Características Principales**

1. **Gestión de Usuarios**
- **Registro e Inicio de Sesión**: Los usuarios (artesanos y compradores) pueden registrarse y acceder a sus cuentas.
  
- **Perfiles de Usuario (Compradores):**
   - **Actualización de Información**: Los compradores pueden actualizar su información personal, como nombre, dirección, y correo electrónico.
   
   - **Actualización de Foto de Perfil**: Los compradores pueden cambiar su foto de perfil.
   
   - Lista de Favoritos:
   
     - **Favoritos de Artesanías**: Los compradores pueden marcar productos artesanales como favoritos y ver una lista de estos productos en su perfil.
    - **Favoritos de Talleres**: Los compradores pueden marcar talleres como favoritos y ver una lista de estos talleres en su perfil.
     
  - **Historial de Compras**: Los compradores pueden revisar su historial de compras, incluyendo detalles de cada pedido.
  
  - **Talleres Inscritos**: Los compradores pueden ver los talleres en los que están inscritos.
    
   - **Lista de Cupones**: Los compradores pueden ver y gestionar los cupones que tienen disponibles para canjear.
  
   - **Chat con Artesanos**: Los compradores pueden iniciar y mantener un chat con artesanos relacionados con los talleres a los que están inscritos, facilitando la comunicación sobre productos y talleres.

2. **Gestión de Productos**

   - **Listado de Productos**: La información de los productos será cargada manualmente en la base de datos por el administrador del sistema. Cada producto incluye nombre, descripción, precio, categoría, fotos y stock disponible.
   - **Visualización de Productos**: Los compradores pueden ver los productos listados con detalles y fotos.
   - **Cupones de Descuento**: Los artesanos pueden crear cupones que ofrecen descuentos para los productos.

3. **Búsqueda y Filtrado**

   - **Búsqueda de Productos**: Permite buscar productos por nombre o descripción.

   - **Filtrado de Productos:**
     - **Por Categorías**: Filtra productos por categorías definidas (por ejemplo, cerámica, textiles, joyería).
     
   - **Filtrado de Talleres**: Permite buscar y filtrar talleres artesanales por ubicación, tipo de artesanía, modalidad, y otros criterios relevantes.
   
4. **Carrito y Proceso de Compra**

   - **Carrito de Compras**: Los compradores pueden añadir productos al carrito y revisar los detalles antes de proceder al pago.

   - **Aplicación de Cupones:**
   - **Cupones Asignados**: Los compradores pueden ingresar códigos de cupones que han sido asignados a su perfil (por ejemplo, cupones promocionales específicos para ellos).
     - **Cupones Generales**: También pueden ingresar códigos de cupones generales disponibles para todos los compradores (por ejemplo, cupones para descuentos en talleres).

   - **Proceso de Pago**: Integración opcional con una pasarela de pago para completar las transacciones de forma segura.
   
5. **Comunicación**
   - **Mensajes Directos**: Los compradores y artesanos pueden intercambiar mensajes para resolver dudas o discutir detalles sobre los productos.
   
6. **Talleres Artesanales**

   - **Perfil de Talleres:**
     - **Modalidades:** Los talleres pueden ser presenciales o virtuales. La información específica de cada modalidad se detallará, incluyendo:
     - **Modalidad Presencial**: Información sobre la ubicación, fecha y hora, y requisitos para asistir en persona.
       - **Modalidad Virtual**: Enlace para la participación en línea, plataforma utilizada, y requisitos tecnológicos.
     
     - **Fechas:**
     - **Fecha de Inicio y Fin**: Las fechas en las que el taller comenzará y terminará.
       - **Duración**: La duración total del taller (por ejemplo, número de sesiones o duración en horas).
     
     - **Materiales:**
     - **Materiales Proporcionados**: Lista de materiales que el taller proporcionará a los participantes.
       - **Materiales Necesarios**: Lista de materiales que los participantes deberán traer o tener disponibles para el taller.

     - **Documental sobre Talleres**: Ofrece un enlace o integración para ver un documental que muestre el proceso artesanal, la historia del taller, o entrevistas con los artesanos.

### **Estructura de Datos**

- Usuarios
  - `_id` (ObjectId) - Identificador único del usuario.
  - `nombre` (String) - Nombre del usuario.
  - `correo` (String) - Correo electrónico del usuario (único).
  - `contraseña` (String) - Contraseña del usuario (hash).
  - `fotoPerfil` (String) - URL de la foto de perfil del usuario.
  - `direccion` (String) - Dirección del usuario.
  - `telefono` (String) - Número de teléfono del usuario.
  - `tipo` (String) - Tipo de usuario (comprador, artesano).
  - `favoritos` (Array de ObjectIds) - Lista de productos y talleres favoritos (referencias a `Productos` y `Talleres`).
  - `compras` (Array de ObjectIds) - Lista de identificadores de compras realizadas (referencias a `Pedidos`).
  - `talleresInscritos` (Array de ObjectIds) - Lista de identificadores de talleres en los que está inscrito (referencias a `Talleres`).
  - `cupones` (Array de ObjectIds) - Lista de cupones asignados al perfil del usuario (referencias a `Cupones`).

- Productos
  - `_id` (ObjectId) - Identificador único del producto.
  - `nombre` (String) - Nombre del producto.
  - `descripcion` (String) - Descripción del producto.
  - `precio` (Decimal) - Precio del producto.
  - `categoria` (String) - Categoría del producto.
  - `fotos` (Array de Strings) - URLs de las fotos del producto.
  - `stock` (Integer) - Cantidad disponible del producto.
  - `artesanoId` (ObjectId) - Identificador del artesano que vende el producto (referencia a `Usuarios`).

- Pedidos

  - `_id` (ObjectId) - Identificador único del pedido.

  - `usuarioId` (ObjectId) - Identificador del usuario que realizó el pedido (referencia a `Usuarios`).

  - `productos` (Array de Objetos) - Lista de productos en el pedido.
  - `productoId` (ObjectId) - Identificador del producto (referencia a `Productos`).
     - `cantidad` (Integer) - Cantidad del producto.
  - `precio` (Decimal) - Precio del producto al momento de la compra.
    
  - `total` (Decimal) - Total del pedido.
  
- `fecha` (Date) - Fecha del pedido.
  
- `estado` (String) - Estado del pedido (pendiente, enviado, entregado).

- Talleres
  - `_id` (ObjectId) - Identificador único del taller.
  - `nombre` (String) - Nombre del taller.
  - `descripcion` (String) - Descripción del taller.
  - `modalidad` (String) - Modalidad del taller (presencial, virtual).
  - `fechaInicio` (Date) - Fecha de inicio del taller.
  - `fechaFin` (Date) - Fecha de fin del taller.
  - `duracion` (String) - Duración del taller.
  - `materialesProporcionados` (Array de Strings) - Materiales que el taller proporciona.
  - `materialesRequeridos` (Array de Strings) - Materiales que los participantes deben traer.
  - `documental` (String) - URL del documental sobre el taller (opcional).
  - `artesanoId` (ObjectId) - Identificador del artesano que organiza el taller (referencia a `Usuarios`).

- Cupones
  - `_id` (ObjectId) - Identificador único del cupón.
  - `codigo` (String) - Código del cupón.
  - `descuento` (Decimal) - Valor del descuento del cupón.
  - `tipo` (String) - Tipo de cupón (general, asignado a usuario).
  - `fechaExpiracion` (Date) - Fecha de expiración del cupón.
  - `usuarioId` (ObjectId) - Identificador del usuario al que está asignado el cupón (opcional, referencia a `Usuarios`).

- Mensajes
  - `_id` (ObjectId) - Identificador único del mensaje.
  - `remitenteId` (ObjectId) - Identificador del usuario que envió el mensaje (referencia a `Usuarios`).
  - `receptorId` (ObjectId) - Identificador del usuario que recibe el mensaje (referencia a `Usuarios`).
  - `contenido` (String) - Contenido del mensaje.
  - `fecha` (Date) - Fecha y hora del mensaje.
  - 

### **Tecnologías y Herramientas**

- **Backend**: Express.js para manejar las rutas y la lógica del servidor.

- **Base de Datos**: MongoDB para almacenar datos de usuarios, productos, pedidos, talleres, cupones y mensajes.

- Frontend:

  - **Opcional**: Frameworks como React.js, Vue.js, o Angular para construir la interfaz de usuario.
  - **Alternativa**: HTML, CSS y JavaScript puro si se prefiere una implementación más sencilla.
  
- Autenticación:

  - **Passport.js**: Se utilizará `Passport.js` para la autenticación de usuarios mediante Facebook, Discord, y Google. Se implementará la lógica necesaria para manejar las sesiones de autenticación social.
  - **JSON Web Tokens (JWT)**: Para el registro manual de usuarios, se generarán tokens JWT utilizando `jsonwebtoken`. Estos tokens se almacenarán en la base de datos MongoDB para permitir la autenticación y autorización de usuarios.
  - **express-session**: Se utilizará `express-session` para gestionar la sesión del usuario, estableciendo un tiempo de expiración para las sesiones. Cada vista deberá verificar si la sesión sigue activa; de lo contrario, el usuario será redirigido a la vista de inicio de sesión.
  
- **Pagos**: Integración opcional con una pasarela de pago como Stripe o PayPal para manejar transacciones de forma segura.

- **Almacenamiento de Archivos**: Opcionalmente, usar AWS S3, Cloudinary o similar para almacenar y servir imágenes de productos; puede ser reemplazado por almacenamiento local si se prefiere.

- **Documental**: YouTube, Vimeo o cualquier plataforma de video para alojar los documentales, con integración mediante enlaces o reproductores embebidos.

### **Pasos para Implementar el Proyecto**

1. **Configuración del Entorno**
   - Configura un nuevo proyecto de Express y MongoDB.
   - Establece el esquema de la base de datos y crea modelos para usuarios, productos, pedidos, talleres, cupones y mensajes.
2. **Desarrollo del Backend**
   - Implementa las rutas y controladores para gestionar usuarios, productos, pedidos, talleres, cupones y mensajes.
   - Configura la autenticación de usuarios utilizando `Passport.js` para la autenticación social (Facebook, Discord, Google) y `jsonwebtoken` para generar tokens JWT para el registro manual. Implementa `express-session` para gestionar las sesiones y asegurar que cada vista verifique la validez de la sesión.
   - Implementa la lógica para la creación, aplicación y validación de cupones en el carrito y el proceso de pago.
   - Implementa la lógica para el filtrado de productos por categorías.
   - Implementa la integración con la pasarela de pago (opcional).
3. **Desarrollo del Frontend**
   - Diseña la interfaz de usuario utilizando los diseños proporcionados en el [archivo de Figma](https://www.figma.com/community/file/1268395877483237972).
   - Crea páginas para la visualización de productos, perfiles de usuario (compradores), carrito de compras, proceso de pago, perfil de talleres y aplicación de cupones.
   - Implementa funcionalidades para ingresar y aplicar cupones en el carrito de compras.
   - Implementa filtros para productos por categoría.
   - Implementa funcionalidades de búsqueda y visualización de documentales.
   - Implementa la lista de favoritos para artesanías y talleres.
   - Integra con el backend para mostrar datos dinámicos y manejar interacciones del usuario.
4. **Integración de Funcionalidades**
   - Integra el almacenamiento de imágenes para productos (opcional).
   - Configura el sistema de mensajería para la comunicación entre compradores y artesanos.
   - Implementa el perfil de talleres con detalles sobre modalidades, fechas, duración y materiales.
   - Implementa la funcionalidad para crear, gestionar y canjear cupones.
   - Implementa la lista de favoritos para artesanías y talleres.
5. **Pruebas y Despliegue**
   - Realiza pruebas funcionales y de integración para asegurar que todas las funcionalidades trabajan como se espera.
   - Despliega la aplicación en un servidor o en la nube (como Heroku, AWS, o DigitalOcean) si se desea. (Opcional)
6. **Mantenimiento y Mejoras**
   - Monitorea el rendimiento de la aplicación y recopila retroalimentación de los usuarios.
   - Realiza actualizaciones y mejoras continuas basadas en la retroalimentación y en las necesidades cambiantes.

### **Posibles Mejoras Futuras**

- **Integración con Redes Sociales**: Permitir compartir productos y documentales en plataformas sociales.
- **Sistema de Recompensas**: Implementar un sistema de recompensas o fidelización para compradores frecuentes.
- **Promociones y Ofertas Especiales**: Implementar promociones temporales y ofertas especiales adicionales.

