import { fakerES as faker } from "@faker-js/faker";
import connection from "./db/connection.js"; 

const TOTAL = 2_000_000;
const BATCH_SIZE = 10_000;

async function insertClientes() {
  console.log(` Insertando ${TOTAL} clientes en tantos de ${BATCH_SIZE}...`);

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      const nombre = faker.person.firstName();
      const apellido1 = faker.person.lastName();
      const apellido2 = faker.person.lastName();
      const telefono = faker.string.numeric(8);
      const email = faker.internet.email({ firstName: nombre, lastName: apellido1 });
      const distritoId = faker.number.int({ min: 1, max:5 }); 

      values.push([nombre, apellido1, apellido2, telefono, email, distritoId]);
    }

    await connection.query(
      `INSERT INTO cliente (nombre, primer_apellido, segundo_apellido, telefono, email, id_distrito_fk) VALUES ?`,
      [values]
    );

    console.log(` Insertados ${i + BATCH_SIZE} registros`);
  }

  await connection.end();
  console.log(" Inserción finalizada");
}

insertClientes().catch((err) => {
  console.error(" Error:", err);
  process.exit(1);
});
