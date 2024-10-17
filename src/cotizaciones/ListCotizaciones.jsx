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
const ListCotizaciones=({editarCotizacion})=> {
      
    const [loadingIcon,setLoadingIcon] = useState(false);    
    const [allDatas,setAllDatas] =useState({});
    const [allSolicitudes,setAllSolicitudes] =useState([]);    
    const [mostrartabla,setMostrartabla]=useState(false);    
    const [allCoti,setAllCoti]=useState([])
    const [coti,setCoti]=useState(0);
    async function vercostos(data) {
        const responsev = await ClientAxios.post(
            `/cotizacionesValores`,   {}, 
            {
              headers: {
                'User': Decrypt(localStorage.getItem("SesionToken")), 
              }
            }
            
          )
          setCoti(data.id);
          setAllCoti(responsev.data)
          setMostrartabla(true);
    }
    function filtarCoti() {
        
        let cotis = allCoti.filter(item => parseInt(item.cotizacion) === parseInt(coti) );
        console.log((cotis))
        return cotis
    }
        useEffect(() => {
            async function fetchData() {
              try {
                
                const responseSoli = await ClientAxios.post(
                    `/cotizaciones`,   {}, 
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
                        <h3 className="col-12 " style={{textAlign: "center"}}>Cotizaciones</h3>
                        
                        <TabulatorTable
                                columns = {[
                                    { title: "# Cotización", field: "id" },
                                    { title: "Sup Aplica", field: "supAplica" },
                                    { title: "Uso Final", field: "usoFinal" },
                                    { title: "PAR", field: "par" },
                                    { title: "Adhesivo", field: "adhesivo" },
                                    { title: "Comi", field: "comi" },
                                    { title: "Costo Troquel Tipo", field: "costoTroquelTipo" },
                                    { title: "Costo Troquel Tipo Otro", field: "costoTroquelTipoOtro" },
                                    { title: "Unidad PAR", field: "unidadPAR" },
                                    { title: "C Unidad", field: "cUnidad" },
                                    { title: "Around", field: "around" },
                                    { title: "Across", field: "across" },
                                    { title: "Sustrato Tipo", field: "sustratoTipo" },
                                    { title: "Espacio Exteriores", field: "espacioExteriores" },
                                    { title: "Espacio Entre Etiquetas", field: "espacioEntreEtiquetas" },
                                    { title: "Precio Material", field: "precioMaterial" },
                                    { title: "Ancho Material C", field: "anchoMaterialC" },
                                    { title: "Precio Acabado", field: "precioAcabado" },
                                    { title: "Ancho Laminacion C", field: "anchoLaminacionC" },
                                    { title: "Precio Cold", field: "precioCold" },
                                    { title: "Ancho Cold C", field: "anchoColdC" },
                                    { title: "Cubrimiento Coti 1", field: "cubrimientoCoti1" },
                                    { title: "Tipo Tinta 1", field: "tipoTinta1" },
                                    { title: "Gr Tinta 1", field: "grTinta1" },
                                    { title: "Planchas Tinta 1", field: "planchasTinta1" },
                                    { title: "Cubrimiento Coti 2", field: "cubrimientoCoti2" },
                                    { title: "Tipo Tinta 2", field: "tipoTinta2" },
                                    { title: "Gr Tinta 2", field: "grTinta2" },
                                    { title: "Planchas Tinta 2", field: "planchasTinta2" },
                                    { title: "Cubrimiento Coti 3", field: "cubrimientoCoti3" },
                                    { title: "Tipo Tinta 3", field: "tipoTinta3" },
                                    { title: "Gr Tinta 3", field: "grTinta3" },
                                    { title: "Planchas Tinta 3", field: "planchasTinta3" },
                                    { title: "Cubrimiento Coti 4", field: "cubrimientoCoti4" },
                                    { title: "Tipo Tinta 4", field: "tipoTinta4" },
                                    { title: "Gr Tinta 4", field: "grTinta4" },
                                    { title: "Planchas Tinta 4", field: "planchasTinta4" },
                                    { title: "Camb Planchas", field: "cambPlanchas" },
                                    { title: "Metros", field: "metros" },
                                    { title: "Grad Planchas", field: "gradPlanchas" },
                                    { title: "Grad PAR", field: "gradPAR" },
                                    { title: "Prep Tintas", field: "prepTintas" },
                                    { title: "Precio Hot Stamping", field: "precioHotStamping" },
                                    { title: "Cambios Tintas", field: "cambiosTintas" },
                                    { title: "Ir Adhesivo", field: "irAdhesivo" },
                                    { title: "Ir Liner", field: "irLiner" },
                                    { title: "Troquel Graduacion", field: "troquelGraduacion" },
                                    { title: "Shok Air", field: "shokAir" },
                                    { title: "Panchado Fc", field: "ponchadoFc" },
                                    { title: "Mesa Shetter", field: "mesaShetter" },
                                    { title: "Velocidad Imp", field: "velocidadImp" },
                                    { title: "Velocidad Imp Valor", field: "velocidadImpValor" },
                                    { title: "Maquina", field: "maquina" },
                                    { title: "Etiq Al Ancho", field: "etiqAlAncho" },
                                    { title: "Avance Zebra", field: "avanceZebra" },
                                    { title: "Ref Distintas Zebra", field: "refDistintasZebra" },
                                    { title: "Cinta Zebra", field: "cintaZebra" },
                                    { title: "Terminacion En", field: "terminacionEn" },
                                    { title: "Recargo Transporte", field: "recargoTransporte" },
                                    { title: "Motivo Recargo", field: "motivoRecargo" },
                                    { title: "Recargo Transporte CM Costo", field: "recargoTransporteCMCosto" },
                                    { title: "Recargo Transporte DM Costo", field: "recargoTransporteDMCosto" },
                                    { title: "Recargo Transporte CR Costo", field: "recargoTransporteCRCosto" },
                                    { title: "Recargo Transporte Otro Costo", field: "recargoTransporteOtroCosto" },
                                    { title: "Transporte Ciudad", field: "transporteCiudad" },
                                    { title: "Ciudad Principal Transporte", field: "ciudadPrincipalTransporte" },
                                    { title: "Otras Ciudades Transporte", field: "otrasCiudadesTransporte" },
                                    { title: "Utilidad", field: "utilidad" },
                                    { title: "Comision", field: "comision" },
                                    { title: "Dif Fotopolimero 1", field: "difFotopolimero1" },
                                    { title: "Dif Fotopolimero 2", field: "difFotopolimero2" },
                                    { title: "Dif Fotopolimero 3", field: "difFotopolimero3" },
                                    { title: "Dif Fotopolimero 4", field: "difFotopolimero4" },
                                    { title: "Dif Fotopolimero 5", field: "difFotopolimero5" },
                                    { title: "Dif Fotopolimero 6", field: "difFotopolimero6" },
                                    { title: "Dif Fotopolimero 7", field: "difFotopolimero7" },
                                    { title: "Dif Fotopolimero 8", field: "difFotopolimero8" },
                                    { title: "Dif Troquel 1", field: "difTroquel1" },
                                    { title: "Dif Troquel 2", field: "difTroquel2" },
                                    { title: "Dif Troquel 3", field: "difTroquel3" },
                                    { title: "Dif Troquel 4", field: "difTroquel4" },
                                    { title: "Dif Troquel 5", field: "difTroquel5" },
                                    { title: "Dif Troquel 6", field: "difTroquel6" },
                                    { title: "Dif Troquel 7", field: "difTroquel7" },
                                    { title: "Dif Troquel 8", field: "difTroquel8" },
                                    { title: "Ancho Hot Stamping", field: "anchoHotStamping" },
                                    { title: "Avance Real", field: "avanceReal" },
                                    { title: "Ciudad Envio", field: "ciudadEnvio" },
                                    { title: "Sherpa", field: "sherpa" },
                                    { title: "Material S", field: "materialS" },
                                    { title: "Acabado S", field: "acabadoS" },
                                    { title: "Valores Globales Length", field: "valoresGlobalesLength" },     
                                    {title: 'Ver', field: 'ver', formatter: function(cell, formatterParams, onRendered){
                                        // Crear el botón
                                        const button = document.createElement("button");
                                        button.className = "btn btn-success";
                                        button.innerHTML = `
                                            Ver Costos`;
                            
                                        // Agregar evento click al botón
                                        button.addEventListener("click", function() {
                                            const rowData = cell.getRow().getData(); // Obtener los datos de la fila actual
                                            vercostos(rowData)                                           
                                            // Aquí puedes agregar más lógica, como abrir un modal o redirigir a otra página
                                        });
                            
                                        // Devolver el botón con el SVG
                                        return button;
                                    }}   ,                    
                                    {title: 'Acciones', field: 'acciones', formatter: function(cell, formatterParams, onRendered){
                                        // Crear el botón
                                        const button = document.createElement("button");
                                        button.className = "btn btn-warning";
                                        button.innerHTML = `
                                            Editar <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil" class="svg-inline--fa fa-pencil " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>`;
                            
                                        // Agregar evento click al botón
                                        button.addEventListener("click", function() {
                                            const rowData = cell.getRow().getData(); // Obtener los datos de la fila actual
                                            editarCotizacion(rowData)                                           
                                            // Aquí puedes agregar más lógica, como abrir un modal o redirigir a otra página
                                        });
                            
                                        // Devolver el botón con el SVG
                                        return button;
                                    }}
                                ]}
                                data={allSolicitudes}
                                />

                    {mostrartabla && 
                    <div className="bg-success  top-50 start-50 translate-middle" style={{position:"fixed",width:"100vw",height:"100vh",zIndex:"300"}}>
                        <div className="bg-body rounded top-50 start-50 translate-middle p-4" style={{position:"fixed",width:"85vw",height:"80vh",zIndex:"400"}}>
                                    <button   onClick={()=>setMostrartabla(false)} style={{position:"absolute",top:8,right:8,width:"30px",height:"30px",display:"flex",alignItems:"center",alignContent:"center"}}><FontAwesomeIcon
                                        icon={faX}
                                        
                                        className=" my-auto mx-auto bg-body"
                                    
                                    /></button>
                                    <div className="mt-4 mb-4" style={{fontSize:"18px"}}>Resultados de la cotización</div>
                                    <TabulatorTable
                                        
                                        columns={[
                                        {title: 'Cotización',field:'coti'},
                                        {title:'Cantidad Etiquetas',field:'cantidadtd'},
                                        {title:'Costo Material',field:'materialValorpreciotd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Acabado',field:'acabadoValorpreciotd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Cold foild',field:'coldValorpreciotd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Maquina',field:'costoTotalMaquinatd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Horas Maquina',field:'horasMaquina'},
                                        {title:'Costo Graduación Planchas',field:'precioGraduacionPlanchastd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Cambio de plancha',field:'cambPlanchastd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Graduación P.A.R',field:'gradPARtd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Cambio de tintas',field:'cambiosTintastd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Prep. tintas',field:'prepTintastd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Planchas',field:'costoPlanchasporEtiquetatd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Tintas',field:'calcularValorTotalTintastd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo troquel',field:'costoTroqueltd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Terminación',field:'constoTerminacion',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        
                                        {title:'Cajas',field:'cajas',}
                                        ,{title:'Costo Transporte',field:'transporteCiudadpreciotd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Recargos',field:'recargoTrnsporteFtd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Sherpa',field:'precioSherpa',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                       
                                        {title:'Utilidad',field:'utilildadtd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Comisión',field:'comisiontd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        
                                        {title:'Costo Total',field:'costoTotaltd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                       
                                    ]}
                                    data={filtarCoti()}
                                    
                                    ></TabulatorTable>
                        </div>
                        
                    </div>
                    }

                    </div>
                </div>
            </div>
        </div>
        </div>

    }

    </>
  );
}

export default ListCotizaciones;
