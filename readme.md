buka terminal folder ini

lakukan langkah ini pada folder server: 
1. cd server
2. npm i
3. npm run dev

lakukan langkah ini pada folder client:
1. cd client
2. npm i
3. npm run start

untuk migrate database. migrate database dilakukan setelah menginstall package di server
1. cd database
2. node migrate_create_db.js
3. node migrate_create_customers_table.js
3. node migrate_create_products_table.js
4. node migrate_create_transactions_table.js
5. node seeder_products_table.js
6. node seeder_customers_table.js

