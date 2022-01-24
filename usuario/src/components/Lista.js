import React from "react";
import { useState } from "react";

/////////////////////////////////////////////////////////////
//ULTIMAS 10 OPERACIONES
const Lista=()=>{
    
    const [data,setData]=useState("")
    const [conexion,setConexion]=useState(false);
   
    
    const api = new XMLHttpRequest();
    var url ='http://localhost:4000/operaciones';
    api.open('GET',url,true);
    api.send();
    

    api.onreadystatechange = function(error){
        if(this.status === 200 && this.readyState === 4 && conexion===false){
            var data = JSON.parse(this.responseText)
           console.log(data.data)
            data=data.data
            setData(data);
             setConexion(true)
             //var tipo=data[0].tipo
             data=JSON.stringify(data)
           localStorage.setItem("data",data);
          
        
        }else if(error){
            //console.log(error)
        }
        
    }
    const actualizar=()=>{
        setConexion(false);
    }
////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////
// DIFERENCIA (INGRESOS Y EGRESOS)

    const Diferencia=()=>{
        var [egresos,setEgresos]=useState(0)
        var [ingresos,setIngresos]=useState(0)
    const ap = new XMLHttpRequest();
    const url ='http://localhost:4000/operaciones/egresos';
    ap.open('GET',url,true);
    ap.send();
    ap.onreadystatechange = function(error){
        if(this.status === 200 && this.readyState === 4 ){
            var data = JSON.parse(this.responseText)
           console.log(data.data)
            egresos=data.data
              setEgresos(egresos)
             
            console.log(egresos)
             
        
            }else if(error){
            //console.log(error);
            }
        }
        
        const app = new XMLHttpRequest();
        
        const ur ='http://localhost:4000/operaciones/ingresos';
        app.open('GET',ur,true);
        app.send();
        app.onreadystatechange = function(error){
            if(this.status === 200 && this.readyState === 4 ){
                var data = JSON.parse(this.responseText)
               console.log(data.data)
                ingresos=data.data
                  setIngresos(ingresos)
                 
                console.log(ingresos)
                 
            
                }else if(error){
                //console.log(error);
                }
            }
            var total=ingresos-egresos
          return(
                <>

                <div style={{margin:"auto",display:"flex",width:"90vw",color:"white",height:"7vw",background:"black",borderRadius:"7px"}}>
                <div style={{margin:"auto"}}>
                <h1>Ingresos: ${ingresos}</h1>
                </div>
                <div style={{margin:"auto"}} >
                <h1>Egresos: ${egresos}</h1>
                </div>
                <div style={{margin:"auto"}}>
                <h1 style={{fontSize:"40px",color:"yellow",textShadow:"2px 2px 2px grey"}}>Diferencia: ${total}</h1>
                </div>
                </div>
                </>
                )
        }

//////////////////////////////////////////////////////////////

//VISTA ULTIMAS 10 OPERACIONES

//////////////////////////////////////////////////////////////

    

    return(
         <> 
         
         <br></br><br></br>
        <Diferencia/>
        <br></br>
        <div style={{width:"90vw",margin:"auto"}}>
              <button style={{float:"left"}} onClick={()=>actualizar()}>Actualizar</button> <br></br><br></br><h2 style={{color:"white"}}>Ultimas 10 operaciones</h2>
              <br></br>
              <div style={{display:"flex",width:"90vw",margin:"auto",color:"white",marginBottom:"20px"}}>
               <div style={{marginRight:"5px",width:"30vw",textAlign:"center"}}><h4>Concepto</h4></div>
               <div style={{margin:"auto",textAlign:"center",marginRight:"10px",width:"10vw"}}><h4>Monto</h4></div>
               <div style={{margin:"auto",textAlign:"center",marginRight:"30px",width:"15vw"}}><h4>Fecha</h4></div>
               <div style={{margin:"auto",textAlign:"center",float:"right",width:"15vw"}}><h4>Tipo de Operacion</h4></div>
               </div> 
      {
         
          data&&data.map(d=> (
                
              <div key={d.id} style={{width:"90vw",background:"black",display:"flex",border:"1px solid red",margin:"auto",padding:"10px",fontWeight:"bold",color:"white",textAlign:"left",height:"45px"}}>
               <div style={{marginRight:"10px",marginTop:"15px"}}>{d.id}</div>   
              <div style={{marginRight:"30px",width:400,height:"60px",marginTop:"15px"}}>{d.concepto}</div>
              <div style={{margin:"20px",color:"lightblue"}}>{d.monto}</div>
              <div style={{margin:"auto"}}>{(d.fecha).substring(0,10)}</div>
            {d.tipo==="ingresos"? <div style={{marginRight:"20px",marginTop:"15px",color:"darkgreen"}}>{d.tipo}</div>:<div style={{marginRight:"20px",marginTop:"15px",color:"tomato"}}>{d.tipo}</div>}
              </div>
          ))
          
      }
        </div>
        </>
    )
}



export default Lista;