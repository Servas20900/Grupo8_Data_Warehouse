import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 500;
const BATCH_SIZE = 500;

async function insertIngredientes() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
      const nombre = faker.food.ingredient();
      const cantidad = faker.number.int({ min: 10, max: 200 });
      values.push([nombre, cantidad]);
    }

    await connection.query(
      `INSERT INTO store_ingrediente (nombre_ingrediente, cantidad) VALUES ?`,
      [values]
    );

    console.log(`Insertados ${i + values.length} ingredientes`);
  }

  console.log("Inserción de ingredientes finalizada");
}

export default insertIngredientes;