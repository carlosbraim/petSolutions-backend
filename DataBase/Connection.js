require('dotenv').config();
const mysql = require('mysql2/promise');

// Configurações de conexão
// const config = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: null,
//     database: 'petsolutions',

//   });

const config = mysql.createPool({
    "host": 'localhost',
    "user": 'root',
    "password": null,
    "database": 'petsolutions',
    "port": 3306
});

/*const produção = false;
let config;

if(produção){
    config = {
        server: process.env.Orchestrator_host,
        database: process.env.Orchestrator_database,
        user: process.env.Orchestrator_user,
        password: process.env.Orchestrator_password,
        port : 1433,
        driver: "msnodesqlv8",
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    }
}else{
    config = {
        server: 'FISKAL06',
        database: 'RH_RPA',
        port : 1433,
        driver: "msnodesqlv8",
        options: {
            trustedConnection: true
        }
    }
}*/

exports.Connection = config;