import Cotizacion from "../cotizaciones/Cotizacion";
import SolicitudCotizacion from "../cotizaciones/solicitudCotizacion";
import CotizacionPdf from "../utils/CotizacionPdf";
import Home from "./Home";

function Pages({page}){

    function View() {
        switch (page) {
            case "solicitudCotizacion":
                 return <SolicitudCotizacion/>
                break;
            case "cotizacion":
                return <Cotizacion/>
                break;
            case "solicitudCotizacion1":
                
                break;
            case "solicitudCotizacion2":
                
                break;
            default:
                return <CotizacionPdf/>
        }
    }
    return(<>
        <View></View>
    </>)
}

export default Pages;