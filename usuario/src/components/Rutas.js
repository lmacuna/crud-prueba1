import React from 'react';
import Operaciones from './Operaciones.js';
import Navegador from './Navegador.js';
import Formulario from './Formulario.js';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

const Rutas=()=>{


    return(<div>
 <Router>
     <Navegador/>
   <Routes>
   
        <Route path='/' element={<Formulario/>} />
        <Route path='/operaciones' element={<Operaciones/>}/>
   </Routes>
 </Router>

  </div>

  )}
  export default Rutas;