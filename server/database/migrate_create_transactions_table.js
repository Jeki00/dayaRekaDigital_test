const pool = require("../db");

async function create_trx_tbl() {
    await pool.query(`
        CREATE TABLE transactions (
            transaction_id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            product_id INT NOT NULL,
            quantity INT NOT NULL,
            total_price DECIMAL(15, 2) NOT NULL,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES customers(user_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        );
    `);
    await pool.end();
}

create_trx_tbl();

