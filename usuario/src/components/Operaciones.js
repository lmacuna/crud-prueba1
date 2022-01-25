import React, { useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ToggleIndeterminateCheckBox from 'material-ui/svg-icons/toggle/indeterminate-check-box';


const Operaciones=()=>{
      const [mostrar,setMostrar]=useState(false);
      const [datos,setDatos]=useState("");
      const [vista,setVista]=useState("");
      const [cambio,setCambio]=useState(false);
      const [importe,setImporte]=useState("");
      const [impo,setImpo]=useState("")
      var [mensaje,setMensaje]=useState("");
     const ap= new XMLHttpRequest();
     const url ='http://localhost:4000/todas/operaciones';
     ap.open('GET',url,true);
     ap.send();

     ap.onreadystatechange = function(error){
         
         if(this.status===200 && this.readyState===4&&mostrar===false){

            var data=JSON.parse(this.responseText);
            console.log(data.data);
            data=data.data
            setDatos(data)
           
            
            setMostrar(true)
            
         }else{
             //console.log(error);
         }
     }
    const useStyles=makeStyles({
        caja:{
            width:'98vw',
            height:'100vw'
            
        },
        item:{
           display:'inline-block',
            width:'96vw',
            border:'2px solid red',
            marginLeft:'10px',
            height:'60px',
            background:'black',
            textAlign:'left'
        },
         subitem:{
           marginLeft:'10px !important',
           display:'inline-block',
           width:'25vw'
           
        },
        subitem1:{
            marginLeft:'5px !important'
        }, 
        boton:{
            width:'7vw !important',
            height:'30px',
            float:'right !important',
            fontSize:'16px'

        },
        boton1:{
            width:'7vw !important',
            height:'30px',
            float:'right !important',
            fontSize:'16px',
            background:'red'

        },
        

    });
   
    const classes = useStyles();

    
    
    const Quitar=()=>{
       
        setVista("")
         setCambio(false)
         
     } 

//EDITAR UNA OPERACION
   const editar=(id)=>{
       console.log(id)
       id=id.target.id
       setCambio(true)
      
       console.log(id)
       const url =`http://localhost:4000/operacion/${id}`;
       ap.open('POST',url,true);
       ap.send();
  
       ap.onreadystatechange = function(error){
           if(this.status===200 && this.readyState===4){
  
              var data=JSON.parse(this.responseText);
              console.log(data.data);
              data=data.data
              
              console.log(data)
             setVista(<div key={data.data[0].id} style={{width:'50vw',margin:'auto',textAlign:'center !important'}}><h3>Modificar</h3><br></br>
             <div  style={{background:'black',height:'4vw',width:'35vw',border:'2px solid white',margin:'auto'}}><p>{data.data[0].id} {data.data[0].concepto}</p></div>
             <div className={classes.subitem} style={{background:'black',border:'2px solid white',width:'35vw',margin:'auto'}}><input id='monto' style={{height:'40px ',width:'25vw'}}name={impo} placeholder={data.data[0].monto}  onChange={(i)=>Importe(i)} ></input></div>
             <div className={classes.subitem} style={{background:'black',border:'2px solid white',width:'35vw',height:'4vw',margin:'auto'}}><p>{(data.data[0].fecha).substring(0,10)}</p></div>
             {data.data[0].tipo==="ingresos"?<div style={{background:'black',border:'2px solid white',width:'35vw',height:'4vw',margin:'auto',color:"limegreen"}}><p>{data.data[0].tipo}</p></div>:<div style={{background:'black',border:'2px solid white',width:'35vw',height:'4vw',margin:'auto',color:"tomato"}}><p>{data.data[0].tipo}</p></div>}
              <div style={{width:'50vw',margin:'auto',height:'7vw'}}><button className={classes.boton2} style={{display:'inline-block',background:'black'}} id={data.data[0].id} onClick={(id)=>Quitar(id)}>X</button><button style={{display:'inline-block'}} accessKey={data.data[0].id} id={data.data[0].monto} onClick={(id)=>modificar(id)}>Modificar</button></div>

              
             </div>)
              
           }else{
               //console.log(error);
           }
       }
       
   }
   
   const Importe=(i)=>{
     console.log(i.target.value)  
     setImporte(i.target.value)
     setImpo(i.target.value)
     

   }

 console.log(importe)
 localStorage.setItem("importe",importe)




   const modificar=(id,importe)=>{
      var monto=localStorage.getItem("importe")
       setImporte(monto)
         console.log(importe)
         var id=id.target.accessKey
         console.log(id)
        var dato={
             id:id,
             monto:monto
         }
         console.log(dato)
         dato=JSON.stringify(dato)
         setTimeout(()=>{
             Quitar()
         },3000)
        const ap = new XMLHttpRequest();
        const url =`http://localhost:4000/modificar/${dato}`;
        ap.open('PUT',url,true);
        ap.send();
        
        setMensaje("Enviando cambios...");
        setTimeout(()=>{
            setMensaje("Modificado!!")
           
                setTimeout(()=>{
                    setMensaje("")
                },1000)
               
                
                  
                    actualizar()
               
            
        },2000)
      
    }
    
    const actualizar=()=>{
        setMostrar(false)
        
    }
    const eliminar=(id)=>{
     id=id.target.id
     console.log(id)
     const ap = new XMLHttpRequest();
     const url = `http://localhost:4000/eliminar/${id}`
     ap.open('DELETE',url,true);
     ap.send();
     setMensaje("Item Eliminado")
     setTimeout(()=>{
         setMensaje("");
        actualizar();
     },3000)
     
    }
    return(
        <>
        <div>
            <h1>Operaciones</h1>
        </div>
        {cambio?vista:null}<span>{mensaje}</span>
            <div className={classes.caja}>
            {
               
               !cambio?datos&&datos.map(d => (
                  
                    
                        <div key={d.id}  className={classes.item}><div className={classes.subitem} style={{height:'4vw'}}><p>{d.id} {d.concepto}</p></div><div className={classes.subitem} style={{width:'16vw',height:'4vw',textAlign:'center'}}><p >{d.monto}</p></div><div className={classes.subitem} style={{width:'16vw',height:'4vw',textAlign:'center'}}><p>{(d.fecha).substring(0,10)}</p></div>
                        {d.tipo==="ingresos"?<div className={classes.subitem} style={{width:'16vw',height:'4vw',textAlign:'center',color:"limegreen"}}><p>{d.tipo}</p></div>:<div className={classes.subitem} style={{width:'16vw',height:'4vw',textAlign:'center',color:"tomato"}}><p>{d.tipo}</p></div>}
                        <button id={d.id} onClick={(id)=>editar(id)} className={classes.boton}>Editar</button><button id={d.id} onClick={(id)=>eliminar(id)} className={classes.boton1}>Eliminar</button>
                        </div>
                    )
                 )
                    
                
                 :null    
                
            }
        </div> 
        <br></br>
          
        </>
    )
}
export default Operaciones;