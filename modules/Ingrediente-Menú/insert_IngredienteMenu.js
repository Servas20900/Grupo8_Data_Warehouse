import { fakerES as faker } from "@faker-js/faker";
import connection from "./db/connection.js";

const TOTAL = 5000;
const BATCH_SIZE = 500;
const MAX_PLATILLO_ID = 1000;
const MAX_INGREDIENTE_ID = 500;

async function insertIngredienteMenu() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
      const platilloId = faker.number.int({ min: 1, max: MAX_PLATILLO_ID });
      const ingredienteId = faker.number.int({ min: 1, max: MAX_INGREDIENTE_ID });
      const cantidad = faker.number.int({ min: 1, max: 5 });
      values.push([platilloId, ingredienteId, cantidad]);
    }

    await connection.query(
      `INSERT INTO ingrediente_menu (id_platillo_fk, id_ingrediente_fk, cantidad_utilizada) VALUES ?`,
      [values]
    );

    console.log(`Insertadas ${i + values.length} relaciones platillo-ingrediente`);
  }

  await connection.end();
  console.log("Inserción de ingrediente-menu finalizada");
}

insertIngredienteMenu().catch(err => console.error(err));
export default insertIngredienteMenu;