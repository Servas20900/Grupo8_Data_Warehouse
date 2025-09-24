import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 50; // cantones
const MAX_PROVINCIA_ID = 10; // según provincias insertadas

async function insertCantones() {
  const values = [];
  for (let i = 0; i < TOTAL; i++) {
    const provinciaId = faker.number.int({ min: 1, max: MAX_PROVINCIA_ID });
    values.push([faker.location.city(), provinciaId]);
  }

  await connection.query(
    `INSERT INTO cantones (nombre_canton, id_provincia_fk) VALUES ?`,
    [values]
  );

  console.log(`Insertados ${TOTAL} cantones`);
  await connection.end();
}

insertCantones().catch(err => console.error(err));

export default insertCantones;