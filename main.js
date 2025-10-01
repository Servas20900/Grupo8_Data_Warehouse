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
    console.log("Iniciando inserción de datos MASIVOS para Restaurante_Grupo8 ... ");
    console.log("ATENCIÓN: Este proceso insertará millones de registros y puede tomar varios minutos/horas");
    
    console.log("=== Insertando datos de ubicación ===");
    await insertProvincias();
    await insertCantones();
    await insertDistritos();
    
    console.log("=== Insertando puestos de trabajo ===");
    await insertPuestos();

    console.log("=== Insertando empleados  ===");
    await insertEmpleados();
    
    console.log("=== Insertando clientes y proveedores ===");
    await insertClientes();
    await insertVendors(); 
    
    console.log("=== Insertando menú e ingredientes ===");
    await insertMenu();
    await insertIngredientes(); 
    
    console.log("=== Relacionando ingredientes con menú ===");
    await insertIngredienteMenu();
    
    console.log("=== Insertando órdenes de compra (2M registros) ===");
    await insertPurchaseOrders();
    await insertDetallePO(); 
    
    console.log("=== Insertando facturas ===");
    await insertFacturas();
    await insertDetalleFactura();

    console.log(" Inserción completa finalizada - Millones de registros insertados exitosamente");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await connection.end();  
  }
}

main();