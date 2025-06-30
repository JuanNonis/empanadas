-- Estructura de base de datos para Casa de Empanadas

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(30),
    direccion VARCHAR(255),
    rol VARCHAR(20) NOT NULL DEFAULT 'usuario',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'empanada' o 'pizza'
    imagen_url TEXT
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'en_camino',
    hora_entrega TIMESTAMP
);

CREATE TABLE detalle_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL
);

CREATE TABLE ingredientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    stock_actual NUMERIC(10,2) DEFAULT 0,
    unidad VARCHAR(20) NOT NULL
);

CREATE TABLE pedidos_ingredientes (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES usuarios(id),
    ingrediente_id INTEGER REFERENCES ingredientes(id),
    cantidad NUMERIC(10,2) NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente'
); 