import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";



const Navegador=()=>{

    const useStyles = makeStyles({
        link: {
            color:'white',
            fontWeight:'bold',
            fontSize:'30px',
            margin:'30px',
            
            "&:hover":{
                color:"black"
            },
            "&:active":{
                color:'red'
            }
        }
       
      });
      
     
        const classes = useStyles();

    return(
        <>
        <nav>
           
            <Link className={classes.link}  to='/'>Inicio</Link>   |   {""}
            <Link className={classes.link}  to='/operaciones'>Operaciones</Link>
        </nav>
        </>
    )
}

export default Navegador;