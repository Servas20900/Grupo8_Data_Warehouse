import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 500; 

async function insertProvincias() {
  const values = [];
  for (let i = 0; i < TOTAL; i++) {
    values.push([faker.location.state()]);
  }

  await connection.query(
    `INSERT INTO provincias (nombre_provincia) VALUES ?`,
    [values]
  );

  console.log(`Insertadas ${TOTAL} provincias`);
}

export default insertProvincias;