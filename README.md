# PuntoGym

Trabajo Práctico Integrador de **Programación III**.

PuntoGym es una aplicación de autoservicio orientada a la venta de productos para entrenamiento y gimnasio.

La aplicación cuenta con un frontend para clientes y un panel de administración para la gestión de productos.

## Integrantes

- Enzo Gómez
- Lucas Isaac Sparta

## Tecnologías utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express
- EJS
- Sequelize
- SQLite
- Multer
- bcrypt
- PDFKit

## Funcionalidades

### Cliente

- Ingreso del nombre del cliente.
- Visualización de productos activos.
- Filtrado por categorías:
  - Equipamiento
  - Accesorios
- Paginación de productos.
- Agregar y quitar productos del carrito.
- Modificar cantidades desde el carrito.
- Confirmación de compra mediante modal.
- Registro de la venta.
- Generación del ticket de compra.
- Descarga del ticket en PDF.
- Tema claro y oscuro.
- Diseño responsive.

### Administración

- Inicio de sesión de administrador.
- Contraseña almacenada de forma cifrada.
- Visualización de productos separados por categoría.
- Alta de productos.
- Carga de imágenes.
- Modificación de productos.
- Modificación de imágenes.
- Desactivación de productos.
- Reactivación de productos.
- Confirmación mediante modal.
- Acceso desde el panel administrativo hacia la tienda.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/EnzoGomez03/2026---Segundo-Cuatrimestre---TP-Integrador.git
```

### 2. Ingresar al backend

```bash
cd 2026---Segundo-Cuatrimestre---TP-Integrador/backend
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar la aplicación

```bash
node app.js
```

### 5. Abrir PuntoGym

Ingresar desde el navegador a:

```text
http://localhost:3000
```

## Acceso de administrador

Desde la pantalla principal se puede ingresar al apartado de administración mediante el botón **Administración**.

También se puede acceder directamente desde:

```text
http://localhost:3000/admin/login
```

Usuario de prueba:

```text
Correo: admin@puntogym.com
Contraseña: 123456
```

El formulario de inicio de sesión también cuenta con un acceso rápido para completar estas credenciales.

## Base de datos

El proyecto utiliza **SQLite** mediante Sequelize.

La base de datos incluida en el proyecto contiene productos de prueba de las categorías Equipamiento y Accesorios para permitir probar las funcionalidades y la paginación de la aplicación.

Las imágenes asociadas a los productos se encuentran almacenadas en el servidor.

## Estructura general

```text
2026---Segundo-Cuatrimestre---TP-Integrador/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── public/
│   ├── routes/
│   ├── uploads/
│   ├── views/
│   ├── app.js
│   └── puntogym.sqlite
│
├── frontend/
│   ├── css/
│   ├── img/
│   ├── js/
│   ├── index.html
│   ├── productos.html
│   ├── carrito.html
│   └── ticket.html
│
└── README.md
```

## Flujo de compra

El flujo principal de PuntoGym es:

```text
Bienvenida
    ↓
Productos
    ↓
Carrito
    ↓
Confirmación de compra
    ↓
Ticket
    ↓
Descarga PDF / Salir
```

Al finalizar la compra y salir, los datos temporales del cliente se eliminan para permitir comenzar una nueva operación en el autoservicio.