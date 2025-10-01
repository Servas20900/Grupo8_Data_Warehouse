import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 10000;
const MAX_DISTRITO_ID = 500; 
const BATCH_SIZE = 1000;

async function insertVendors() {
  console.log(`Iniciando inserción de ${TOTAL} vendors en batches de ${BATCH_SIZE}...`);
  
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    const currentBatchSize = Math.min(BATCH_SIZE, TOTAL - i);
    
    for (let j = 0; j < currentBatchSize; j++) {
      const nombre = faker.company.name();
      const telefono = faker.string.numeric(8);
      const email = faker.internet.email({ firstName: nombre });
      const distritoId = faker.number.int({ min: 1, max: MAX_DISTRITO_ID });
      values.push([nombre, telefono, email, distritoId]);
    }

    await connection.query(
      `INSERT INTO vendor (nombre_proveedor, telefono, email, id_distrito_fk) VALUES ?`,
      [values]
    );

    const completed = i + currentBatchSize;
    const percentage = ((completed / TOTAL) * 100).toFixed(2);
    console.log(`Insertados ${completed} vendors (${percentage}%)`);
  }

  console.log("Inserción de vendors finalizada");
}

export default insertVendors;