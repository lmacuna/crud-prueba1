const rutas=require("express").Router();
const cors = require('cors');

const cnx = require('./config/conexion');

rutas.use(cors());

rutas.get('/',(req,res)=>{

    res.send("hello world")
})

//INSERTAR OPERACIONES
rutas.post('/form/:datos',(req,res)=>{
    datos=req.params.datos
    datos=JSON.parse(datos)
    datos={datos:datos}
    
    console.log("recibido", datos.datos.monto);
     concepto=datos.datos.concepto
     monto=datos.datos.monto
     fecha=datos.datos.fecha
     tipo=datos.datos.tipo

     monto=parseFloat(monto);
     console.log(concepto + monto +fecha + tipo);
     console.log(monto);
     cnx.query(`INSERT INTO operaciones values(null,'${concepto}',${monto},'${fecha}','${tipo}')`,(err)=>{
         if(err){
             console.log(err);
         }else{
             console.log("enviado");
         }
     })
     console.log("se envio correctamente a BD", Date());
       
});



//OBTENER 10 ULTIMAS OPERACIONES
rutas.get('/operaciones',(req,res)=>{
     cnx.query('SELECT * FROM operaciones order by id desc limit 10',(err,result)=>{
         if(err){
             console.log(err);
         }else{
           console.log({data:result})  
           
           data={data:result}
           
           console.log(data)
           console.log(`Ultimas 10 operaciones ${Date()}`)
           res.send(data);
        
         }
     });
    }); 



 //OBTENER TODAS LAS OPERACIONES   
rutas.get('/todas/operaciones',(req,res)=>{
     cnx.query('SELECT * FROM operaciones order by id desc',(err,result)=>{
         if(err){
             console.log(err);
         }else{
          // console.log({data:result})  
           
           data={data:result}
           //console.log(data)
           //console.log("Todas las operaciones",Date())
           res.send(data);
        
         }
     });
    }); 
 
   
    
 //DELETE 1 operacion 
rutas.delete('/eliminar/:id',(req,res)=>{

    
    id=req.params.id
    console.log(id)
    cnx.query(`DELETE FROM operaciones WHERE id=${id}`,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("eliminado")
        }
            
        
    });
    console.log(`eliminaste el usuario ${id} TimeStamp ${Date()}`)
});  


//EDIT 1 operacion
rutas.post('/operacion/:id',(req,res)=>{
    var id = req.params.id;
    cnx.query(`SELECT * FROM operaciones where id=${id}`,(err,result)=>{
        if(err){
            console.log(err)
            res.send({data:err})
        }else{
            console.log({data:result})
            data={data:result}
            res.send({data:data})
        }
    });
    console.log(id)
});


//UPDATE modificar monto
rutas.put('/modificar/:dato',(req,res)=>{
     var dato = req.params.dato
     console.log(dato)
     dato=JSON.parse(dato)
     dato={dato:dato}
     id =dato.dato.id
     monto =dato.dato.monto
     monto=parseFloat(monto)
       / cnx.query(`UPDATE operaciones SET monto=${monto} where id=${id}`,(err)=>{
          if(err){
              console.log(err)
          }else{
            console.log( `Actualizacion ${id} ${monto} ${Date()}`)
          }
      });  
      console.log(`Modificado ${monto} ${Date()}`)

      
});



//SUMA DE EGRESOS
rutas.get('/operaciones/egresos',(req,res)=>{
    cnx.query(`SELECT SUM(monto) as egresos FROM operaciones WHERE tipo like '%egre%' `,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            result=result[0].egresos
            data={data:result}
            console.log(data);
           
            res.send(data)
        }
    });
});



//SUMA DE INGRESOS
rutas.get('/operaciones/ingresos',(req,res)=>{
    cnx.query(`SELECT SUM(monto) as ingresos FROM operaciones WHERE tipo like '%ingre%' `,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            result=result[0].ingresos
            data={data:result}
            console.log(data);
           
            res.send(data)
        }
    });
});



module.exports = rutas;