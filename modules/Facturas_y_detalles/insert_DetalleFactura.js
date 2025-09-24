import { fakerES as faker } from "@faker-js/faker";
import connection from "./db/connection.js";

const TOTAL = 5000;
const BATCH_SIZE = 500;
const MAX_FACTURA_ID = 2000;
const MAX_PLATILLO_ID = 1000;

async function insertDetalleFactura() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
      const facturaId = faker.number.int({ min: 1, max: MAX_FACTURA_ID });
      const platilloId = faker.number.int({ min: 1, max: MAX_PLATILLO_ID });
      const precio = faker.number.int({ min: 1500, max: 6000 });
      const cantidad = faker.number.int({ min: 1, max: 5 });
      values.push([facturaId, platilloId, precio, cantidad]);
    }

    await connection.query(
      `INSERT INTO detalle_factura (id_factura_fk, id_platillo_fk, precio, cantidad) VALUES ?`,
      [values]
    );

    console.log(`Insertados ${i + values.length} detalles de factura`);
  }

  await connection.end();
  console.log("Inserción de detalles de factura finalizada");
}

insertDetalleFactura().catch(err => console.error(err));

export default insertDetalleFactura;