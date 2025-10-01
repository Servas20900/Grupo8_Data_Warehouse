import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 2000000;                
const BATCH_SIZE = 1000;           
const MAX_PO_ID = 2000000;         
const MAX_INGREDIENTE_ID = 2000;  

async function insertDetallePO() {
  console.log(`Iniciando inserción de ${TOTAL} detalles de purchase order en batches de ${BATCH_SIZE}...`);
  
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    const combinaciones = new Set(); 
    const currentBatchSize = Math.min(BATCH_SIZE, TOTAL - i);

    for (let j = 0; j < currentBatchSize; j++) {
      let poId, ingredienteId, key;

      do {
        poId = faker.number.int({ min: 1, max: MAX_PO_ID });
        ingredienteId = faker.number.int({ min: 1, max: MAX_INGREDIENTE_ID });
        key = `${poId}-${ingredienteId}`;
      } while (combinaciones.has(key));

      combinaciones.add(key);

      const precio = faker.number.int({ min: 100, max: 2000 });
      const cantidad = faker.number.int({ min: 1, max: 20 });
      values.push([poId, ingredienteId, precio, cantidad]);
    }

    await connection.query(
      `INSERT INTO detalle_purchase_order (id_po_fk, id_ingrediente_fk, precio, cantidad) VALUES ?`,
      [values]
    );

    const completed = i + currentBatchSize;
    const percentage = ((completed / TOTAL) * 100).toFixed(2);
    console.log(`Insertados ${completed} detalles de purchase order (${percentage}%)`);
  }

  console.log("Inserción de detalle purchase orders finalizada");
}

export default insertDetallePO;
