import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 500; 
const MAX_PUESTO_ID = 4;

async function insertEmpleados() {
  const values = [];
  for (let i = 0; i < TOTAL; i++) {
    const nombre = faker.person.firstName();
    const apellido1 = faker.person.lastName();
    const apellido2 = faker.person.lastName();
    const puestoId = faker.number.int({ min: 1, max: MAX_PUESTO_ID });
    const salario = faker.number.int({ min: 500000, max: 1500000 });
    const telefono = faker.string.numeric(8);
    const email = faker.internet.email({ firstName: nombre, lastName: apellido1 });
    values.push([nombre, apellido1, apellido2, puestoId, salario, telefono, email]);
  }

  await connection.query(
    `INSERT INTO empleado (nombre, primer_apellido, segundo_apellido, id_puesto_fk, salario, telefono, email) VALUES ?`,
    [values]
  );

  console.log(`Insertados ${TOTAL} empleados`);
}

export default insertEmpleados;