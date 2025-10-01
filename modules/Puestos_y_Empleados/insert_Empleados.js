import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 2000; 
const MAX_PUESTO_ID = 4;

async function insertEmpleados() {
  console.log(`Insertando ${TOTAL} empleados en batches...`);
  const BATCH_SIZE = 1000;
  
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    const currentBatchSize = Math.min(BATCH_SIZE, TOTAL - i);
    
    for (let j = 0; j < currentBatchSize; j++) {
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

    const completed = i + currentBatchSize;
    const percentage = ((completed / TOTAL) * 100).toFixed(2);
    console.log(`Insertados ${completed} empleados (${percentage}%)`);
  }

  console.log("Insertados empleados");
}

export default insertEmpleados;