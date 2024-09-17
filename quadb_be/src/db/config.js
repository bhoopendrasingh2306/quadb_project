const {Client} = require('pg')

const con  = new Client({
    host: 'localhost',
    user: 'postgres',
    port: '5433',
    password: 'root',
    database: 'quadb'
})

con.connect().then(()=>console.log("DB connected"));

module.exports = con;