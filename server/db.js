const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "crud"
})

module.exports = pool





// const {Sequelize} = require('sequelize')


// module.exports = new Sequelize(
//     "crud",
//     "postgres",
//     "71253andrey",
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT     
//     }
// )
