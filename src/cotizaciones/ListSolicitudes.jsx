import {  useEffect, useState } from 'react'
import ClientAxios from '../config/ClientAxios';
import { useForm } from "react-hook-form";
import { Autocomplete, TextField } from '@mui/material';
import Decrypt from '../config/Decrypt';
import Alert from '../utils/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPencil, faX } from '@fortawesome/free-solid-svg-icons';
import CotizacionPDFViewer from '../utils/CotizacionPDFViewer';
import TabulatorTable from '../utils/TabulatorTable';
const logo = "./img/cdpLogo2.png";
const ListSolicitudes=({editarSolicitud})=> {
      
    const [loadingIcon,setLoadingIcon] = useState(false);    
    const [allDatas,setAllDatas] =useState({})
    const [allSolicitudes,setAllSolicitudes] =useState([])
        useEffect(() => {
            async function fetchData() {
              try {
                
                const responseSoli = await ClientAxios.post(
                    `/solicitudesCotizacion`,   {}, 
                    {
                      headers: {
                        'User': Decrypt(localStorage.getItem("SesionToken")), 
                      }
                    }
                    
                  );

                  setAllSolicitudes(responseSoli.data)
                const response = await ClientAxios.post(
                  `/allDatasSoli`,   {}, 
                  {
                    headers: {
                      'User': Decrypt(localStorage.getItem("SesionToken")), 
                    }
                  }
                  
                );
                setAllDatas(response.data)
                
               
                const emailToken =Decrypt(localStorage.getItem("SesionToken"));  
              } catch (error) {
                console.error('Error fetching data:', error);
              } finally {
              }
            }
          
            fetchData();   
          }, []);
   
  return (
    <>  
    {loadingIcon && <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-white" style={{height:"90%"}}   icon={faArrowsRotate}/></div>}
            
    
    {!allDatas?.clientes?<div className="navegadorOpenBody d-flex  h-100vh"><img
            className="mx-auto my-auto spin"
            src={logo}
            alt="Logo Argos"
          /></div>:<div className="navegadorOpenBody"  id="contenedorbody"  >
        <div  className="col-12 mx-auto" style={{display: "flex", flexDirection: "row"}}>
            <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>
                <div className="card scroll-divs-card mx-auto"  style={{pmarginBottom: "20px"}}>
                    <div className="card-body "  style={{zoom: "100% "}}>
                        <h3 className="col-12 " style={{textAlign: "center"}}>Solicitud de cotización</h3>
                        
                        <TabulatorTable
                                columns={[
                                    { title: 'Id', field: 'id', headerFilter: 'input' },
                                    { title: 'Tipo Cotización', field: 'tipoCotizacion', headerFilter: 'input' },
                                    { title: 'Fecha Cotización', field: 'fechaCotizacion', headerFilter: 'input' },
                                    { title: 'Fecha Vigencia', field: 'fechaVigencia', headerFilter: 'input' },
                                    { title: 'Cliente', field: 'cliente', headerFilter: 'input' },
                                    { title: 'Producto', field: 'producto', headerFilter: 'input' },
                                    { title: 'Descripción Producto', field: 'descripcionProducto', headerFilter: 'input' },
                                    { title: 'Existencia Producto', field: 'existenciaProducto', headerFilter: 'input' },
                                    { title: 'Grado Dificultad', field: 'gradoDificultad', headerFilter: 'input' },
                                    { title: 'Unidad Ref Distintas', field: 'unidadRefDistintas', headerFilter: 'input' },
                                    { title: 'Unidad Planchas', field: 'unidadPlanchas', headerFilter: 'input' },
                                    { title: 'Unidad Tintas', field: 'unidadTintas', headerFilter: 'input' },
                                    { title: 'Canidades Ref Son', field: 'canidadesRefSon', headerFilter: 'input' },
                                    { title: 'Cantidad 1', field: 'cantidad1', headerFilter: 'input' },
                                    { title: 'Cantidad 2', field: 'cantidad2', headerFilter: 'input' },
                                    { title: 'Cantidad 3', field: 'cantidad3', headerFilter: 'input' },
                                    { title: 'Cantidad 4', field: 'cantidad4', headerFilter: 'input' },
                                    { title: 'Cantidad 5', field: 'cantidad5', headerFilter: 'input' },
                                    { title: 'Cantidad 6', field: 'cantidad6', headerFilter: 'input' },
                                    { title: 'Cantidad 7', field: 'cantidad7', headerFilter: 'input' },
                                    { title: 'Cantidad 8', field: 'cantidad8', headerFilter: 'input' },
                                    { title: 'Entrega 1', field: 'entrega1', headerFilter: 'input' },
                                    { title: 'Entrega 2', field: 'entrega2', headerFilter: 'input' },
                                    { title: 'Entrega 3', field: 'entrega3', headerFilter: 'input' },
                                    { title: 'Entrega 4', field: 'entrega4', headerFilter: 'input' },
                                    { title: 'Entrega 5', field: 'entrega5', headerFilter: 'input' },
                                    { title: 'Entrega 6', field: 'entrega6', headerFilter: 'input' },
                                    { title: 'Entrega 7', field: 'entrega7', headerFilter: 'input' },
                                    { title: 'Entrega 8', field: 'entrega8', headerFilter: 'input' },
                                    { title: 'Fecuencia Días 1', field: 'fecuenciaDias1', headerFilter: 'input' },
                                    { title: 'Fecuencia Días 2', field: 'fecuenciaDias2', headerFilter: 'input' },
                                    { title: 'Fecuencia Días 3', field: 'fecuenciaDias3', headerFilter: 'input' },
                                    { title: 'Fecuencia Días 4', field: 'fecuenciaDias4', headerFilter: 'input' },
                                    { title: 'Fecuencia Días 5', field: 'fecuenciaDias5', headerFilter: 'input' },
                                    { title: 'Fecuencia Días 6', field: 'fecuenciaDias6', headerFilter: 'input' },
                                    { title: 'Fecuencia Días 7', field: 'fecuenciaDias7', headerFilter: 'input' },
                                    { title: 'Fecuencia Días 8', field: 'fecuenciaDias8', headerFilter: 'input' },
                                    { title: 'Observaciones', field: 'observaciones', headerFilter: 'input' },
                                    { title: 'Aplicación Especificaciones', field: 'aplicacionEspecificaciones', headerFilter: 'input' },
                                    { title: 'Ancho Espe', field: 'anchoEspe', headerFilter: 'input' },
                                    { title: 'Avance Espe', field: 'avanceEspe', headerFilter: 'input' },
                                    { title: 'Troquel', field: 'troquel', headerFilter: 'input' },
                                    { title: 'Material', field: 'material', headerFilter: 'input' },
                                    { title: 'Acabado', field: 'acabado', headerFilter: 'input' },
                                    { title: 'Cold Foil', field: 'coldFoild', headerFilter: 'input' },
                                    { title: 'T1', field: 't1', headerFilter: 'input' },
                                    { title: 'T2', field: 't2', headerFilter: 'input' },
                                    { title: 'Base Agua Tipo Tinta', field: 'baseAguaTipoTinta', headerFilter: 'input' },
                                    { title: 'Metalizada Tipo Tinta', field: 'metalizadaTipoTinta', headerFilter: 'input' },
                                    { title: 'UV Tipo Tinta', field: 'uvTipoTinta', headerFilter: 'input' },
                                    { title: 'Fluorescentes Tipo Tinta', field: 'fluorescentesTipoTinta', headerFilter: 'input' },
                                    { title: 'Cubrimiento', field: 'cubrimiento', headerFilter: 'input' },
                                    { title: 'Tintas Respaldo', field: 'tintasRespaldo', headerFilter: 'input' },
                                    { title: 'Cinta', field: 'cinta', headerFilter: 'input' },
                                    { title: 'Tipo Cinta', field: 'tipoCinta', headerFilter: 'input' },
                                    { title: 'Presentación', field: 'presentacion', headerFilter: 'input' },
                                    { title: 'Rollos Por', field: 'rollosPor', headerFilter: 'input' },
                                    { title: 'Etiq Ancho', field: 'etiqAncho', headerFilter: 'input' },
                                    { title: 'Core', field: 'core', headerFilter: 'input' },
                                    { title: 'Posición Presentación', field: 'posicionPresentacion', headerFilter: 'input' },
                                    { title: 'Etiquetas Hoja', field: 'etiquetasHoja', headerFilter: 'input' },
                                    { title: 'Hojas Paquete', field: 'hojasPaquete', headerFilter: 'input' },
                                    { title: 'Ciudades Entrega', field: 'ciudadesEntrega', headerFilter: 'input' },
                                    { title: 'Ciudad Entrega', field: 'ciudadEntrega', headerFilter: 'input' },
                                    { title: 'Puntos Entrega', field: 'puntosEntrega', headerFilter: 'input' },
                                    { title: 'Asesor', field: 'asesor', headerFilter: 'input' },
                                    { title: 'Comisión', field: 'comision', headerFilter: 'input' },
                                    { title: 'Tipo Asesor', field: 'tipoAsesor', headerFilter: 'input' },
                                    { title: 'Digitado', field: 'digitado', headerFilter: 'input' },
                                    { title: 'Unidad Selección', field: 'unidadSeleccion', headerFilter: 'input' },
                                    { title: 'Unidad Selección Juego 2x2', field: 'unidadSeleccionJuego2x2', headerFilter: 'input' },
                                    { title: 'Unidad Selección Mangas', field: 'unidadSeleccionMangas', headerFilter: 'input' },
                                    { title: 'Unidad Selección Otro', field: 'unidadSeleccionOtro', headerFilter: 'input' },
                                    { title: 'Presentación Rollos', field: 'presentacionRollos', headerFilter: 'input' },
                                    { title: 'Hot Stamping', field: 'hotStamping', headerFilter: 'input' },
                                    {title: 'Acciones', field: 'acciones', formatter: function(cell, formatterParams, onRendered){
                                        // Crear el botón
                                        const button = document.createElement("button");
                                        button.className = "btn btn-warning";
                                        button.innerHTML = `
                                            Editar <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil" class="svg-inline--fa fa-pencil " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>`;
                            
                                        // Agregar evento click al botón
                                        button.addEventListener("click", function() {
                                            const rowData = cell.getRow().getData(); // Obtener los datos de la fila actual
                                            editarSolicitud(rowData)                                           
                                            // Aquí puedes agregar más lógica, como abrir un modal o redirigir a otra página
                                        });
                            
                                        // Devolver el botón con el SVG
                                        return button;
                                    }}
                                ]}
                                data={allSolicitudes}
                                />



                    </div>
                </div>
            </div>
        </div>
        </div>

    }

    </>
  );
}

export default ListSolicitudes;
