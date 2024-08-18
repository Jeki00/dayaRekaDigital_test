const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./database/db");


const port =5000

app.use(cors());
app.use(express.json())

//get all customers
app.get('/api/customers',async(req,res)=>{
    try {
        let sql = `
        SELECT c.user_id, c.username, c.level FROM customers AS C WHERE c.is_deleted=False;
        `;
    
        let result = await pool.query(sql);

        // console.log(result.rows);
    
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});


//get detail of user include their transactions
app.get('/api/customers/:id',async(req,res)=>{
    try {
        let sql = `
        SELECT p.name,p.price, t.quantity,t.total_price FROM customers AS C 
        JOIN transactions as t ON t.user_id = c.user_id
        JOIN products as p ON p.product_id = t.product_id
        WHERE c.user_id=$1;
        `;
    
        let result = await pool.query(sql,[req.params.id]);

        // console.log(result.rows);
    
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});


//create new customer
app.post('/api/customers',async (req,res)=>{ 
    // console.log(req.body.username);
    try {
        const username = req.body.username;
        const level = 'warga';
        
        let sql = `
            INSERT INTO customers (username, level) VALUES ($1, $2);
        `;
    
        let result = await pool.query(sql,[username,level]);
        // console.log(result);
        res.status(200).json({
            message:'added succesfully'
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete one ot customer
app.delete("/api/customers/:id",async (req,res)=>{
    // console.log(req.params);
    try {
        let sql = "UPDATE customers SET is_deleted = TRUE WHERE user_id =$1";
        let result = await pool.query(sql,[req.params.id])
        res.status(200).json({message:'deleted succesfully'})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//mengubah quantity produk transaksi
app.put("/api/transactions/:id", async (req,res)=>{
    try {
        let quantity=req.body.quantity;
        let current_data = await pool.query('SELECT total_price,quantity FROM transactions WHERE transaction_id = $1',[req.params.id])
        let new_price = quantity*(current_data.rows[0]['total_price']/current_data.rows[0]['quantity'])
        // console.log(current_price);
        await pool.query('UPDATE transactions SET quantity = $1, total_price=$2 WHERE transaction_id=$3',[quantity,new_price,req.params.id]);
        res.status(200).json({message:"succesfully update"})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// menambah transaksi
app.post("/api/transactions", async (req, res) => {
    try {
        let { user_id, product_id, quantity } = req.body;

        let price = await pool.query(`
            SELECT price FROM products WHERE product_id = $1
            `,[product_id])
        
        // Wrap the query in a Promise
        // console.log(price.rows[0]['price']);
        
        let totalPrice = quantity * price.rows[0]['price'];

        // You can now use `totalPrice` to insert into the transactions table or other operations
        // For example:
        await pool.query("INSERT INTO transactions (user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4)",[user_id, product_id, quantity, totalPrice]);
        res.status(200).json({
            message:"added succesfully"
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, ()=>{
    console.log(`server are running at ${port}`)
});
