const mysql = require('mysql');
const cors = require('cors');

const conexion =mysql.createConnection({
host:'localhost',
user:'root',
password:'',
port:3306,
database:'gestion_personal'
});


conexion.connect((err)=>{

    if(err){
        console.log(err);
    }else{
        console.log('BD Connect Successfully');
    }
});


module.exports = conexion;