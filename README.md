# PuntoGym

Autoservicio de productos y equipamiento para gimnasio.

**Trabajo Práctico Integrador - Programación III - UTN FRA**

**Alumnos:** Enzo Gómez y Lucas Isaac Sparta

## Sobre PuntoGym

PuntoGym es una aplicación que desarrollamos para simular un autoservicio de productos relacionados con el entrenamiento y el gimnasio.

La idea es que un cliente pueda ingresar su nombre, recorrer el catálogo, elegir productos de las categorías **Equipamiento** y **Accesorios**, agregarlos al carrito y finalmente confirmar su compra.

Una vez realizada la compra, la venta queda registrada y se genera un ticket con los productos comprados, sus cantidades, precios y el total. El ticket también puede descargarse en formato PDF.

Además, PuntoGym cuenta con un panel de administración desde donde se pueden agregar y modificar productos, cambiar sus imágenes y activarlos o desactivarlos.

Las compras forman parte de la simulación del autoservicio. La aplicación no procesa pagos reales.

---

## Cómo iniciar el proyecto

Para ejecutar PuntoGym es necesario tener instalados **Node.js** y **npm**.

1. Descargar el proyecto o clonar el repositorio.

2. Abrir una terminal en la carpeta del proyecto.

3. Ingresar a la carpeta del backend:

```bash
cd backend
```

4. Instalar las dependencias:

```bash
npm install
```

5. Iniciar el servidor:

```bash
node app.js
```

6. Con el servidor iniciado, abrir en el navegador:

```text
http://localhost:3000/
```

La terminal debe permanecer abierta mientras se utiliza la aplicación.

Las páginas del frontend son servidas por Express, por lo que no es necesario utilizar Live Server ni abrir los archivos HTML directamente.

---

# Uso de la aplicación

## Bienvenida

**Dirección:**

```text
http://localhost:3000/
```

Es la primera pantalla de PuntoGym.

El cliente debe ingresar su nombre para comenzar una compra. Este nombre se guarda temporalmente y después se utiliza durante el proceso de compra y en el ticket.

Desde esta pantalla también se puede acceder al panel de administración y cambiar entre el tema claro y oscuro.

---

## Productos

**Dirección:**

```text
http://localhost:3000/productos.html
```

En esta pantalla se muestran los productos activos disponibles en PuntoGym.

Los productos están divididos en dos categorías:

- Equipamiento
- Accesorios

Se puede mostrar el catálogo completo o filtrar los productos según su categoría.

Cada producto muestra su imagen, nombre, categoría y precio. Desde la misma tarjeta se puede agregar el producto al carrito o quitar unidades que ya hayan sido agregadas.

El catálogo cuenta con paginación para recorrer los productos disponibles.

El carrito se mantiene mientras el cliente navega por las diferentes pantallas de la aplicación.

---

## Carrito

**Dirección:**

```text
http://localhost:3000/carrito.html
```

El carrito muestra los productos seleccionados por el cliente.

Para cada producto se puede consultar:

- Imagen
- Nombre
- Precio
- Cantidad
- Subtotal

Desde esta pantalla se pueden aumentar o disminuir las cantidades y también eliminar productos.

En la parte inferior se calcula el total de la compra.

Al seleccionar **Finalizar compra**, se muestra una confirmación antes de registrar definitivamente la venta.

Si el cliente confirma, la compra se registra en la base de datos y se abre el ticket correspondiente.

---

## Ticket

**Dirección:**

```text
http://localhost:3000/ticket.html
```

Después de confirmar una compra se muestra el ticket generado.

El ticket contiene los datos principales de la operación, entre ellos:

- Cliente
- Fecha
- Productos comprados
- Cantidades
- Precios
- Subtotales
- Total de la compra

Desde esta pantalla también se puede descargar el comprobante en formato **PDF**.

Al seleccionar **Salir**, se eliminan los datos temporales del cliente, el carrito y la compra actual, y PuntoGym vuelve a la pantalla de bienvenida para permitir comenzar una nueva operación.

La venta realizada permanece registrada en la base de datos.

---

# Administración

## Inicio de sesión

Se puede ingresar desde el botón de administración disponible en la tienda o directamente desde:

```text
http://localhost:3000/admin/login
```

Para probar el panel se incluye una cuenta de administrador:

```text
Correo: admin@puntogym.com
Contraseña: 123456
```

La pantalla también cuenta con un botón de acceso rápido que completa estas credenciales automáticamente.

Las contraseñas de los administradores se almacenan cifradas utilizando **bcrypt**.

---

## Panel de administración

**Dirección:**

```text
http://localhost:3000/admin
```

El panel permite administrar los productos de PuntoGym.

Los productos se muestran separados según las categorías **Equipamiento** y **Accesorios**.

Desde el panel se puede:

- Consultar los productos existentes.
- Agregar productos.
- Editar productos.
- Cambiar sus imágenes.
- Desactivar productos.
- Reactivar productos.

Antes de cambiar el estado de un producto se muestra una confirmación.

Cuando un producto se desactiva, permanece guardado en la base de datos pero deja de mostrarse en el catálogo del cliente. Si se vuelve a activar, vuelve a estar disponible en la tienda.

El panel también cuenta con un acceso para regresar directamente a la tienda.

---

## Agregar productos

Desde la opción **Agregar producto** se pueden cargar nuevos productos al sistema.

Para cada producto se registra:

- Nombre
- Categoría
- Precio
- Imagen

Las categorías disponibles son **Equipamiento** y **Accesorios**.

Las imágenes cargadas se almacenan en el servidor y posteriormente son utilizadas tanto por el catálogo como por el panel de administración.

---

## Editar productos

Desde el botón **Editar** de cada producto se puede modificar su información.

Es posible cambiar el nombre, categoría, precio e imagen.

Si durante una modificación no se selecciona una imagen nueva, se mantiene la imagen que ya tenía el producto.

---

# Datos incluidos

El proyecto incluye una base de datos **SQLite** preparada con productos de Equipamiento y Accesorios para poder probar el funcionamiento de PuntoGym desde el primer inicio.

También se incluyen las imágenes utilizadas por esos productos y una cuenta de administrador de prueba.

No es necesario instalar un servidor de base de datos adicional.

Los productos, administradores y ventas se almacenan en:

```text
backend/puntogym.sqlite
```

Las imágenes cargadas para los productos se almacenan dentro del backend.

Los cambios realizados sobre los productos y las ventas permanecen guardados aunque el servidor sea detenido.

---

# Tema y diseño responsive

PuntoGym cuenta con un **tema claro y un tema oscuro**.

La opción seleccionada se conserva mientras el usuario navega por las diferentes pantallas.

La interfaz fue desarrollada para adaptarse a diferentes tamaños de pantalla, incluyendo computadoras, tablets y celulares.

Todas las pantallas cuentan con la identidad visual de PuntoGym, el nombre de la aplicación, los integrantes del trabajo y los accesos de navegación correspondientes.

---

# Organización del proyecto

El trabajo está dividido principalmente en dos partes:

### frontend

Contiene las pantallas utilizadas por el cliente, los estilos, imágenes y archivos JavaScript encargados del funcionamiento de la tienda.

### backend

Contiene el servidor, modelos, controladores, rutas, middlewares, vistas administrativas y conexión con la base de datos.

La organización principal es:

```text
frontend/
    css/
    img/
    js/
    index.html
    productos.html
    carrito.html
    ticket.html

backend/
    controllers/
    middlewares/
    models/
    public/
    routes/
    uploads/
    views/
    app.js
    puntogym.sqlite
```

---

# Tecnologías utilizadas

Para las pantallas del cliente utilizamos **HTML, CSS y JavaScript**.

El servidor fue desarrollado con **Node.js y Express**.

El panel administrativo utiliza **EJS** para generar sus vistas.

Para el manejo de los datos utilizamos **Sequelize** como ORM y **SQLite** como base de datos.

También utilizamos:

- **Multer** para la carga de imágenes.
- **bcrypt** para cifrar las contraseñas de los administradores.
- **PDFKit** para generar los tickets de compra en PDF.

---

## Integrantes

**Enzo Gómez**  
**Lucas Isaac Sparta**

Programación III - UTN FRA