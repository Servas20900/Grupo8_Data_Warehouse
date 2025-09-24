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
