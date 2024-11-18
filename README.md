# Ruraq Maki - Plataforma de Artesanías

## Descripción
Ruraq Maki es una plataforma que conecta artesanos de Bucaramanga con compradores interesados en productos artesanales únicos. La aplicación permite la gestión de productos artesanales, talleres educativos y un sistema de chat para comunicación directa.

## Características Principales
- Autenticación social (Google, Facebook, Discord)
- Registro y login con email/teléfono
- Gestión de productos artesanales
- Sistema de talleres educativos
- Chat en tiempo real
- Sistema de favoritos
- Carrito de compras
- Gestión de cupones

## Requisitos Previos
- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/himayrobr/artesano
cd artesano
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env en la raíz del proyecto:
```env
# Servidor
EXPRESS_HOST="localhost"
EXPRESS_PORT=5000

# Base de datos
EXPRESS_HOST="localhost"
EXPRESS_PORT=5000
MONGO_URI="mongodb+srv://topetusam:campus2023@mongo-learn-101.ij8au6n.mongodb.net/"
MONGO_DB="artesanias"

GOOGLE_CLIENT_ID=303571449328-7dif1p1ig1vv99el336dibh64g2mktaa.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

DISCORD_CLIENT_ID=1300935621199663124
DISCORD_CLIENT_SECRET=oJT2CEQZg2oZja-E_KrBhNm2Vr3sVVsQ

FACEBOOK_CLIENT_ID=894385772785638
FACEBOOK_CLIENT_SECRET=01358c2b25722e0c4865ab6c68870a93

SESSION_SECRET=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
MONGO_DB="artesanias"
JWT_SECRET=P7kR9RynmAN2J8P-7UWj-xukQjbo8Hga5lEEanWVCnY
```

4. Iniciar el proyecto:
```bash
npm run dev
```

## Guía Completa de APIs (Thunder Client)

### Configuración de Variables Globales en Thunder Client
```json
{
  "baseUrl": "http://localhost:5000",
  "token": "tu_token_jwt",
  "userId": "id_del_usuario",
  "productId": "id_del_producto",
  "workshopId": "id_del_taller"
}
```

### 1. Autenticación

#### Registro por Email
```http
POST http://localhost:5000/auth/register/email
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "username": "usuario1",
  "phone": "3001234567"
}
```

#### Registro por Teléfono
```http
POST http://localhost:5000/auth/register/phone
Content-Type: application/json

{
  "phone": "3001234567",
  "password": "contraseña123",
  "username": "usuario1"
}
```

#### Login Manual
```http
POST http://localhost:5000/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

#### Login Social (Google)
```http
GET http://localhost:5000/auth/google
```

#### Login Social (Facebook)
```http
GET http://localhost:5000/auth/facebook
```

#### Login Social (Discord)
```http
GET http://localhost:5000/auth/discord
```

#### Logout
```http
POST http://localhost:5000/auth/logout
Authorization: Bearer {{token}}
```

### 7. Ejemplos de Respuestas

#### Respuesta de Login Exitoso
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f9d8c2e852a1234567890",
    "username": "usuario1",
    "email": "usuario@ejemplo.com",
    "type": "comprador",
    "photo": "http://localhost:5000/uploads/profile-photos/default.jpg"
  }
}
```

#### Respuesta de Obtener Usuario
```json
{
  "success": true,
  "usuario": {
    "_id": "65f9d8c2e852a1234567890",
    "username": "usuario1",
    "email": "usuario@ejemplo.com",
    "phone": "3001234567",
    "address": "Calle 123",
    "type": "comprador",
    "favorites": ["65f9d8c2e852a1234567891", "65f9d8c2e852a1234567892"],
    "workshopsEnrolled": ["65f9d8c2e852a1234567893"]
  }
}
```

#### Respuesta de Error
```json
{
  "error": "Mensaje de error específico",
  "status": 400
}
```

### 8. Códigos de Estado HTTP

- 200: OK - Petición exitosa
- 201: Created - Recurso creado exitosamente
- 400: Bad Request - Error en la petición
- 401: Unauthorized - No autorizado
- 403: Forbidden - Acceso prohibido
- 404: Not Found - Recurso no encontrado
- 500: Internal Server Error - Error del servidor

### 9. Estructura del Proyecto
```
/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── chatController.js
│   │   └── ...
│   ├── models/
│   │   ├── User.js
│   │   ├── Chat.js
│   │   └── ...
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── chatRoutes.js
│   │   └── ...
│   ├── middleware/
│   │   ├── passportConfig.js
│   │   └── ...
│   └── helpers/
│       └── connect.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Chat.jsx
│   │   │   └── ...
│   │   ├── styles/
│   │   │   └── *.css
│   │   ├── router/
│   │   │   └── AppRouter.jsx
│   │   └── apiConfig.js
│   └── vite.config.js
├── uploads/
│   └── profile-photos/
├── app.js
├── package.json
└── .env
```

### 10. Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia frontend y backend en modo desarrollo
npm run client      # Inicia solo el frontend
npm run server      # Inicia solo el backend

# Producción
npm run build       # Construye el frontend
npm start          # Inicia la aplicación en producción

# Otros
npm run lint       # Ejecuta el linter
npm run preview    # Vista previa de producción
```

### 11. Dependencias Principales

#### Backend
- express: Framework web
- mongoose: ODM para MongoDB
- passport: Autenticación
- socket.io: Comunicación en tiempo real
- multer: Manejo de archivos
- jsonwebtoken: Autenticación JWT

#### Frontend
- react: Biblioteca UI
- vite: Bundler
- react-router-dom: Enrutamiento
- socket.io-client: Cliente WebSocket
- zustand: Gestión de estado

### 12. Configuración de Desarrollo

#### Variables de Entorno para Desarrollo
```env
# Copia este contenido en un archivo .env.development
EXPRESS_HOST="localhost"
EXPRESS_PORT=5000
MONGO_URI="mongodb://localhost:27017/"
MONGO_DB="artesanias_dev"
NODE_ENV="development"
```

#### Configuración de Base de Datos Local
1. Iniciar MongoDB:
```bash
mongod --dbpath /ruta/a/tu/data/directory
```

2. Crear índices necesarios:
```javascript
db.users.createIndex({ "email": 1 }, { unique: true, sparse: true })
db.users.createIndex({ "phone": 1 }, { unique: true, sparse: true })
```

### 13. Solución de Problemas Comunes

#### Error de CORS
Si encuentras errores de CORS, verifica:
1. El origen está permitido en la configuración del servidor
2. Las credenciales están configuradas correctamente
```javascript
// En frontend/src/apiConfig.js
const config = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
};
```

#### Problemas de Autenticación
1. Verifica que el token JWT sea válido
2. Asegúrate de que las cookies estén habilitadas
3. Comprueba las variables de entorno de autenticación social

#### Errores de Socket.io
Si el chat no funciona:
1. Verifica la conexión del WebSocket
2. Comprueba los eventos del socket en la consola
3. Asegúrate de que el puerto del socket esté abierto

### 14. Guía de Contribución

#### Flujo de Trabajo
1. Fork del repositorio
2. Crear una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit de cambios: `git commit -m 'Añade nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

#### Estándares de Código
- Usar ESLint con la configuración del proyecto
- Seguir el estilo de código existente
- Documentar nuevas funciones y componentes
- Escribir mensajes de commit descriptivos

### 15. Seguridad

#### Mejores Prácticas Implementadas
- Sanitización de entradas de usuario
- Validación de datos en backend
- Encriptación de contraseñas con bcrypt
- Protección contra inyección SQL
- Rate limiting en endpoints sensibles

#### Configuración de Seguridad
```javascript
// Ejemplo de configuración de seguridad en app.js
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de solicitudes por ventana
}));
```

### 16. Despliegue

#### Preparación para Producción
1. Construir el frontend:
```bash
npm run build
```

2. Configurar variables de entorno de producción:
```env
NODE_ENV="production"
MONGO_URI="tu_uri_de_mongodb_produccion"
```

3. Iniciar en modo producción:
```bash
npm start
```

#### Recomendaciones de Hosting
- Frontend: Vercel, Netlify
- Backend: Railway, Heroku
- Base de datos: MongoDB Atlas

### 17. Licencia
Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

### 18. Contacto y Soporte

#### Equipo de Desarrollo
- Frontend: [Nombre del desarrollador]
- Backend: [Nombre del desarrollador]
- UX/UI: [Nombre del diseñador]

#### Reportar Problemas
- Usar el sistema de Issues de GitHub
- Incluir pasos para reproducir el problema
- Adjuntar capturas de pantalla si es necesario

---

## Notas de Versión
- v1.0.0 - Lanzamiento inicial
- v1.1.0 - Añadido sistema de chat
- v1.2.0 - Integración con pasarelas de pago