# Documentación de la API - Ruraq Maki

## Índice
1. [Autenticación](#autenticación)
2. [Usuarios](#usuarios)
3. [Productos](#productos)
4. [Talleres](#talleres)
5. [Tiendas](#tiendas)
6. [Pedidos](#pedidos)
7. [Cupones](#cupones)
8. [Chat](#chat)

## Base URL
```
http://localhost:5000
```

## Autenticación

### Headers Requeridos
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Registro por Email
```http
POST /auth/register/email
Content-Type: application/json

{
  "username": "juanperez",
  "email": "juan.perez@gmail.com",
  "password": "Contraseña123!",
  "phone": "3001234567",
  "photo": "https://ejemplo.com/foto.jpg",
  "address": "Calle 123 #45-67, Bucaramanga",
  "type": "comprador",
  "favorites": [],
  "workshopsEnrolled": []
}
```

#### Respuesta Exitosa
```json
{
  "message": "Usuario registrado exitosamente.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "emailOrPhone": "juan.perez@gmail.com",
  "password": "Contraseña123!"
}
```

#### Respuesta Exitosa
```json
{
  "userId": "65f9d8c2e852a1234567890",
  "username": "juanperez",
  "userPhoto": "https://ejemplo.com/foto.jpg",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Autenticación Social

#### Google
```http
GET /auth/google

# Redirige a la página de login de Google
# Callback URL: http://localhost:5000/auth/google/callback
```

#### Facebook
```http
GET /auth/facebook

# Redirige a la página de login de Facebook
# Callback URL: http://localhost:5000/auth/facebook/callback
```

#### Discord
```http
GET /auth/discord

# Redirige a la página de login de Discord
# Callback URL: http://localhost:5000/auth/discord/callback
```

## Usuarios

### Obtener Usuario por ID
```http
GET /users/65f9d8c2e852a1234567890
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Respuesta
```json
{
  "id": "65f9d8c2e852a1234567890",
  "username": "juanperez",
  "email": "juan.perez@gmail.com",
  "phone": "3001234567",
  "photo": "https://ejemplo.com/foto.jpg",
  "address": "Calle 123 #45-67, Bucaramanga",
  "type": "comprador",
  "favorites": ["65f9d8c2e852a1234567891", "65f9d8c2e852a1234567892"],
  "workshopsEnrolled": ["65f9d8c2e852a1234567893"]
}
```

### Actualizar Usuario
```http
PUT /users/65f9d8c2e852a1234567890
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "username": "juan.perez",
  "phone": "3009876543",
  "address": "Carrera 45 #12-34, Floridablanca"
}
```

#### Respuesta
```json
{
  "message": "Usuario actualizado exitosamente",
  "usuario": {
    "id": "65f9d8c2e852a1234567890",
    "username": "juan.perez",
    "phone": "3009876543",
    "address": "Carrera 45 #12-34, Floridablanca",
    "updatedAt": "2024-03-20T15:30:00.000Z"
  }
}
```
### Gestión de Favoritos

#### Agregar Favorito
```http
POST /users/65f9d8c2e852a1234567890/favorites/65f9d8c2e852a1234567891
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Respuesta
```json
{
  "message": "Producto agregado a favoritos",
  "favoritos": [
    {
      "id": "65f9d8c2e852a1234567891",
      "nombre": "Mochila Wayuu",
      "precio": 150000
    }
  ]
}
```

### Actualizar Foto de Perfil
```http
PUT /users/65f9d8c2e852a1234567890/photo
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

Form Data:
- fotoPerfil: [archivo.jpg]
```

#### Respuesta
```json
{
  "message": "Foto de perfil actualizada",
  "photoUrl": "http://localhost:5000/uploads/profile-photos/1234567890.jpg"
}
```

## Productos

### Obtener Todos los Productos
```http
GET /products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Respuesta
```json
{
  "productos": [
    {
      "id": "65f9d8c2e852a1234567891",
      "nombre": "Mochila Wayuu",
      "descripcion": "Mochila artesanal tejida a mano",
      "precio": 150000,
      "categoria": "textiles",
      "fotos": [
        "http://localhost:5000/uploads/products/mochila1.jpg",
        "http://localhost:5000/uploads/products/mochila2.jpg"
      ],
      "stock": 5,
      "artesanoId": "65f9d8c2e852a1234567890"
    }
  ],
  "total": 1,
  "pagina": 1,
  "porPagina": 10
}
```

### Buscar Productos
```http
GET /products/search?q=mochila&categoria=textiles&precioMin=100000&precioMax=200000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Respuesta
```json
{
  "resultados": [
    {
      "id": "65f9d8c2e852a1234567891",
      "nombre": "Mochila Wayuu",
      "precio": 150000,
      "categoria": "textiles",
      "foto": "http://localhost:5000/uploads/products/mochila1.jpg"
    }
  ],
  "total": 1
}
```

### Crear Producto
```http
POST /products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

{
  "nombre": "Mochila Wayuu Tradicional",
  "descripcion": "Mochila artesanal tejida a mano por artesanos Wayuu",
  "precio": 150000,
  "categoria": "textiles",
  "stock": 5,
  "artesanoId": "65f9d8c2e852a1234567890",
  "fotos": [
    {
      "nombre": "Vista frontal",
      "archivo": [archivo1.jpg]
    },
    {
      "nombre": "Detalles",
      "archivo": [archivo2.jpg]
    }
  ]
}
```

#### Respuesta
```json
{
  "message": "Producto creado exitosamente",
  "producto": {
    "id": "65f9d8c2e852a1234567891",
    "nombre": "Mochila Wayuu Tradicional",
    "descripcion": "Mochila artesanal tejida a mano por artesanos Wayuu",
    "precio": 150000,
    "categoria": "textiles",
    "stock": 5,
    "artesanoId": "65f9d8c2e852a1234567890",
    "fotos": [
      {
        "url": "http://localhost:5000/uploads/products/mochila1.jpg",
        "nombre": "Vista frontal"
      },
      {
        "url": "http://localhost:5000/uploads/products/mochila2.jpg",
        "nombre": "Detalles"
      }
    ],
    "createdAt": "2024-03-20T15:30:00.000Z"
  }
}
```

### Actualizar Producto
```http
PUT /products/65f9d8c2e852a1234567891
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "precio": 175000,
  "stock": 3,
  "descripcion": "Mochila artesanal Wayuu tejida a mano con diseños tradicionales"
}
```

#### Respuesta
```json
{
  "message": "Producto actualizado exitosamente",
  "producto": {
    "id": "65f9d8c2e852a1234567891",
    "precio": 175000,
    "stock": 3,
    "descripcion": "Mochila artesanal Wayuu tejida a mano con diseños tradicionales",
    "updatedAt": "2024-03-20T16:30:00.000Z"
  }
}
```

## Talleres

### Obtener Todos los Talleres
```http
GET /workshops
Authorization: Bearer <token>
```

### Crear Taller
```http
POST /workshops/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Taller de Cerámica Tradicional",
  "descripcion": "Aprende técnicas ancestrales de cerámica",
  "modalidad": "presencial",
  "fechaInicio": "2024-04-01T10:00:00.000Z",
  "fechaFin": "2024-04-01T13:00:00.000Z",
  "duracion": "3 horas",
  "materialesProporcionados": [
    "arcilla",
    "herramientas básicas",
    "horno"
  ],
  "materialesRequeridos": [
    "delantal",
    "cuaderno"
  ],
  "documental": "url_del_video",
  "artesanoId": "65f9d8c2e852a1234567890"
}
```

### Actualizar Taller
```http
PUT /workshops/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Taller de Cerámica Avanzada",
  "descripcion": "Actualización de la descripción",
  "modalidad": "híbrido",
  "materialesProporcionados": [
    "arcilla premium",
    "herramientas profesionales",
    "horno cerámico"
  ]
}
```

## Pedidos

### Crear Pedido
```http
POST /orders/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "usuarioId": "65f9d8c2e852a1234567890",
  "productos": [
    {
      "productoId": "65f9d8c2e852a1234567891",
      "cantidad": 2,
      "precio": 25.99
    },
    {
      "productoId": "65f9d8c2e852a1234567892",
      "cantidad": 1,
      "precio": 35.50
    }
  ],
  "total": 87.48,
  "estado": "pendiente"
}
```

### Actualizar Pedido
```http
PUT /orders/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "estado": "enviado",
  "productos": [
    {
      "productoId": "65f9d8c2e852a1234567891",
      "cantidad": 3,
      "precio": 25.99
    }
  ],
  "total": 77.97
}
```

## Cupones

### Crear Cupón
```http
POST /coupons
Authorization: Bearer <token>
Content-Type: application/json

{
  "codigo": "VERANO2024",
  "descuento": 15,
  "tipo": "general",
  "fechaExpiracion": "2024-12-31T23:59:59.999Z",
  "usuarioId": "65f9d8c2e852a1234567890"
}
```

### Aplicar Cupón
```http
POST /coupons/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "codigo": "VERANO2024",
  "total": 100.00,
  "usuarioId": "65f9d8c2e852a1234567890"
}
```

## Chat

### Enviar Mensaje
```http
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "remitenteId": "65f9d8c2e852a1234567890",
  "receptorId": "65f9d8c2e852a1234567891",
  "contenido": "Hola, ¿está disponible el producto?",
  "fecha": "2024-03-20T15:30:00.000Z"
}
```

## Tiendas

### Crear Tienda
```http
POST /store
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Artesanías Don José",
  "descripcion": "Tienda especializada en artesanías tradicionales",
  "foto": "url_de_la_foto",
  "documental": "url_del_video",
  "ciudad": "Bucaramanga"
}
```

### Actualizar Tienda
```http
PUT /store/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Artesanías Don José & Familia",
  "descripcion": "Tienda familiar de artesanías tradicionales",
  "foto": "nueva_url_de_la_foto",
  "ciudad": "Floridablanca"
}
```

## Respuestas Comunes

### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Operación realizada con éxito",
  "data": {
    "id": "65f9d8c2e852a1234567890",
    "createdAt": "2024-03-20T15:30:00.000Z",
    "updatedAt": "2024-03-20T15:30:00.000Z"
  }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detalles específicos del error"
  }
}
```

## Productos (Ejemplos Adicionales)

### Crear Producto con Imágenes
```http
POST /products
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "nombre": "Tejido Wayuu Original",
  "descripcion": "Mochila tejida a mano por artesanos Wayuu",
  "precio": 150000,
  "categoria": "textiles",
  "stock": 5,
  "artesanoId": "65f9d8c2e852a1234567890",
  "fotos": [
    {
      "url": "mochila_wayuu_1.jpg",
      "descripcion": "Vista frontal"
    },
    {
      "url": "mochila_wayuu_2.jpg",
      "descripcion": "Detalles del tejido"
    }
  ]
}
```

#### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "producto": {
    "_id": "65f9d8c2e852a1234567891",
    "nombre": "Tejido Wayuu Original",
    "descripcion": "Mochila tejida a mano por artesanos Wayuu",
    "precio": 150000,
    "categoria": "textiles",
    "stock": 5,
    "artesanoId": "65f9d8c2e852a1234567890",
    "fotos": [
      {
        "url": "http://localhost:5000/uploads/products/mochila_wayuu_1.jpg",
        "descripcion": "Vista frontal"
      },
      {
        "url": "http://localhost:5000/uploads/products/mochila_wayuu_2.jpg",
        "descripcion": "Detalles del tejido"
      }
    ],
    "createdAt": "2024-03-20T16:00:00.000Z"
  }
}
```

### Actualizar Stock de Producto
```http
PUT /products/:id/stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "stock": 10,
  "operacion": "incrementar"  // "incrementar" o "decrementar"
}
```

## Talleres (Ejemplos Adicionales)

### Inscribir Usuario a Taller
```http
POST /workshops/:workshopId/inscripcion
Authorization: Bearer <token>
Content-Type: application/json

{
  "usuarioId": "65f9d8c2e852a1234567890",
  "informacionAdicional": {
    "alergias": "Ninguna",
    "experienciaPreviaArtesanal": "Principiante",
    "expectativas": "Aprender técnicas básicas"
  }
}
```

#### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Inscripción exitosa",
  "inscripcion": {
    "workshopId": "65f9d8c2e852a1234567893",
    "usuarioId": "65f9d8c2e852a1234567890",
    "fechaInscripcion": "2024-03-20T16:00:00.000Z",
    "estado": "confirmado"
  }
}
```

### Calificar Taller
```http
POST /workshops/:workshopId/calificacion
Authorization: Bearer <token>
Content-Type: application/json

{
  "usuarioId": "65f9d8c2e852a1234567890",
  "calificacion": 5,
  "comentario": "Excelente taller, muy instructivo",
  "aspectos": {
    "contenido": 5,
    "instructor": 5,
    "materiales": 4,
    "instalaciones": 5
  }
}
```

## Chat (Ejemplos Adicionales)

### Crear Sala de Chat
```http
POST /api/chat/salas
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Consulta Mochila Wayuu",
  "participantes": [
    {
      "usuarioId": "65f9d8c2e852a1234567890",
      "rol": "comprador"
    },
    {
      "usuarioId": "65f9d8c2e852a1234567891",
      "rol": "artesano"
    }
  ],
  "productoId": "65f9d8c2e852a1234567892"
}
```

### Enviar Mensaje con Imagen
```http
POST /api/chat/mensaje
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "salaId": "65f9d8c2e852a1234567894",
  "remitenteId": "65f9d8c2e852a1234567890",
  "tipo": "imagen",
  "contenido": "¿Este es el color que tienen disponible?",
  "imagen": [archivo_binario]
}
```

## Cupones (Ejemplos Adicionales)

### Crear Cupón para Usuario Específico
```http
POST /coupons/usuario
Authorization: Bearer <token>
Content-Type: application/json

{
  "codigo": "BIENVENIDA_USER123",
  "descuento": 20,
  "tipo": "primer_compra",
  "fechaExpiracion": "2024-12-31T23:59:59.999Z",
  "usuarioId": "65f9d8c2e852a1234567890",
  "condiciones": {
    "montoMinimo": 50000,
    "categorias": ["textiles", "ceramica"],
    "maximoUsos": 1
  }
}
```

### Verificar Validez de Cupón
```http
POST /coupons/validar
Authorization: Bearer <token>
Content-Type: application/json

{
  "codigo": "BIENVENIDA_USER123",
  "usuarioId": "65f9d8c2e852a1234567890",
  "montoCarrito": 75000,
  "productos": [
    {
      "id": "65f9d8c2e852a1234567891",
      "categoria": "textiles",
      "precio": 75000
    }
  ]
}
```

#### Respuesta de Validación
```json
{
  "success": true,
  "cupon": {
    "codigo": "BIENVENIDA_USER123",
    "descuento": 20,
    "descuentoCalculado": 15000,
    "montoFinal": 60000,
    "validez": {
      "esValido": true,
      "mensaje": "Cupón aplicable",
      "restricciones": {
        "montoMinimoCumplido": true,
        "categoriasPermitidas": true,
        "usosPendientes": true
      }
    }
  }
}
```