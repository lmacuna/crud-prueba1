const express = require("express");
require('./config/conexion')
const cors = require('cors');
const port =(process.env.port || 4000);
const app=express();

app.set('port',port);
app.use(require('./rutas'));



app.listen(app.get('port'),(err)=>{
    if(err){
        console.log('error al iniciar servidor', err);
    }else{
        console.log('Server runing on port ',port);
    }
});