import { createContext, useState } from 'react'
import './App.css'
import SolicitudCotizacion from './cotizaciones/solicitudCotizacion'
import Sidebar from './layouts/sidebar';
import { BrowserRouter } from 'react-router-dom';
import './styles/Globals.less'
import Login from './auth/login'
function App() {

 
  const Context = createContext();
  return (
    <Context.Provider value={{ basename: '/' }}>
      {/* <Login></Login> */}
      <BrowserRouter>
          <div  className='start-0 top-0 position-fixed h-100vh w-100vw d-flex flex-row '> 
            <Sidebar></Sidebar>
            <SolicitudCotizacion></SolicitudCotizacion>
          </div>
      </BrowserRouter>
    
    </Context.Provider>
      
  );
}

export default App
