import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export let connection:Promise<Connection>;

connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

