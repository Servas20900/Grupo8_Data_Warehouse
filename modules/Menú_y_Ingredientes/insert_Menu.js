import { fakerES as faker } from "@faker-js/faker";
import connection from "./db/connection.js";

const TOTAL = 1000;
const BATCH_SIZE = 100;

async function insertMenu() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
      const nombre = faker.food.dish();
      const precio = faker.number.int({ min: 1500, max: 6000 });
      const descripcion = faker.lorem.sentence();
      values.push([nombre, precio, descripcion]);
    }

    await connection.query(
      `INSERT INTO menu (nombre_platillo, precio, descripcion) VALUES ?`,
      [values]
    );

    console.log(`Insertados ${i + values.length} platillos`);
  }

  await connection.end();
  console.log("Inserción de menú finalizada");
}

insertMenu().catch(err => console.error(err));

export default insertMenu;