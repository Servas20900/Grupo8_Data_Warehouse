CREATE DATABASE Restaurante_Grupo8;

USE Restaurante_Grupo8;

-- TABLAS DE UBICACIÓN

CREATE TABLE provincias (
    id_provincia BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_provincia VARCHAR(100) NOT NULL
);

CREATE TABLE cantones (
    id_canton BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_canton VARCHAR(100) NOT NULL,
    id_provincia_fk BIGINT NOT NULL,
    FOREIGN KEY (id_provincia_fk) REFERENCES provincias(id_provincia)
);

CREATE TABLE distritos (
    id_distrito BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_distrito VARCHAR(100) NOT NULL,
    id_canton_fk BIGINT NOT NULL,
    FOREIGN KEY (id_canton_fk) REFERENCES cantones(id_canton)
);

 
-- TABLAS DE PUESTOS Y EMPLEADOS
 

CREATE TABLE puesto (
    id_puesto BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_puesto VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE empleado (
    id_empleado BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    id_puesto_fk BIGINT NOT NULL,
    salario DECIMAL(10,2),
    telefono VARCHAR(8),
    email VARCHAR(100),
    FOREIGN KEY (id_puesto_fk) REFERENCES puesto(id_puesto)
);

-- TABLAS DE MENÚ, INGREDIENTES

CREATE TABLE menu (
    id_platillo BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_platillo VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2),
    descripcion VARCHAR(255)
);

CREATE TABLE store_ingrediente (
    id_ingrediente BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_ingrediente VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL
);

-- CLIENTES Y PROVEEDORES
CREATE TABLE cliente (
    id_cliente BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    primer_apellido VARCHAR(50),
    segundo_apellido VARCHAR(50),
    telefono VARCHAR(8),
    email VARCHAR(100),
    id_distrito_fk BIGINT,
    FOREIGN KEY (id_distrito_fk) REFERENCES distritos(id_distrito)
);

CREATE TABLE vendor (
    id_vendor BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_proveedor VARCHAR(50) NOT NULL,
    telefono VARCHAR(8),
    email VARCHAR(100),
    id_distrito_fk BIGINT,
    FOREIGN KEY (id_distrito_fk) REFERENCES distritos(id_distrito)
);

-- FACTURAS Y DETALLES


CREATE TABLE factura (
    id_factura BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_cliente_fk BIGINT NOT NULL,
    id_empleado_fk BIGINT NOT NULL,
    fecha DATETIME,
    estado VARCHAR(10),
    FOREIGN KEY (id_cliente_fk) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_empleado_fk) REFERENCES empleado(id_empleado)
);

CREATE TABLE detalle_factura (
    id_detalle_factura BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_factura_fk BIGINT NOT NULL,
    id_platillo_fk BIGINT NOT NULL,
    precio DECIMAL(10,2),
    cantidad INT,
    FOREIGN KEY (id_factura_fk) REFERENCES factura(id_factura),
    FOREIGN KEY (id_platillo_fk) REFERENCES menu(id_platillo)
);


-- PURCHASE ORDER Y DETALLE

CREATE TABLE purchase_order (
    id_po BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_vendor_fk BIGINT NOT NULL,
    id_empleado_fk BIGINT NOT NULL,
    fecha DATETIME,
    estado VARCHAR(10),
    FOREIGN KEY (id_vendor_fk) REFERENCES vendor(id_vendor),
    FOREIGN KEY (id_empleado_fk) REFERENCES empleado(id_empleado)
);

CREATE TABLE detalle_purchase_order (
    id_detalle_po BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_po_fk BIGINT NOT NULL,
    id_ingrediente_fk BIGINT NOT NULL,
    precio DECIMAL(10,2),
    cantidad INT,
    FOREIGN KEY (id_po_fk) REFERENCES purchase_order(id_po),
    FOREIGN KEY (id_ingrediente_fk) REFERENCES store_ingrediente(id_ingrediente)
);


-- RELACIÓN MENÚ - INGREDIENTES


CREATE TABLE ingrediente_menu (
    id_platillo_fk BIGINT NOT NULL,
    id_ingrediente_fk BIGINT NOT NULL,
    cantidad_utilizada INT,
    FOREIGN KEY (id_platillo_fk) REFERENCES menu(id_platillo),
    FOREIGN KEY (id_ingrediente_fk) REFERENCES store_ingrediente(id_ingrediente),
    PRIMARY KEY (id_platillo_fk, id_ingrediente_fk) 
);


USE Restaurante_Grupo8;

-- 1. PROVINCIAS
INSERT INTO provincias (nombre_provincia) VALUES
('San José'),
('Alajuela'),
('Cartago');

-- 2. CANTONES
INSERT INTO cantones (nombre_canton, id_provincia_fk) VALUES
('Central', 1),
('Desamparados', 1),
('Central', 2),
('Alajuela', 2),
('Central', 3);

-- 3. DISTRITOS
INSERT INTO distritos (nombre_distrito, id_canton_fk) VALUES
('Carmen', 1),
('Merced', 1),
('San Rafael', 2),
('Alajuela Centro', 3),
('San José', 4),
('Oriental', 5);

-- 4. PUESTOS
INSERT INTO puesto (nombre_puesto, descripcion) VALUES
('Gerente', 'Encargado de la administración general'),
('Cocinero', 'Preparación de alimentos'),
('Mesero', 'Atención a clientes'),
('Bodeguero', 'Manejo de inventario');

-- 5. EMPLEADOS
INSERT INTO empleado (nombre, primer_apellido, segundo_apellido, id_puesto_fk, salario, telefono, email) VALUES
('Juan', 'Pérez', 'Gómez', 1, 1200000.00, '88881234', 'juan.perez@restaurante.com'),
('María', 'Rodríguez', 'López', 2, 800000.00, '88882345', 'maria.rodriguez@restaurante.com'),
('Carlos', 'Soto', 'Jiménez', 3, 500000.00, '88883456', 'carlos.soto@restaurante.com'),
('Ana', 'Morales', 'Vargas', 4, 600000.00, '88884567', 'ana.morales@restaurante.com');

-- 6. MENÚ
INSERT INTO menu (nombre_platillo, precio, descripcion) VALUES
('Casado de Pollo', 3500.00, 'Plato típico costarricense con pollo, arroz, frijoles y ensalada'),
('Sopa de Mariscos', 4500.00, 'Deliciosa sopa con mariscos frescos'),
('Ensalada Mixta', 2500.00, 'Mezcla de verduras frescas con aderezo');

-- 7. INGREDIENTES
INSERT INTO store_ingrediente (nombre_ingrediente, cantidad) VALUES
('Pollo', 50),
('Arroz', 100),
('Frijoles', 80),
('Lechuga', 40),
('Tomate', 50),
('Mariscos', 30);

-- 8. CLIENTES
INSERT INTO cliente (nombre, primer_apellido, segundo_apellido, telefono, email, id_distrito_fk) VALUES
('Luis', 'Fernández', 'Hernández', '88885678', 'luis.fernandez@gmail.com', 1),
('Sofía', 'González', 'Ramírez', '88886789', 'sofia.gonzalez@gmail.com', 2);

-- 9. PROVEEDORES
INSERT INTO vendor (nombre_proveedor, telefono, email, id_distrito_fk) VALUES
('Distribuidora Pollo Fresco', '22221234', 'contacto@pollofresco.com', 4),
('Mariscos del Pacífico', '22222345', 'ventas@mariscos.com', 6);

-- 10. FACTURAS
INSERT INTO factura (id_cliente_fk, id_empleado_fk, fecha, estado) VALUES
(1, 3, '2025-09-24 12:30:00', 'Pagada'),
(2, 3, '2025-09-24 13:00:00', 'Pendiente');

-- 11. DETALLE FACTURA
INSERT INTO factura (id_cliente_fk, id_empleado_fk, fecha, estado) VALUES
(1, 3, '2025-09-24 12:30:00', 'Pagada'),
(2, 3, '2025-09-24 13:00:00', 'Pendiente');

-- 12. PURCHASE ORDER
INSERT INTO purchase_order (id_vendor_fk, id_empleado_fk, fecha, estado) VALUES
(1, 4, '2025-09-23 09:00:00', 'Recibido'),
(2, 4, '2025-09-23 10:00:00', 'Pendiente');

-- 13. DETALLE PURCHASE ORDER
INSERT INTO detalle_purchase_order (id_po_fk, id_ingrediente_fk, precio, cantidad) VALUES
(1, 1, 500.00, 20),
(1, 2, 300.00, 50),
(2, 6, 1500.00, 10);

-- 14. INGREDIENTE-MENÚ
INSERT INTO ingrediente_menu (id_platillo_fk, id_ingrediente_fk, cantidad_utilizada) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(1, 4, 1),
(1, 5, 1),
(2, 6, 1),
(3, 4, 1),
(3, 5, 1);
