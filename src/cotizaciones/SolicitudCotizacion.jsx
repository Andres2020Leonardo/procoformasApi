import {  useEffect, useState } from 'react'
import ClientAxios from '../config/ClientAxios';
import { useForm } from "react-hook-form";
import { Autocomplete, TextField } from '@mui/material';
import Decrypt from '../config/Decrypt';
import Alert from '../utils/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faX } from '@fortawesome/free-solid-svg-icons';
import CotizacionPDFViewer from '../utils/CotizacionPDFViewer';
const logo = "./img/cdpLogo2.png";
const SolicitudCotizacion=()=> {
        const [loadingIcon,setLoadingIcon] = useState(false);
        const [selectedUnidad, setSelectedUnidad] = useState('1');
        const [selectedUnidadGlobal, setSelectedUnidadGlobal] = useState('1');
        const [creada, setCreada] = useState(false);
        const [dateTimeExpired, setDateTimeExpired] = useState("");
        const [alert, setAlert] = useState({});
        const [allDatas,setAllDatas] =useState({})
        const [valueCold, setValueCold] = useState(null);
        const [valueMaterial, setValueMaterial] = useState(null);
        const [valueAcabado, setValueAcabado] = useState(null);
        const [valueProducto, setValueProducto] = useState(null);
        const [valueCiudad, setValueCiudad] = useState(null);
        const [valueCiudadAlls, setValueCiudadAlls] = useState([]);
        const [mostrarPdf,setMostrarPdf] = useState(false)
        const [cotizacion,setCotizacion] = useState(false)
        const [valueCiudadId, setValueCiudadId] = useState(null);
        const [valueAsesorId, setValueAsesorId] = useState(null);
        const [valueCliente, setValueCliente] = useState(null);
        const [valueClienteId, setValueClienteId] = useState(null);
        const {
            register,
            reset,
            setValue,
            handleSubmit,
            control,
            watch,
            formState: { errors },
          } = useForm({
            mode: "all",
           
            
          });
        const handleUnidadChange = (event) => {
            switch (event.target.value) {
                case "unidad_uinercaladas":
                    setSelectedUnidadGlobal("unidad_juegox2");  
                    setSelectedUnidad("unidad_uinercaladas")                  
                    setValue("unidad_seleccion","unidad_juegox2")
                    break;
                case "unidad_en_rollo":
                    setSelectedUnidadGlobal("unidad_mangas");
                    setSelectedUnidad("unidad_en_rollo")        
                    setValue("unidad_seleccion","unidad_mangas")
                    break;
                case "unidad_separados":
                    setSelectedUnidadGlobal("unidad_juegox2");
                    setSelectedUnidad("unidad_separados")  
                    setValue("unidad_seleccion","unidad_juegox2")
                    break;
                case "unidad_cortadas":
                    setSelectedUnidadGlobal("unidad_mangas");
                    setSelectedUnidad("unidad_cortadas")  
                    setValue("unidad_seleccion","unidad_mangas")
                    break;
                default: 
                    setSelectedUnidadGlobal(event.target.value);
                    break;
            }
        };
    
        
        const onSubmit = async (data) => {
            setLoadingIcon(true)
            try {
                
                const response = await ClientAxios.post(`/insertcotizacion`, data)
                
                if(response.data!=="Creación fallida."){
                    setCotizacion(response.data)
                    setMostrarPdf(true)
                }
                setAlert({
                    msg: "Creación exitosa",
                    error: false,
                  });
                
                setLoadingIcon(false)
                setCreada(true)
                console.log("Response Data:", response.data);
            } catch (error) {
                setAlert({
                    msg: error.data || "Error",
                    error: false,
                  });
                console.log(error)
                setLoadingIcon(false)
            }
          };
        
            
       
        

        const fecha= "";
  
        const fechaExpiracion=""
      
        
        function reload() {
            document.location.reload();
        }
        useEffect(() => {
            async function fetchData() {
              try {
                const response = await ClientAxios.post(
                  `/allDatasSoli`,   {}, 
                  {
                    headers: {
                      'User': Decrypt(localStorage.getItem("SesionToken")), 
                    }
                  }
                  
                );
                setAllDatas(response.data)
                
                console.log(response.data)
                const emailToken =Decrypt(localStorage.getItem("SesionToken"));                
                setValue('digitado',emailToken)
              } catch (error) {
                console.error('Error fetching data:', error);
              } finally {
              }
            }
          
            fetchData();   
          }, []);
        useEffect(() => {
            function fetchData() {
                if(valueCiudadId==null){
                    setValueCiudad(null);
                }
                if(allDatas?.ciudades){
                    
                    const ciudadSeleccionada = allDatas?.ciudades.find(ciudad => ciudad.id === valueCiudadId);
                    if (ciudadSeleccionada) {
                        setValueCiudad(ciudadSeleccionada);
                        setValue("ciudad_cliente", ciudadSeleccionada.id);
                    }
                }
               
            }
            fetchData();
        }, [valueCiudadId])
        const { msg } = alert;

        const fechaTime=new Date();
        const anio = fechaTime.getFullYear();
        const mes = ("0" + (fechaTime.getMonth() + 1)).slice(-2); // Los meses comienzan desde 0
        const dia = ("0" + fechaTime.getDate()).slice(-2);
        
        const fechaFormateada = `${anio}-${mes}-${dia}`;

        const nuevaFecha = new Date(fechaTime);
        nuevaFecha.setDate(nuevaFecha.getDate() + 30);

        // Formatear la nueva fecha
        const nuevoAnio = nuevaFecha.getFullYear();
        const nuevoMes = ("0" + (nuevaFecha.getMonth() + 1)).slice(-2);
        const nuevoDia = ("0" + nuevaFecha.getDate()).slice(-2);

        const nuevaFechaFormateada = `${nuevoAnio}-${nuevoMes}-${nuevoDia}`;
        setValue("fecha_vigencia", nuevaFechaFormateada);
  return (
    <>  
    {loadingIcon && <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-white" style={{height:"90%"}}   icon={faArrowsRotate}/></div>}
            
    
    {!allDatas?.clientes?<div className="navegadorOpenBody d-flex  h-100vh"><img
            className="mx-auto my-auto spin"
            src={logo}
            alt="Logo Argos"
          /></div>:<div className="navegadorOpenBody"  id="contenedorbody"  >
        <form  id="formularioCotizacion" method="POST" onSubmit={handleSubmit(onSubmit)} className="col-12 mx-auto" style={{display: "flex", flexDirection: "row"}}>
            <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>
                <div className="card scroll-divs-card mx-auto"  style={{pmarginBottom: "20px"}}>
                    <div className="card-body "  style={{zoom: "100% "}}>
                        <h3 className="col-12 " style={{textAlign: "center"}}>Solicitud de cotización</h3>
                        
                
                        <div className="col-12  h-100 p-1 " style={{display: "flex", flexDirection: "column"}}>
                            
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                                <div className="form-floating mx-auto p-1 col-4 " >
                                    <select className="form-select bg-secondary-subtle-r " id="tipo_cotizacion" {...register("tipo_cotizacion",{required:'campo requerido'})} aria-label="Tipo cotización">
                                        <option value={"N"} >Nueva</option>
                                        <option value={"R"}>Repetida</option>

                                    </select>
                                    <label style={{color:"#000000"}} htmlFor="tipo_cotizacion">Tipo</label>
                                </div>

                            

                                <div className="form-floating  mx-auto p-1 col-4" >
                                    <input type="date" className="form-control" value={fechaFormateada} id="fecha_cotizacion" {...register("fecha_cotizacion")} readOnly />
                                    <label style={{color:"#000000"}} htmlFor="fecha_cotizacion">Fecha</label>
                                </div>

                            
                                <div className="form-floating  mx-auto p-1 col-4">
                                    <input type="date" className="form-control" id="fecha_vigencia" {...register("fecha_vigencia")}  />
                                    <label style={{color:"#000000"}} htmlFor="fecha_vigencia">Vigencia</label>
                                </div>
                        

                            </div>
                        
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                            
                                    <div className="control-group form-floating  mx-auto p-1 col-3">
                                        
                                        
                                            {allDatas?.clientes?
                                            <Autocomplete
                                                className='shearchinputs'
                                                value={valueCliente}
                                                onChange={(event, newValue) => {setValueCliente(newValue);
                                                                                setValueClienteId(newValue?.id);
                                                                                setValue("cliente",newValue?.id);
                                                                                setValue("nombre_cliente",newValue?.razonSocial);
                                                                                setValue("nit_cliente",newValue?.id);
                                                                                setValue("ciudad_cliente",newValue?.ciudad);
                                                                                if(newValue?.ciudad){setValueCiudadId(newValue?.ciudad);}else{setValueCiudadId(null);}                                                                                
                                                                                setValue("telefono1",newValue?.telefono);
                                                                                setValue("telefono2",newValue?.telefono2);
                                                                                setValue("email",newValue?.email);
                                                                                setValue("contacto",newValue?.nombreContacto);
                                                                                setValue("direccion",newValue?.direccion);}}
                                                options={allDatas?.clientes}
                                                getOptionLabel={(option) => option.razonSocial}
                                                renderInput={(params) => <TextField {...params} required label="Seleccionar Cliente" />}
                                                isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                />:""}
                                    </div>




                            
                                <div className="form-floating  mx-auto p-1 col-3 " >
                                    <input type="text" className="form-control" id="nombre_cliente" {...register("nombre_cliente",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                    <label style={{color:"#000000"}} htmlFor="nombre_cliente" >Nombre cliente</label>
                                </div>
                            
                                <div className="form-floating  mx-auto p-1 col-3">
                                    <input type="text" className="form-control" id="nit_cliente" {...register("nit_cliente",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                    <label style={{color:"#000000"}} htmlFor="nit_cliente">Nit</label>
                                </div>
                            
                                <div className="form-floating mx-auto p-1 col-3" style={{paddingRight:"2px"}}>
                                    <select  defaultValue="Segun reglas de negocio" className="form-select bg-secondary-subtle-r" id="forma_pago" aria-label="forma_pago" {...register("forma_pago",{required:'campo requerido'})} >

                                        <option value={"Contado"}>Contado</option>
                                        <option value={"8 días"}>8 días</option>
                                        <option value={"15 días"}>15 días</option>
                                        <option value={"30 días"}>30 días</option>
                                        <option value={"45 días"}>45 días</option>
                                        <option value={"60 días"}>60 días</option>
                                        <option value={"90 días"}>90 días</option>
                                        <option value={"50% 50"}>50% 50%</option>
                                        <option value={"75 días"}>75 días</option>
                                        <option value={"Segun reglas de negocio"} >Segun reglas de negocio</option>

                                    </select>
                                    <label style={{color:"#000000"}} htmlFor="forma_pago">Forma de pago</label>
                                </div>
                            </div>
                            
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}} disabled={valueClienteId==1?false:true}>
                                
                                <div className="form-floating mx-auto p-1 col-3" >
                                {allDatas?.ciudades?
                                <Autocomplete
                                        className='shearchinputs'
                                        value={valueCiudad}
                                        onChange={(event, newValue) => {setValueCiudad(newValue);setValue("ciudad_cliente",newValue.id)}}
                                        options={allDatas?.ciudades}
                                        getOptionLabel={(option) => option.nombre}
                                        renderInput={(params) => <TextField {...params} required label="Seleccionar ciudad" />}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        disabled={valueClienteId==1?false:true}
                                        />
                                    
                                        :""}
                                        
                                    
                                    
                                </div>

                                
                                <div className="form-floating  mx-auto p-1 col-2" >
                                    <input type="text" className="form-control" id="telefono1" {...register("telefono1",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                    <label style={{color:"#000000"}} htmlFor="descripcion_producto">Teléfono</label>
                                </div>
                                
                                <div className="form-floating  mx-auto p-1 col-2" >
                                    <input type="text" className="form-control" id="telefono2" {...register("telefono2")} disabled={valueClienteId==1?false:true}/>
                                    <label style={{color:"#000000"}} htmlFor="descripcion_producto">Teléfono 2</label>
                                </div>
                            
                                <div className="form-floating  mx-auto p-1 col-5">
                                    <input type="email" className="form-control" id="email" {...register("email",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                    <label style={{color:"#000000"}} htmlFor="Existencia">Email</label>
                                </div>

                            </div>
                            
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                                <div className="form-floating col-12 mx-auto " >
                                    <div className="form-floating  mx-auto p-1" >
                                        <input type="text" className="form-control" id="contacto" {...register("contacto",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                        <label style={{color:"#000000"}} htmlFor="contacto">Contacto</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                                
                                <div className="form-floating   "  style={{width: "90% "}}>
                                    <div className="form-floating  mx-auto p-1" >
                                        <input type="text" className="form-control" id="direccion" {...register("direccion",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                        <label style={{color:"#000000"}} htmlFor="direccion">Direccion</label>
                                    </div>
                                </div>

                            </div>
                        
                            <br/>
                            <h5 className="col-12 zoom90" style={{textAlign: "center", textDecoration: "underline", }}>Descripción del producto</h5>
                        
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                                <div className="form-floating mx-auto p-1 col-6" >
                                {allDatas?.productos?
                                    <Autocomplete
                                        className='shearchinputs'
                                        value={valueProducto}
                                        onChange={(event, newValue) => {if(newValue!==null){setValueProducto(newValue);setValue("producto",newValue.id);setValue("descripcion_producto",newValue.nombre)}else{
                                            setValueProducto(null);setValue("producto",null);setValue("descripcion_producto","")
                                        }}}
                                        options={allDatas?.productos}
                                        getOptionLabel={(option) => `${option.codigo}`}
                                        renderInput={(params) => <TextField {...params} required label="Seleccionar producto" />}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        />
                                :""}
                                </div>

                            
                                <div className="form-floating  mx-auto p-1 col-6" >
                                    <input type="text" className="form-control" id="descripcion_producto" {...register("descripcion_producto")}/>
                                    <label style={{color:"#000000"}} htmlFor="descripcion_producto">Descripcion de producto</label>
                                </div>
                            
                                {/* <div className="form-floating  mx-auto p-1 col-3">
                                    <input type="text" className="form-control" id="Existencia" {...register("Existencia_producto")}/>
                                    <label style={{color:"#000000"}} htmlFor="Existencia">Existencia</label>
                                </div> */}

                            </div>
                        
                            <h6 className="col-12 zoom90 mt-2" style={{textAlign: "center", textDecoration: "none"}}>Unidad</h6>
                            <hr style={{marginTop: "-1px", border: "#ffffff 2px solid"}}/>
                        
                            <div className="col-12 zoom90 shadow-sm p-2 mb-2" style={{background: "#a5afb6",display: "flex", flexDirection: "column", border: "rgba(114,91,114,0.1) 1px solid", borderRadius: "15px"}}>
                            
                                <div className="form-floating mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                    <div className="form-check col-2 mx-auto ">
                                        <input className="form-check-input" type="radio"   {...register("unidad_seleccion",{required:'campo requerido'})} checked={selectedUnidadGlobal=="unidad_una"?true:false} id="unidad_una" value="unidad_una" onChange={()=>setSelectedUnidadGlobal("unidad_una")} />
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_una">
                                            Una
                                        </label>
                                    </div>
                                    <div className="form-check col-2 mx-auto">
                                        <input className="form-check-input" type="radio" {...register("unidad_seleccion")}  checked={selectedUnidadGlobal=="unidad_rollos"?true:false} id="unidad_rollos" value="unidad_rollos" onChange={()=>setSelectedUnidadGlobal("unidad_rollos")}/>
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_rollos">
                                            Rollos
                                        </label>
                                    </div>
                                    <div className="form-check col-2 mx-auto">
                                        <input className="form-check-input" type="radio"  {...register("unidad_seleccion")} checked={selectedUnidadGlobal=="unidad_juegox2"?true:false} id="unidad_juegox2" value="unidad_juegox2" onChange={()=>setSelectedUnidadGlobal("unidad_juegox2")}/>
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_juegox2">
                                            Juego x 2
                                        </label>
                                    </div>
                                    <div className="form-check col-2 mx-auto">
                                        <input className="form-check-input" type="radio"  {...register("unidad_seleccion")} checked={selectedUnidadGlobal=="unidad_mangas"?true:false} id="unidad_mangas" value="unidad_mangas" onChange={()=>setSelectedUnidadGlobal("unidad_mangas")}/>
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_mangas">
                                            Mangas
                                        </label>
                                    </div>
                                    <div className="form-check col-2 mx-auto">
                                        <input className="form-check-input" type="radio"  {...register("unidad_seleccion")} checked={selectedUnidadGlobal=="unidad_otra"?true:false} id="unidad_otra" value="unidad_otra"onChange={()=>setSelectedUnidadGlobal("unidad_otra")} />
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_otra" >
                                            Hojas
                                        </label>
                                    </div>

                                </div>
                                <div className="form-floating mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                    <div className="form-check col-2 mx-auto ">

                                    </div>
                                    <div className="form-check col-2 mx-auto">

                                    </div>
                                    <div className="form-check col-2 mx-auto">
                                        <input className="form-check-input" type="radio"   {...register("unidad_seleccion_juego2x2")} checked={selectedUnidad=="unidad_uinercaladas"?true:false} value="unidad_uinercaladas" id="unidad_uinercaladas" onChange={handleUnidadChange}/>
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_uinercaladas">
                                            Intercaladas
                                        </label>
                                    </div>
                                    <div className="form-check col-2 mx-auto">
                                        <input className="form-check-input" type="radio"   {...register("unidad_seleccion_mangas")} checked={selectedUnidad=="unidad_en_rollo"?true:false} value="unidad_en_rollo" id="unidad_en_rollo" onChange={handleUnidadChange}/>
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_en_rollo" >
                                            En Rollo
                                        </label>
                                    </div>
                                    <div className="form-check col-2 mx-auto" >
                                    
                                        <input type="text"   className="form-control" style={{background:"#ffffff"}}  id="unidad_otra_valor"   {...register("unidad_seleccion_otro")}  placeholder="Otra ..." onChange={handleUnidadChange}/>

                                    </div>


                                </div>
                                <div className="form-floating mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                    <div className="form-check col-2 mx-auto ">

                                    </div>
                                    <div className="form-check col-2 mx-auto">

                                    </div>
                                    <div className="form-check col-2 mx-auto">
                                        <input className="form-check-input" type="radio"  value="unidad_separados"  {...register("unidad_seleccion_juego2x2")} checked={selectedUnidad=="unidad_separados"?true:false} id="unidad_separados" onChange={handleUnidadChange}/>
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_separados">
                                            Separados
                                        </label>
                                    </div>
                                    <div className="form-check col-2 mx-auto">
                                        <input className="form-check-input" type="radio"  value="unidad_cortadas" {...register("unidad_seleccion_mangas")} checked={selectedUnidad=="unidad_cortadas"?true:false}  id="unidad_cortadas" onChange={handleUnidadChange}/>
                                        <label style={{color:"#000000"}} className="form-check-label" htmlFor="unidad_cortadas">
                                            Cortadas
                                        </label>
                                    </div>
                                    <div className="form-check col-2 mx-auto" >

                                    </div>
                                    
                                </div>



                            </div>
                        
                            <div className="col-12 zoom90 "style={{display: "flex", flexDirection: "row",height:"100px"}}>
                                <div className="form-floating  mx-auto p-1 col-3 " >
                                    <div className="form-control" id="divcheckratio" style={{display: "flex", flexDirection: "row", height: "100px",background: "#a5afb6",}}>
                                        <div className="form-check col-4">
                                            <input className="form-check-input" type="radio" {...register("grado_dificultad")} id="dificultadBaja" value="baja"/>
                                            <label style={{color:"#000000"}} className="form-check-label" htmlFor="dificultadBaja">
                                                Baja
                                            </label>
                                        </div>
                                        <div className="form-check col-4">
                                            <input className="form-check-input" type="radio" {...register("grado_dificultad")} id="dificultadMedia"  value="media"/>
                                            <label style={{color:"#000000"}} className="form-check-label" htmlFor="dificultadMedia">
                                                Media
                                            </label>
                                        </div>
                                        <div className="form-check col-4">
                                            <input className="form-check-input" type="radio" {...register("grado_dificultad")} id="dificultadAlta" defaultChecked value="alta"/>
                                            <label style={{color:"#000000"}} className="form-check-label" htmlFor="dificultadAlta">
                                                Alta
                                            </label>
                                        </div>
                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="divcheckratio">Grado de dificultad</label>
                                </div>
                            
                                <div className="form-floating mx-auto p-1 col-3 my-auto" >
                                    <input type="text" className="form-control" id="unidad_ref_distintas" {...register("unidad_ref_distintas",{required:'campo requerido'})}/>
                                    <label style={{color:"#000000"}} htmlFor="unidad_ref_distintas">Ref. distintas</label>
                                </div>

                            
                                <div className="form-floating  mx-auto  col-3 p-1"  >
                                    <div className="col-12 form-control" style={{height: "100px ", display: "flex", flexDirection: "row",background: "#a5afb6",}} id="divcambios">
                                        <div className="form-floating  mx-auto p-1 col-6" >
                                            <input type="text" className="form-control bgWhite"  id="unidad_planchas" {...register("unidad_planchas",{required:'campo requerido'})}/>
                                            <label style={{color:"#000000"}} htmlFor="unidad_planchas" className='bgWhiteA'>Planchas</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 col-6" >
                                            <input type="text" className="form-control bgWhite" id="unidad_tintas" {...register("unidad_tintas",{required:'campo requerido'})}/>
                                            <label style={{color:"#000000"}} htmlFor="unidad_tintas" className='bgWhiteA'>Tintas</label>
                                        </div>
                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="divcambios">Cambios</label>
                                </div>
                        
                                <div className="form-floating  mx-auto p-1 col-3 " >
                                    <div className="form-control" id="divcheckratio2" style={{display: "flex", flexDirection: "row", height: "100px ",background: "#a5afb6",}} >
                                        <div className="form-check col-4">
                                            <input className="form-check-input" type="radio" {...register("canidades_ref_son")} id="canidades_ref_son_iguales" defaultChecked value="iguales"/>
                                            <label style={{color:"#000000"}} className="form-check-label" htmlFor="canidades_ref_son_iguales">
                                                Iguales
                                            </label>
                                        </div>
                                        <div className="form-check col-4">
                                            <input className="form-check-input" type="radio" {...register("canidades_ref_son")} id="canidades_ref_son_dif"  value="diferentes"/>
                                            <label style={{color:"#000000"}} className="form-check-label" htmlFor="canidades_ref_son_dif">
                                                Diferentes
                                            </label>
                                        </div>

                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="divcheckratio2">Las cantidades por referencia son:</label>
                                </div>

                            </div>
                        
                            <h6 className="col-12 zoom90 mt-4" style={{textAlign: "center", textDecoration: "none"}}>Cotizar para una entrega</h6>
                            <hr style={{marginTop: "-1px", border: "#ffffff 2px solid"}}/>
                        
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                                <div className="form-floating  mx-auto  col-6 p-1"  >
                                    <div className="col-12 form-control" style={{background: "#a5afb6", height: "auto ", display: "flex", flexDirection: "column"}} id="divcantidad" >
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <label className="my-auto  col-2 " style={{fontSize: "20px", marginLeft: "5%",color:"#000000"}}>1</label><input type="text" className="form-control  bgWhite"  id="cantidad1" {...register("cantidad1",{required:'campo requerido'})}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <label className="my-auto  col-2 " style={{fontSize: "20px", marginLeft: "5%",color:"#000000"}}>2</label><input type="text" className="form-control  bgWhite"  id="cantidad2" {...register("cantidad2")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12 " style={{display: "flex", flexDirection: "row"}} >
                                            <label className="my-auto  col-2 " style={{fontSize: "20px", marginLeft: "5%",color:"#000000"}}>3</label><input type="text" className="form-control  bgWhite"  id="cantidad3" {...register("cantidad3")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <label className="my-auto  col-2 " style={{fontSize: "20px", marginLeft: "5%",color:"#000000"}}>4</label><input type="text" className="form-control  bgWhite"  id="cantidad4" {...register("cantidad4")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <label className="my-auto  col-2 " style={{fontSize: "20px", marginLeft: "5%",color:"#000000"}}>5</label><input type="text" className="form-control  bgWhite"  id="cantidad5" {...register("cantidad5")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <label className="my-auto  col-2 " style={{fontSize: "20px", marginLeft: "5%",color:"#000000"}}>6</label><input type="text" className="form-control  bgWhite"  id="cantidad6" {...register("cantidad6")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <label className="my-auto  col-2 " style={{fontSize: "20px", marginLeft: "5%",color:"#000000"}}>7</label><input type="text" className="form-control  bgWhite"  id="cantidad7" {...register("cantidad7")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <label className="my-auto  col-2 " style={{fontSize: "20px", marginLeft: "5%",color:"#000000"}}>8</label><input type="text" className="form-control  bgWhite"  id="cantidad8" {...register("cantidad8")}/>

                                        </div>
                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="divcantidad" >Cantidad</label>
                                </div>
                                <div className="form-floating  mx-auto  col-6 p-1"  >
                                    <div className="col-12 form-control" style={{background: "#a5afb6", height: "auto ",display: "flex", flexDirection: "column"}} id="diventragas">
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <input type="text" className="form-control  bgWhite"  id="entrega1" {...register("entrega1",{required:'campo requerido'})}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <input type="text" className="form-control  bgWhite"  id="entrega2" {...register("entrega2")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <input type="text" className="form-control  bgWhite"  id="entrega3" {...register("entrega3")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <input type="text" className="form-control  bgWhite"  id="entrega4" {...register("entrega4")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <input type="text" className="form-control  bgWhite"  id="entrega5" {...register("entrega5")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <input type="text" className="form-control  bgWhite"  id="entrega6" {...register("entrega6")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <input type="text" className="form-control  bgWhite"  id="entrega7" {...register("entrega7")}/>

                                        </div>
                                        <div className="  mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}} >
                                            <input type="text" className="form-control  bgWhite"  id="entrega8" {...register("entrega8")}/>

                                        </div>
                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="diventragas" > Entregas</label>
                                </div>
                            
                            </div>
                            <div className="col-12 zoom90 mt-3"style={{display: "flex", flexDirection: "row"}}>
                                <div className="form-floating mx-auto p-1 col-12 " >
                                    <textarea className="form-control bg-secondary-subtle-r" placeholder="Leave a comment here" id="observaciones" {...register("observaciones")} style={{height: "150px "}}></textarea>
                                    <label style={{color:"#000000"}} htmlFor="observaciones">Observaciones</label>

                                </div>
                            </div>
                        
                            <h6 className="col-12 zoom90 mt-2" style={{textAlign: "center", textDecoration: "none"}}><b>Especificaciones</b></h6>
                            <hr style={{marginTop: "-1px", border: "#ffffff 2px solid"}} />
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                                <div className="form-floating mx-auto p-1 col-3 " >
                                    <select className="form-select bg-secondary-subtle-r" id="aplicacion_especificaciones" {...register("aplicacion_especificaciones",{required:'campo requerido'})} aria-label="aplicacion">
                                        <option value="M" >Manual</option>
                                        <option value="A">Automática</option>

                                    </select>
                                    <label style={{color:"#000000"}} htmlFor="tipo_cotizacion">Aplicación</label>
                                </div>

                            
                                <div className="form-floating  mx-auto p-1 col-3" >
                                    <input type="number" className="form-control" id="ancho_espe" {...register("ancho_espe",{required:'campo requerido'})}/>
                                    <label style={{color:"#000000"}} htmlFor="ancho_espe">Ancho (cms)</label>
                                </div>

                            
                                <div className="form-floating  mx-auto p-1 col-3" >
                                    <input type="number" className="form-control" id="avance_espe" {...register("avance_espe",{required:'campo requerido'})}/>
                                    <label style={{color:"#000000"}} htmlFor="avance_espe">Avance (cms)</label>
                                </div>
                            
                                <div className="form-floating mx-auto p-1 col-3" style={{paddingRight:"2px"}}>
                                    <select className="form-select bg-secondary-subtle-r" id="troquel" {...register("troquel",{required:'campo requerido'})} aria-label="troquel">
                                        <option value="Existe" >Existe</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Ninguno">Ninguno</option>
                                        <option value="Nuevo especial">Nuevo especial</option>

                                    </select>
                                    <label style={{color:"#000000"}} htmlFor="troquel">Troquel</label>
                                </div>
                            </div>
                            
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row", height: "65px"}}>
                            
                                <div className="form-floating mx-auto p-1 col-4 mt-2" >
                                {allDatas?.materials?
                                <Autocomplete
                                    className='shearchinputs'
                                    value={valueMaterial}
                                    onChange={(event, newValue) => {if(newValue!==null){setValueMaterial(newValue);setValue("material",newValue.id)}else{setValueMaterial(null);setValue("material",null)}}}
                                    options={allDatas?.materials}
                                    getOptionLabel={(option) => option.material}
                                    renderInput={(params) => <TextField {...params} required label="Seleccionar material" />}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    />:""}
                                    
                                </div>

                            
                                <div className="form-floating mx-auto p-1 col-4 mt-2" >
                                {allDatas?.acabados?
                                <Autocomplete
                                    className='shearchinputs'
                                    value={valueAcabado}
                                    onChange={(event, newValue) => {if(newValue!==null){setValueAcabado(newValue);setValue("acabado",newValue.id)}else{setValueAcabado(null);setValue("acabado",null)}}}
                                    options={allDatas?.acabados}
                                    getOptionLabel={(option) => option.acabado}
                                    renderInput={(params) => <TextField {...params} label="Seleccionar acabado" />}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    />:""}
                                
                                </div>
                        
                                <div className="form-floating mx-auto p-1 col-4 mt-2" >
                                    {allDatas?.coldFoilds?
                                <Autocomplete
                                    className='shearchinputs'
                                    value={valueCold}
                                    onChange={(event, newValue) => {if(newValue!==null){setValueCold(newValue);setValue("cold_foild",newValue.id)}else{setValueAcabado(null);setValue("cold_foild",null)}}}
                                    options={allDatas?.coldFoilds}
                                    getOptionLabel={(option) => option.coldFoild}
                                    renderInput={(params) => <TextField {...params} label="Seleccionar Cold Foild" />}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    />:""}
                                
                                </div>

                            </div>
                            <h6 className="col-12 zoom90 mt-2" style={{textAlign: "center", textDecoration: "none"}}>Impresion</h6>
                            <hr style={{marginTop: "-1px", border: "#ffffff 2px solid"}}/>
                        
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                        
                                <div className="form-floating  mx-auto  col-3 p-1 "  >
                                    <div className="col-12 form-control bg-secondary-subtle-r" style={{height: "100px ", display: "flex", flexDirection: "row"}} id="divcambiosTintas">
                                        <div className="my-auto  mx-auto p-1 col-6" >
                                            <input type="text" style={{background:"#ffffff"}} className="form-control" id="T1" {...register("T1",{required:'campo requerido'})}/>

                                        </div>
                                        <b className="my-auto" style={{fontSize: "18px"}}>X</b>
                                        <div className="my-auto  mx-auto p-1 col-6" >
                                            <input type="text" style={{background:"#ffffff"}} className="form-control" id="T2" {...register("T2")}/>

                                        </div>
                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="divcambiosTintas">Tintas</label>
                                </div>
                                <div className="form-floating  mx-auto  col-4 p-1" style={{display: "flex", flexDirection: "column"}} >
                                
                                    <div className="col-12 form-control bg-secondary-subtle-r "  style={{height: "100px ", display: "flex", flexDirection: "column"}} id="divtintas">
                                        <div className="form-floating mx-auto p-1 col-12 " style={{display: "flex", flexDirection: "row"}}>
                                            <div className="form-check col-6 mx-auto">
                                                <input className="form-check-input" type="checkbox" {...register("base_agua_tipo_tinta")} id="base_agua_tipo_tinta"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="base_agua_tipo_tinta">
                                                    Base Agua
                                                </label>
                                            </div>
                                            <div className="form-check col-6 mx-auto">
                                                <input className="form-check-input" type="checkbox" {...register("metalizada_tipo_tinta")} id="metalizada_tipo_tinta"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="metalizada_tipo_tinta">
                                                    Metalizada
                                                </label>
                                            </div>


                                        </div>

                                        <div className="form-floating mx-auto p-1 col-12" style={{display: "flex", flexDirection: "row"}}>
                                            <div className="form-check col-6 mx-auto">
                                                <input className="form-check-input" type="checkbox" {...register("uv_tipo_tinta")} id="uv_tipo_tinta"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="uv_tipo_tinta">
                                                    UV
                                                </label>
                                            </div>
                                            <div className="form-check col-6 mx-auto">
                                                <input className="form-check-input" type="checkbox" {...register("fluorescentes_tipo_tinta")} id="fluorescentes_tipo_tinta"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="fluorescentes_tipo_tinta">
                                                    Fluorescentes
                                                </label>
                                            </div>


                                        </div>
                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="divtintas">Tipos de tintas</label>


                                </div>


                            
                                <div className="form-floating  mx-auto p-1 col-2">
                                    <input type="text" className="form-control" id="cubrimiento" {...register("cubrimiento")} value="100" style={{height: "100px "}} />
                                    <label style={{color:"#000000"}} htmlFor="cubrimiento">cubrimiento (%)</label>
                                </div>
                                <div className="form-floating mx-auto p-1 col-3" >
                                    <select className="form-select bg-secondary-subtle-r" id="tintas_respaldo" {...register("tintas_respaldo")} aria-label="tintas_respaldo" style={{height: "100px "}} >
                                        <option value="N" >Ninguna</option>
                                        <option value="L" >Liner</option>
                                        <option value="A" >Adhesivo</option>

                                    </select>
                                    <label style={{color:"#000000"}} htmlFor="tintas_respaldo">Tintas del repaldo en</label>
                                </div>

                            </div>
                        
                            <h6 className="col-12 zoom90 mt-2" style={{textAlign: "center", textDecoration: "none"}}>Impresion variable</h6>
                            <hr style={{marginTop: "-1px", border: "#ffffff 2px solid"}}/>
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                                <div className="form-floating  mx-auto  col-12 p-1 " style={{display: "flex", flexDirection: "row"}} >
                                
                                    <div className="col-12 form-control bg-secondary-subtle-r" style={{height: "80px ",display: "flex", flexDirection: "row"}} id="divcintas">

                                        <div className="form-floating p-1 col-7 mx-2 " style={{display: "flex", flexDirection: "row", border: "#425fa0 1px solid", borderRadius: "7px"}}>

                                            <div className="form-check col-3 mx-auto my-auto ml-2">
                                                <input className="form-check-input" type="radio" {...register("cinta")} id="cinta_Cera" value="cera"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="cinta_Cera">
                                                    Cera
                                                </label>
                                            </div>
                                            <div className="form-check col-3 mx-auto my-auto">
                                                <input className="form-check-input" type="radio" {...register("cinta")} id="cinta_Resina" value="resina"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="cinta_Resina">
                                                    Resina
                                                </label>
                                            </div>
                                            <div className="form-check col-3 mx-auto my-auto">
                                                <input className="form-check-input" type="radio" {...register("cinta")} id="cinta_cR" value="resina_cera"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="cinta_cR">
                                                    Cera Resina
                                                </label>
                                            </div>
                                            <div className="form-check col-3 mx-auto my-auto">
                                                <input className="form-check-input" type="radio" {...register("cinta")} id="cinta_ning" defaultChecked="True" value="Ninguna"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="cinta_ning">
                                                    Ninguna
                                                </label>
                                            </div>


                                        </div>

                                        <div className="form-control" id="divcheckratio3 col-4" style={{display: "flex", flexDirection: "row", background: "#a5afb6"}}>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="radio" {...register("tipo_cinta")} id="cinta_fija" defaultChecked="" value="fija"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="cinta_fija">
                                                    Fija
                                                </label>
                                            </div>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="radio" {...register("tipo_cinta")} id="cinta_variable" value="Varibles"/>
                                                <label style={{color:"#000000"}} className="form-check-label" htmlFor="canidades_ref_son_dif">
                                                    Variable
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="divcintas"></label>


                                </div>

                            </div>
                    

                            <h6 className="col-12 zoom90 mt-2" style={{textAlign: "center", textDecoration: "none"}}>Presentacion, empaque y entrega</h6>
                            <hr style={{marginTop: "-1px", border: "#ffffff 2px solid"}}/>
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                                <div className="form-floating  mx-auto  col-12 p-1 " style={{display: "flex", flexDirection: "row"}} >
                                
                                    <div className="col-12 form-control bg-secondary-subtle-r" style={{height: "auto ", display: "flex", flexDirection: "row"}} id="divcintas">


                                        <div className="form-control" id="divcheckratio3" style={{display: "flex", flexDirection: "row", background: "#a5afb6"}}>
                                            <div className="form-control p-1 m-1" style={{background: "transparent ", border: "none"}}>
                                                <div className="form-check col-6">
                                                    <input className="form-check-input" type="radio" {...register("presentacion_rollos")} id="presentacion_rollos" value="rollos"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="presentacion_rollos">
                                                        En rollos
                                                    </label>

                                                </div>
                                                <div className="form-control m-1" style={{display: "flex", flexDirection: "row"}}>
                                                    <div className="form-floating  mx-auto p-1 col-3">
                                                        <input type="number" className="form-control" id="rollos_por" {...register("rollos_por")}/>
                                                        <label style={{color:"#000000"}} htmlFor="rollos_por">Rollos por (Etiqs.)</label>
                                                    </div>
                                                    <div className="form-floating  mx-auto p-1 col-3">
                                                        <input type="number" className="form-control" id="etiq_ancho" {...register("etiq_ancho")}/>
                                                        <label style={{color:"#000000"}} htmlFor="etiq_ancho">Etiq. Ancho</label>
                                                    </div>
                                                    <div className="form-floating mx-auto p-1 col-3" >
                                                        <select className="form-select bg-secondary-subtle-r" id="core" {...register("core")} aria-label="core"  >
                                                            <option value="N" >Ninguna</option>
                                                            <option value="L" >Liner</option>
                                                            <option value="A" >Adhesivo</option>

                                                        </select>
                                                        <label style={{color:"#000000"}} htmlFor="core">Core <b>∅</b></label>
                                                    </div>
                                                    <div className="form-floating  mx-auto p-1 col-3">
                                                        <input type="number" className="form-control" id="posicion_presentacion" {...register("posicion_presentacion")}/>
                                                        <label style={{color:"#000000"}} htmlFor="posicion_presentacion">Posición</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-control p-1 m-1" style={{background: "transparent ", border: "none"}}>
                                                <div className="form-check col-6">
                                                    <input className="form-check-input" type="radio" {...register("presentacion")} id="presentacion_hojas" value="hojas"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="presentacion_hojas">
                                                        En hojas
                                                    </label>

                                                </div>
                                                <div className="form-control m-1" style={{display: "flex", flexDirection: "row"}}>
                                                    <div className="form-floating  mx-auto p-1 col-5">
                                                        <input type="number" className="form-control" id="etiquetas_hoja" {...register("etiquetas_hoja")}/>
                                                        <label style={{color:"#000000"}} htmlFor="etiquetas_hoja">Etiquetas por Hoja</label>
                                                    </div>
                                                    <div className="form-floating  mx-auto p-1 col-5">
                                                        <input type="number" className="form-control" id="hojas_paquete" {...register("hojas_paquete")}/>
                                                        <label style={{color:"#000000"}} htmlFor="hojas_paquete">Hojas por paquete</label>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <label style={{color:"#000000"}} htmlFor="divcintas"></label>


                                </div>

                            </div>
                            <h6 className="col-12 zoom90 mt-2" style={{textAlign: "center", textDecoration: "none"}}>Entregas en</h6>
                            <hr style={{marginTop: "-1px", border: "#ffffff 2px solid"}}/>
                        
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                            
                                <div className="form-floating  mx-auto p-1 col-3">
                                    <input type="number" className="form-control" id="ciudades_entrega" {...register("ciudades_entrega")}/>
                                    <label style={{color:"#000000"}} htmlFor="ciudades_entrega">Ciudades</label>
                                </div>

                        
                                <div className="form-floating mx-auto p-1 col-9" style={{paddingRight:"2px"}}>
                                
                                    {allDatas?.ciudades?
                                    <Autocomplete
                                        className='shearchinputs'
                                        value={valueCiudadAlls}
                                        onChange={(event, newValue) => {setValueCiudadAlls(newValue);setValue("ciudad_entrega",valueCiudadAlls.map(item => item.id))}}
                                        options={allDatas?.ciudades}
                                        getOptionLabel={(option) => option.nombre}
                                        renderInput={(params) => <TextField {...params}  label="Seleccionar puntos de entrega" />}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        multiple
                                    />
                                
                                :""}
                                </div>

                            </div>
                        
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                        
                                <div className="form-floating  mx-auto p-1 col-5">
                                {allDatas?.users?
                                <Autocomplete
                                        className='shearchinputs'
                                        value={valueAsesorId}
                                        onChange={(event, newValue) => {setValueAsesorId(newValue);setValue("asesor",newValue.id)}}
                                        options={allDatas?.users}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params}  label="Seleccionar Asesor" />}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        
                                        />
                                    
                                        :""}
                       
                                </div>
                                <div className="form-floating  mx-auto p-1 col-2">
                                    <input type="text" className="form-control" id="comision" {...register("comision")} value="3"/>
                                    <label style={{color:"#000000"}} htmlFor="comision">Comisión (%)</label>
                                </div>
                            
                                <div className="form-floating mx-auto p-1 col-2" style={{paddingRight:"2px"}}>
                                    <select className="form-select bg-secondary-subtle-r" id="tipo_asesor" {...register("tipo_asesor")} aria-label="tipo_asesor">
                                        <option value="" ></option>
                                        <option value="Nuevo">Propio</option>
                                        <option value="Ninguno">Externo</option>

                                    </select>
                                    <label style={{color:"#000000"}} htmlFor="">Tipo</label>
                                </div>
                                <div className="form-floating  mx-auto p-1 col-3">
                                    <input type="text" readOnly className="form-control hidden" id="digitado" {...register("digitado")} />
                                    <input type="text" readOnly className="form-control"  value={Decrypt(localStorage.getItem("NameToken"))} />
                                   
                                </div>
                            

                            </div>
                            <br/>
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                                {!creada?<input className="btn btn-success mx-auto  my-auto" type="submit" value="Guardar Cotización" onClick={handleSubmit(onSubmit)}/>
                                 : 
                                            <input className="btn btn-success mx-auto  my-auto" type="button" value="Nueva Cotización" onClick={()=>reload}/>
                                
                                }
                                   

                            </div>
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>{msg && <Alert  alert={alert} setAlert={setAlert} />} </div>
                            

                        </div>



                    </div>
                </div>
            </div>
        </form>
        {mostrarPdf && 
                    <div className="bg-success  top-50 start-50 translate-middle" style={{position:"fixed",width:"100vw",height:"100vh",zIndex:"300"}}>
                        <div className="bg-body rounded top-50 start-50 translate-middle p-4" style={{position:"fixed",width:"85vw",height:"80vh",zIndex:"400"}}>
                                    <button   onClick={()=>setMostrarPdf(false)} style={{position:"absolute",top:8,right:8,width:"30px",height:"30px",display:"flex",alignItems:"center",alignContent:"center"}}><FontAwesomeIcon
                                        icon={faX}
                                        
                                        className=" my-auto mx-auto bg-body"
                                    
                                    /></button>
                                    <div className="mt-4"></div>
                                    <CotizacionPDFViewer cotizacion={cotizacion}></CotizacionPDFViewer>
                        </div>
                    </div>}
            </div>
                                    }



    </>
  );
}

export default SolicitudCotizacion;
