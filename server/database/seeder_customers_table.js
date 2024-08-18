const pool = require("../db");

async function seed_cust_tbl() {
    let values=[
                "Jalen Lang","warga",
                "Paola Berry","juragan",
                "Nikki Ortiz","sultan",
                "Anthony Salazar","konglomerat",
            ]
    await pool.query(`
        INSERT INTO customers (username, level) 
        VALUES 
            ($1, $2),
            ($3, $4),
            ($5, $6),
            ($7, $8) ;
    `, values);
    await pool.end();
}

seed_cust_tbl();

