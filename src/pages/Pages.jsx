import { useState } from "react";
import Cotizacion from "../cotizaciones/Cotizacion";
import ListSolicitudes from "../cotizaciones/ListSolicitudes";
import SolicitudCotizacion from "../cotizaciones/solicitudCotizacion";
import Home from "./Home";
import ListCotizaciones from "../cotizaciones/ListCotizaciones";

function Pages({page,setPage}){
    const [elemented,setElemented]=useState({});
    function editarSolicitud(element) {
        setElemented(element)
        setPage('solicitudCotizacion')
    }
    function editarCotizacion(element) {
        setElemented(element)
        setPage('cotizacion')
    }
    
    function View() {
        switch (page) {
            case "solicitudCotizacion":
                 return <SolicitudCotizacion elemented={elemented}/>
                break;
            case "cotizacion":
                return <Cotizacion elemented={elemented}/>
                break;
            case "listSolicitudes":
                return <ListSolicitudes editarSolicitud={editarSolicitud}/>
                break;
            case "listCotizaciones":
                return  <ListCotizaciones editarCotizacion={editarCotizacion}/>
                break;
            default:
                return <Home/>
        }
    }
    return(<>
        <View></View>
    </>)
}

export default Pages;