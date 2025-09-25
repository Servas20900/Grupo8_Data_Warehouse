import connection from "../../db/connection.js";

const puestos = [
  ['Gerente', 'Encargado general'],
  ['Cocinero', 'Preparación de alimentos'],
  ['Mesero', 'Atención a clientes'],
  ['Bodeguero', 'Manejo de inventario']
];

async function insertPuestos() {
  await connection.query(
    `INSERT INTO puesto (nombre_puesto, descripcion) VALUES ?`,
    [puestos]
  );

  console.log('Insertados puestos');
}

insertPuestos().catch(err => console.error(err));

export default insertPuestos;