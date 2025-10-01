import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 2000000;         
const BATCH_SIZE = 1000;        
const MAX_VENDOR_ID = 10000;    
const MAX_EMPLEADO_ID = 2000;   

async function insertPurchaseOrders() {
  console.log(`Iniciando inserción de ${TOTAL} purchase orders en batches de ${BATCH_SIZE}...`);
  
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    const currentBatchSize = Math.min(BATCH_SIZE, TOTAL - i);
    
    for (let j = 0; j < currentBatchSize; j++) {
      const vendorId = faker.number.int({ min: 1, max: MAX_VENDOR_ID });
      const empleadoId = faker.number.int({ min: 1, max: MAX_EMPLEADO_ID });
      const fecha = faker.date.recent({ days: 365 }); 
      const estado = faker.helpers.arrayElement(['Recibido', 'Pendiente', 'Cancelado']);
      values.push([vendorId, empleadoId, fecha, estado]);
    }

    await connection.query(
      `INSERT INTO purchase_order (id_vendor_fk, id_empleado_fk, fecha, estado) VALUES ?`,
      [values]
    );

    const completed = i + currentBatchSize;
    const percentage = ((completed / TOTAL) * 100).toFixed(2);
    console.log(`Insertadas ${completed} órdenes de compra (${percentage}%)`);
  }

  console.log("Inserción de purchase orders finalizada");
}

export default insertPurchaseOrders;