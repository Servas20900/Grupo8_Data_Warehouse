import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sbstn2ma!",
  database: "Restaurante_Grupo8",
});

export default connection;