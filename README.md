# Delivery Empanadas

Proyecto base para Node.js.

## Cómo iniciar

1. Instala las dependencias (si las hubiera):
   ```bash
   npm install
   ```
2. Ejecuta la aplicación:
   ```bash
   node index.js
   ```

## Instalación de dependencias

Este proyecto utiliza [Express](https://expressjs.com/) para crear la API.

Instala las dependencias ejecutando:

```bash
npm install express
```

## Ejecutar el servidor

```bash
node index.js
```

El servidor estará disponible en `http://localhost:3000` por defecto.

## Endpoints disponibles

- `GET /` - Página principal (carrusel, logo, info random)
- `GET /menu` - Menú de empanadas y pizzas

### Sección usuario
- `POST /login` - Login de usuario
- `PUT /usuario` - Modificar datos de usuario
- `POST /pedido` - Hacer un pedido
- `GET /pedido/:id` - Revisar estado del pedido

### Sección administrador
- `PUT /admin/menu` - Modificar el menú
- `POST /admin/ingredientes` - Cargar pedidos de ingredientes

## Estructura de carpetas

- `index.js` - Punto de entrada
- `routes/` - Rutas de la API
- `controllers/` - Lógica de los endpoints
- `db/` - Conexión a la base de datos PostgreSQL

## Configuración de PostgreSQL

Por defecto, la conexión usa:
- user: postgres
- password: postgres
- host: localhost
- database: empanadas
- port: 5432

Puedes cambiar estos valores usando variables de entorno: `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGDATABASE`, `PGPORT`. 