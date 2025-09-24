import { fakerES as faker } from "@faker-js/faker";
import connection from "./db/connection.js";

const TOTAL = 2000;           // número de órdenes de compra
const BATCH_SIZE = 200;       // tamaño de cada batch
const MAX_VENDOR_ID = 500;    // según vendors insertados
const MAX_EMPLEADO_ID = 1000; // según empleados insertados

async function insertPurchaseOrders() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
      const vendorId = faker.number.int({ min: 1, max: MAX_VENDOR_ID });
      const empleadoId = faker.number.int({ min: 1, max: MAX_EMPLEADO_ID });
      const fecha = faker.date.recent({ days: 30 });
      const estado = faker.helpers.arrayElement(['Recibido', 'Pendiente', 'Cancelado']);
      values.push([vendorId, empleadoId, fecha, estado]);
    }

    await connection.query(
      `INSERT INTO purchase_order (id_vendor_fk, id_empleado_fk, fecha, estado) VALUES ?`,
      [values]
    );

    console.log(`Insertadas ${i + values.length} órdenes de compra`);
  }

  await connection.end();
  console.log("Inserción de purchase orders finalizada");
}

insertPurchaseOrders().catch(err => console.error(err));

export default insertPurchaseOrders;