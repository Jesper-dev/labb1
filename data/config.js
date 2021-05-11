const mySql = require('mysql')

// Connects to our database
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'main',
    port: '3306'
};

// Allows us to have multiple connections
const pool = mySql.createPool(config);

module.exports = pool;