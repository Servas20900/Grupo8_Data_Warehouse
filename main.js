import insertProvincias from './modules/Ubicacion/insert_Provincias.js';
import insertCantones from './modules/Ubicacion/insert_Cantones.js';
import insertDistritos from './modules/Ubicacion/insert_Distritos.js';
import insertPuestos from './modules/Puestos_y_Empleados/insert_Puestos.js';
import insertEmpleados from './modules/Puestos_y_Empleados/insert_Empleados.js';
import insertClientes from './modules/Clientes_y_Proveedores/insert_clientes.js';
import insertVendors from './modules/Clientes_y_Proveedores/insert_Vendors.js';
import insertMenu from './modules/Menú_y_Ingredientes/insert_Menu.js';
import insertIngredientes from './modules/Menú_y_Ingredientes/insert_StoreIngredientes.js';
import insertFacturas from './modules/Facturas_y_detalles/insert_Facturas.js';
import insertDetalleFactura from './modules/Facturas_y_detalles/insert_DetalleFactura.js';
import insertPurchaseOrders from './modules/Purchase_orders_y_detalles/insert_PurchaseOrders.js';
import insertDetallePO from './modules/Purchase_orders_y_detalles/insert_DetallePO.js';
import insertIngredienteMenu from './modules/Ingrediente-Menú/insert_IngredienteMenu.js';
import connection from './db/connection.js';

async function main() {
  try {
    console.log("Iniciando inserción de datos para Restaurante_Grupo8 ... ");

    // 1. Ubicación
    await insertProvincias();
    await insertCantones();
    await insertDistritos();

    // 2. Puestos y Empleados
    await insertPuestos();
    await insertEmpleados();

    // 3. Clientes y Proveedores
    await insertClientes();
    await insertVendors();

    // 4. Menú e Ingredientes
    await insertMenu();
    await insertIngredientes();

    // 5. Facturas y detalles
    await insertFacturas();
    await insertDetalleFactura();

    // 6. Purchase orders y detalles
    await insertPurchaseOrders();
    await insertDetallePO();

    // 7. Ingrediente - Menú
    await insertIngredienteMenu();

    console.log("Inserción completa finalizada ");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await connection.end();  
  }
}

main();