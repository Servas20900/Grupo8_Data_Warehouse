import { fakerES as faker } from "@faker-js/faker";
import connection from "../db/connection.js";

const TOTAL = 200; // distritos
const MAX_CANTON_ID = 50; // según cantones insertados

async function insertDistritos() {
  const values = [];
  for (let i = 0; i < TOTAL; i++) {
    const cantonId = faker.number.int({ min: 1, max: MAX_CANTON_ID });
    values.push([faker.location.county(), cantonId]);
  }

  await connection.query(
    `INSERT INTO distritos (nombre_distrito, id_canton_fk) VALUES ?`,
    [values]
  );

  console.log(`Insertados ${TOTAL} distritos`);
  await connection.end();
}

insertDistritos().catch(err => console.error(err));

export default insertDistritos;