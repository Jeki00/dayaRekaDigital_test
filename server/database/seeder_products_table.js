const pool = require("../db");

async function seed_pdct_tbl() {
    let values=[
        "nasi goreng",15000,
        "mie goreng",11000,
        "mie rebus",12000,
        "magelangan",12000,
        "cap cay goreng",16000,
        "cap capy kuah",17000,
        "paklay",17000,
        "sate ayam",15000,
        "sate kambing",25000,
        "tongseng",28000
        ]
    await pool.query(`
        INSERT INTO products (name, price) 
        VALUES 
            ($1, $2),
            ($3, $4),
            ($5, $6),
            ($7, $8),
            ($9, $10),
            ($11,$12),
            ($13,$14),
            ($15,$16),
            ($17,$18),
            ($19,$20);
    `, values);
    await pool.end();
}

seed_pdct_tbl();

