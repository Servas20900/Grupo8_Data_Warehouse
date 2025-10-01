import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 500;
const BATCH_SIZE = 500;
const MAX_CLIENTE_ID = 500; 
const MAX_EMPLEADO_ID = 500;

async function insertFacturas() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
      const clienteId = faker.number.int({ min: 1, max: MAX_CLIENTE_ID });
      const empleadoId = faker.number.int({ min: 1, max: MAX_EMPLEADO_ID });
      const fecha = faker.date.recent({ days: 30 });
      const estado = faker.helpers.arrayElement(['Pagada', 'Pendiente', 'Cancelada']);
      values.push([clienteId, empleadoId, fecha, estado]);
    }

    await connection.query(
      `INSERT INTO factura (id_cliente_fk, id_empleado_fk, fecha, estado) VALUES ?`,
      [values]
    );

    console.log(`Insertadas ${i + values.length} facturas`);
  }

  console.log("Inserción de facturas finalizada");
}

export default insertFacturas;