

const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password:"",
    host:"localhost",
    port:5432
})

async function createdb() {
  await pool.query(`CREATE DATABASE foodie_db;`);
  await pool.end();
}

createdb();