import { fakerES as faker } from "@faker-js/faker";
import connection from "./db/connection.js";

const TOTAL = 5000;                // número de detalles
const BATCH_SIZE = 500;            // tamaño de batch
const MAX_PO_ID = 2000;            // según purchase orders insertadas
const MAX_INGREDIENTE_ID = 500;   // según ingredientes insertados

async function insertDetallePO() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
      const poId = faker.number.int({ min: 1, max: MAX_PO_ID });
      const ingredienteId = faker.number.int({ min: 1, max: MAX_INGREDIENTE_ID });
      const precio = faker.number.int({ min: 100, max: 2000 });
      const cantidad = faker.number.int({ min: 1, max: 20 });
      values.push([poId, ingredienteId, precio, cantidad]);
    }

    await connection.query(
      `INSERT INTO detalle_purchase_order (id_po_fk, id_ingrediente_fk, precio, cantidad) VALUES ?`,
      [values]
    );

    console.log(`Insertados ${i + values.length} detalles de purchase order`);
  }

  await connection.end();
  console.log("Inserción de detalle purchase orders finalizada");
}

insertDetallePO().catch(err => console.error(err));
export default insertDetallePO;