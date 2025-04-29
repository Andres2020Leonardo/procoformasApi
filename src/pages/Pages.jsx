import { useState } from "react";
import Cotizacion from "../cotizaciones/Cotizacion";
import ListSolicitudes from "../cotizaciones/ListSolicitudes";
import SolicitudCotizacion from "../cotizaciones/SolicitudCotizacion";
import Home from "./Home";
import ListCotizaciones from "../cotizaciones/ListCotizaciones";
import Inventario from "../almacen/Inventario";
import RecibirMaterial from "../almacen/RecibirMaterial";
import Ingreso from "../comercial/Ingreso";
import CertificadoLaboral from "../th/init";
import Cotizacion2 from "../cotizaciones/Cotizacion2";
import ColorAnalyzer from "../utils/ColorAnalyzer";

function Pages({page,setPage}){
    const [elemented,setElemented]=useState({});
    function editarSolicitud(element) {
        setElemented(element)
        setPage('cotizacion/solicitudCotizacion')
    }
    function editarCotizacion(element) {
        setElemented(element)
        setPage('cotizacion/cotizacion')
    }
    
    function View() {
        switch (page) {
            case "cotizacion/solicitudCotizacion":
                 return <SolicitudCotizacion elemented={elemented}/>
                
            case "cotizacion/cotizacion":
                return <Cotizacion elemented={elemented}/>

                
            case "cotizacion/listSolicitudes":
                return <ListSolicitudes editarSolicitud={editarSolicitud}/>
                
            case "cotizacion/listCotizaciones":
                return  <ListCotizaciones editarCotizacion={editarCotizacion}/>
                
            case "almacen/inventario":
                return  <Inventario/>
                
            case "almacen/recibir":
                return  <RecibirMaterial/>
                
            case "comercial/ingreso":
                return  <Ingreso/>
            case "th":
                    return  <CertificadoLaboral/> 
            case "cotizacion/coloranalizador":
                    return  <ColorAnalyzer/>  
            default:
                return <Home/>
        }
    }
    return(<>
        <View></View>
    </>)
}

export default Pages;