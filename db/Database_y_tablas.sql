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
