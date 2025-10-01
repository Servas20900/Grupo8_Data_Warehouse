import { fakerES as faker } from "@faker-js/faker";
import connection from "../../db/connection.js";

const TOTAL = 500;                
const BATCH_SIZE = 500;           
const MAX_PLATILLO_ID = 500;        
const MAX_INGREDIENTE_ID = 500;    

async function insertIngredienteMenu() {
  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];
    const combinaciones = new Set(); 

    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
      let platilloId, ingredienteId, key;

      do {
        platilloId = faker.number.int({ min: 1, max: MAX_PLATILLO_ID });
        ingredienteId = faker.number.int({ min: 1, max: MAX_INGREDIENTE_ID });
        key = `${platilloId}-${ingredienteId}`;
      } while (combinaciones.has(key));

      combinaciones.add(key);

      const cantidadUtilizada = faker.number.int({ min: 1, max: 5 }); // Cantidad de ingrediente por platillo
      values.push([platilloId, ingredienteId, cantidadUtilizada]);
    }

    await connection.query(
      `INSERT INTO ingrediente_menu (id_platillo_fk, id_ingrediente_fk, cantidad_utilizada) VALUES ?`,
      [values]
    );

    console.log(`Insertadas ${i + values.length} relaciones ingrediente-menú`);
  }

  console.log("Inserción de relaciones ingrediente-menú finalizada");
}

export default insertIngredienteMenu;
