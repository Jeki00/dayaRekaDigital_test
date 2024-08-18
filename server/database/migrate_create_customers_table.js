const pool = require("./db");

async function create_cust_tbl() {
    await pool.query(`
        CREATE TABLE customers (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            level VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_deleted BOOLEAN DEFAULT FALSE
        );
    `);
    await pool.end();
}

create_cust_tbl();

