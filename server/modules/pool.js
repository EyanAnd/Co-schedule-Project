// init pg
const pg = require('pg');
let pool; // create pool variable

// when deploying to the internet pivot to the database .env 
if(process.env.DATABSE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABSE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    // on our own local device connect to thet local postgres database
    
}

else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'your-database-name', 
    });
}

module.exports = pool;