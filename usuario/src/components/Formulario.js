import React from 'react';
import { useState } from 'react';
import Lista from './Lista';

const Formulario=()=>{

    const [concepto,setConcepto]=useState("")
    const [monto,setMonto]=useState("")
    const [fecha,setFecha]=useState("")
    const [tipo,setTipo]=useState("")

    const [campoConcepto,setCampoConcepto]=useState("");
    const [campoMonto,setCampoMonto]=useState("");
    const [campoFecha,setCampoFecha]=useState("");
    const [campoTipo,setCampoTipo]=useState("");

    //const [mostrar,setMostrar]=useState(false);
    const [mensaje,setMensaje]=useState(""); 


    const capturarConcepto=(e)=>{
         console.log(e.target.value);
         setConcepto(e.target.value);
         setCampoConcepto(e.target.value);
    }
    const capturarMonto=(e)=>{
         console.log(e.target.value);
         setMonto(e.target.value);
         setCampoMonto(e.target.value);
    }
    const capturarFecha=(e)=>{
         console.log(e.target.value);
         setFecha(e.target.value);
         setCampoFecha(e.target.value);
    }
    const capturarTipo=(e)=>{
         console.log(e.target.value);
         setTipo(e.target.value);
         setCampoTipo(e.target.value);
    }


    const enviarDatos=()=>{
      if(concepto!==""&&monto!==""&&fecha!==""&&tipo!==""){
      var  datos ={
            concepto:concepto,
            monto:monto,
            fecha:fecha,
            tipo:tipo
        }
        console.log(datos);
        //setMostrar(true);
        setCampoConcepto("");
        setCampoMonto("");
        setCampoFecha("");
        setCampoTipo("");
        datos=JSON.stringify(datos)
        var url = `http://localhost:4000/form/${datos}`;
        const api = new XMLHttpRequest();
        api.open('POST',url,true);
        console.log(datos)
        api.send();
        setTimeout(()=>{
           setConcepto("");
           setMonto("");
           setFecha("");
           setTipo("");
        },3000)
        setMensaje("Datos ingresados correctamente");
              setTimeout(()=>{
                  setMensaje("");
              },3000)
    }else if(concepto===""||monto===""||fecha===""||tipo===""){
              setMensaje("Debes completar todos los campos!!!");
              setTimeout(()=>{
                  setMensaje("");
              },3000)
    }
        
    }
     const reset=()=>{
        setCampoConcepto("");
        setCampoMonto("");
        setCampoFecha("");
        setCampoTipo("");
     }
    

    return(
        <div>
            <h1 style={{float:"left",margin:"30px"}}>Inicio</h1>
        <div className='cajaForm'>
            <h2>Ingreso de operaciones</h2>
        <div className='form'>
            <input style={{marginTop:"30px"}} value={campoConcepto} onChange={(e)=>capturarConcepto(e)} placeholder='Concepto o descripcion'></input>
            <input type="number" value={campoMonto} onChange={(e)=>capturarMonto(e)} placeholder='Monto'></input>
            <input value={campoFecha} onChange={(e)=>capturarFecha(e)} placeholder='Fecha'></input>
            <input value={campoTipo} onChange={(e)=>capturarTipo(e)} placeholder='Tipo ( ingresos o egresos)'></input>
            <div className='botones'><button onClick={()=>enviarDatos()}>Ingresar</button><button className='reset' onClick={()=>reset()}>Reset</button></div>
        </div>
        {mensaje?<div style={{background:"white",width:"40vw",margin:"auto",height:"30px",textAlign:"center",border:"2px solid red"}}><p style={{color:"crimson",fontWeight:"bold",margin:"auto",fontSize:"20px"}}>{mensaje}</p></div>:null}
        </div>
      <br></br><br></br><br></br><br></br>
      <Lista/>
            
        
      </div>
    )
}



export default Formulario;