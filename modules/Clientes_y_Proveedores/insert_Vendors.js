import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 500;
const MAX_DISTRITO_ID = 500; 
const BATCH_SIZE = 500;

async function insertVendors() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
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

    console.log(`Insertados ${i + values.length} vendors`);
  }

  console.log("Inserción de vendors finalizada");
}

export default insertVendors;