import { useState } from "react";
import Cotizacion from "../cotizaciones/Cotizacion";
import ListSolicitudes from "../cotizaciones/ListSolicitudes";
import SolicitudCotizacion from "../cotizaciones/solicitudCotizacion";
import Home from "./Home";
import ListCotizaciones from "../cotizaciones/ListCotizaciones";
import Inventario from "../almacen/inventario";
import RecibirMaterial from "../almacen/RecibirMaterial";
import Ingreso from "../comercial/ingreso";

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
                break;
            case "cotizacion/cotizacion":
                return <Cotizacion elemented={elemented}/>
                break;
            case "cotizacion/listSolicitudes":
                return <ListSolicitudes editarSolicitud={editarSolicitud}/>
                break;
            case "cotizacion/listCotizaciones":
                return  <ListCotizaciones editarCotizacion={editarCotizacion}/>
                break;
            case "almacen/inventario":
                return  <Inventario/>
                break;
            case "almacen/recibir":
                return  <RecibirMaterial/>
                break;
            case "comercial/ingreso":
                return  <Ingreso/>
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