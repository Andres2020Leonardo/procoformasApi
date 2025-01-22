import React, { useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import config from "../config/config";
import TabulatorTable from "../utils/TabulatorTable";
import Decrypt from "../config/Decrypt";
import { useForm } from "react-hook-form";
const logo = "./img/cdpLogo2.png";
const Ingreso = () => {
  const [allDatas,setAllDatas] =useState({});
  const [update,setUpdate] =useState(false);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({defaultValues:{
   
  }});
  useEffect(() => {
    async function fetchData() {
      try {        
         
       
        const response = await ClientAxios.post(
            `/allDatasSoli`,   {}, 
            {
              headers: {
                'User': Decrypt(localStorage.getItem("SesionToken"))
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
  }, [update]);
  function buscaMaterialPorId(id) {    
    let material = allDatas.materials.find(material => parseInt(material.id) === parseInt(id));
    return material;
  }
  function buscaAcabadoPorId(id) {    
    let acabado = allDatas.acabados.find(acabado => parseInt(acabado.id) === parseInt(id));
    return acabado;
  }
  function buscaColdPorId(id) {    
    let coldFoild = allDatas.coldFoilds.find(coldFoild => parseInt(coldFoild.id) === parseInt(id));
    return coldFoild;
  }
  async function buscarCotizacion(data) {
    try {        
        
        console.log(data);
        const response = await ClientAxios.post(
          `/buscarCotizaciones`,   data, 
          {
            headers: {
              'User': Decrypt(localStorage.getItem("SesionToken"))
            }
          }
          
        );
        console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  }
  return (<>

    {!allDatas?.clientes?<div className="navegadorOpenBody d-flex  h-100vh"><img
        className="mx-auto my-auto spin"
        src={logo}
        alt="Logo Argos"
      /></div>:
    <div id="contenedorbody" className="navegadorOpenBody">
        <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>
            <div className="card scroll-divs-card mx-auto"  style={{marginBottom: "20px"}}>
                <div className="card-body" >
                        <h4 className="col-12 mb-4" style={{textAlign: 'center'}}>Ingreso de orden de producción</h4>
                        <div className="col-12 ">
                            <div className="col-12">
                                


                                <div className="row displayblockb" id="buscarFlexo" style={{marginBottom: '-30px !important', marginLeft: '1px'}}>
                                    <form id="formbuscarFlexo" method="POST" className="col-3">
                                        <div className="input-group ">

                                            <input type="text" className="form-control inputActiveCDP" {...register("id_cotizacion")}/>
                                            <div className="">
                                                <button onClick={()=>buscarCotizacion(watch())} className="btn btn-outline-success" style={{borderRadius:"0",borderEndEndRadius:"5px",borderTopRightRadius:"5px",height:'100%'}} type="button" id="button-search"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                                                        </path>
                                                    </svg></button>

                                            </div>

                                        </div>
                                        <small className="form-text text-muted ml-1">Buscar cotización</small>
                                    </form>
                                    <div className="col-3">
                                        <select name="tipo_ordenflexob" className="form-control inputActiveCDP" id="tipo_ordenflexob" required="">
                                            <option value="0">Tipo de orden </option>
                                            <option style={{color: 'red'}} value="Nuevo Arte">Nuevo Arte</option>
                                            <option value="Nuevo Arte (Sin preprensa)">Nuevo Arte (Sin preprensa)</option>
                                            <option value="Repeticion Exacta">Repeticion Exacta</option>
                                            <option style={{color: 'red'}} value="Repeticion Modificada">Repeticion Modificada</option>
                                            <option value="Repeticion Modificada (Sin preprensa)">Repeticion Modificada (Sin preprensa)
                                            </option>
                                        </select>
                                        <small className="form-text text-muted ml-1">Tipo de orden</small>
                                    </div>
                                    <form id="formbuscarFlexo" method="POST" className="col-3">
                                        <div className="input-group ">

                                            <input type="text" name="codigo_interno_b" id="codigo_interno_b" className="form-control inputActiveCDP" placeholder="Código interno" required=""/>
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-success" type="submit" id="button-search"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                                                        </path>
                                                    </svg></button>

                                            </div>

                                        </div>
                                        <small className="form-text text-muted ml-1">Código interno</small>
                                    </form>

                                    <div className="col-3 displaynone" id="formbuscarFlexoButton">

                                        <input type="text" name="codigo_interno_b_1" id="codigo_interno_b_1" className="form-control inputActiveCDP" placeholder="Código interno" required=""/>
                                        <small className="form-text text-muted ml-1">Código interno</small>

                                    </div>
                                


                                    <div className="col-3">
                                        
                                        <input type="text" name="ocb" id="ocb" className="form-control inputActiveCDP" placeholder="Orden de compra" required=""/>
                                        <small className="form-text text-muted ml-1">Orden compra</small>
                                        
                                        
                                        
                                        <input style={{display: 'none'}} type="date" name="fecha_oc" id="fecha_oc" className="form-control itenFecha inputActiveCDP" placeholder="Fecha Orden Compra" value="2024-11-17" required=""/>
                                        
                                    </div>
                                    <div className="col-3">
                                        
                                        <input style={{fontWeight: 'bold'}} type="text" name="pedidob" id="pedidob" className="form-control inputActiveCDP" placeholder="Pedido" value="70244" required=""/>
                                        <small className="form-text text-muted">Pedido</small>
                                    </div>
                                </div>
                                <form  method="POST" name="FormularioCiclo" id="formularioComercial" style={{display: 'block'}}>
                                                        
                                    <input style={{display: 'none'}} type="date" name="fecha_pedido" className="form-control itenFecha inputActiveCDP" placeholder="Fecha OC" value="2024-11-17" readonly="" required=""/>
                                    <input style={{display: 'none'}} type="time-local" name="hora_actual_comercial" className="form-control fecha_recibido" required="" readonly=""/>
                                    <input type="hidden" id="cantidad_fotopolimeros" name="cantidad_fotopolimeros" value="0"/>
                                    

                                    
                                    

                                    <div style={{border: '1px solid rgba(128, 128, 128, 0.466)', display: 'none'}} className="form-control alert-warning" id="relojnumerico" onload="cargarReloj();">06:11:40 PM</div>

                                

                                    <input style={{display: 'none'}} type="date" name="fecha_op" className="form-control itenFecha border-primary" value="2024-11-17" required="" readonly=""/>
                                    

                                    <input style={{display: 'none'}} type="time-local" name="hora_op" className="form-control border-primary hora_op" required="" readonly=""/>
                                    
                                

                                    <div className="comercial">
                                        <input type="hidden" name="ultimo_usuario_modificacion" className="inputActiveCDP form-control" placeholder="Usuarios" readonly="" value="Programador Procoformas"/>
                                        <div className="row">
                                                <div className="">
                                                    
                                                    <input style={{fontWeight: 'bold', outline: 'none', display: 'none'}} type="number" name="id" className="form-control" placeholder="Pedido" value="34051" required="" readonly=""/>
                                                    
                                                    <input type="hidden" min="1" max="9999" id="cliente_codigo" name="cliente" className="form-control inputActiveCDP" placeholder="Código" autofocus="" required=""/>
                                                
                                                </div>

                                            <div className="container-fluid">
                                                <div className="row mt-3">
                                                    <div className="col-3 d-none">
                                                        
                                                        <input type="text" name="oc" id="oc" className="form-control inputActiveCDP" placeholder="Orden de compra" required=""/>
                                                        <small className="form-text text-muted ml-1">Orden compra</small>
                                                        
                                                        
                                                        
                                                        <input style={{display: 'none'}} type="date" name="fecha_oc" id="fecha_oc" className="form-control itenFecha inputActiveCDP" placeholder="Fecha Orden Compra" value="2024-11-17" required=""/>
                                                        
                                                    </div>
                                                    <div className="col-2 d-none">
                                                        
                                                        <input style={{fontWeight: 'bold'}} type="text" name="pedido" id="pedido" className="form-control inputActiveCDP" placeholder="Pedido" value="70244" required=""/>
                                                        <small className="form-text text-muted">Pedido</small>
                                                    </div>



                                                </div>
                                                <div className="row mt-3">
                                                    
                                                </div>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <select name="ciudad" className="form-control form-select select2-hidden-accessible" id="ciudad" required="" style={{width: '100% !important'}} data-select2-id="select2-data-ciudad" tabindex="-1" aria-hidden="true">
                                                        <option value="ciudad" selected="" data-select2-id="select2-data-2-0st5">Ciudad</option>                                                                                                  
                                                        </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-1-ied6" style={{width: '100%'}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-ciudad-container" aria-controls="select2-ciudad-container"><span className="select2-selection__rendered" id="select2-ciudad-container" role="textbox" aria-readonly="true" title="Ciudad">Ciudad</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        <small className="form-text text-muted ml-1">Ciudad</small>
                                                    </div>
                                                    <div className="col-4">

                                                        <select name="comentario_orden" className="form-control inputActiveCDP" id="comentario_orden" required="">
                                                            <option value="Comentario">Comentario </option>
                                                            <option value="APROBACIÓN EN MAQUINA">APROBACIÓN EN MAQUINA</option>
                                                            <option value="APROBACIÓN EN MAQUINA- URGENTE">APROBACIÓN EN MAQUINA-
                                                                URGENTE</option>
                                                            <option value="URGENTE">URGENTE</option>
                                                            <option value="EN CONSIGNACIÓN">EN CONSIGNACIÓN</option>
                                                            <option value="COLORES SEGÚN MUESTRA FÍSICA">COLORES SEGÚN MUESTRA
                                                                FÍSICA</option>
                                                            <option value="SHERPA PARA COLOR">SHERPA PARA COLOR</option>
                                                            <option value="APROBACIÓN EN MAQUINA- SHERPA">APROBACIÓN EN MAQUINA- SHERPA
                                                            </option>
                                                            <option value="SHERPA PARA COLOR- URGENTE">SHERPA PARA COLOR- URGENTE
                                                            </option>
                                                            <option value="COLORES S/MUESTRA- URGENTE">COLORES S/MUESTRA- URGENTE
                                                            </option>
                                                            <option value="GARANTIZAR TONOS YA TRABAJADOS">GARANTIZAR
                                                                TONOS YA TRABAJADOS</option>
                                                            <option value="CINTA RESINA">CINTA RESINA</option>
                                                            <option value="CINTA CERA RESINA">CINTA CERA RESINA</option>
                                                            <option value="CINTA CERA">CINTA CERA</option>
                                                            <option value="GARANTIZAR TONOS DEL ARTE APROBADO">GARANTIZAR TONOS DEL
                                                                ARTE APROBADO</option>
                                                            <option value="ENVIAR REGISTRO FOTOGRAFICO">ENVIAR REGISTRO FOTOGRAFICO
                                                            </option>
                                                            <option value="N/A">N/A</option>
                                                        </select>
                                                        <small className="form-text text-muted ml-1">Comentario</small>


                                                    </div>
                                                    <div className="col-2">
                                                        
                                                        <input type="number" name="numero_entregas" id="numero_entregas" className="form-control inputActiveCDP" placeholder="Entregas" required=""/>
                                                        <small className="form-text text-muted">Entregas</small>
                                                    </div>

                                                    <div className="col-3">
                                                        
                                                        <select className="form-control inputActiveCDP" name="troquel" id="troquel" required="">
                                                            <option value="">Seleccionar Troquel</option>
                                                            <option value="Flexible Existente">FLEXIBLE EXISTENTE</option>
                                                            <option value="Plano Existente">PLANO EXISTENTE</option>
                                                            <option style={{color: 'red'}} value="Troquel Nuevo Flexible">TROQUEL NUEVO
                                                                FLEXIBLE</option>
                                                            <option style={{color: 'red'}} value="Troquel Nuevo Plano">TROQUEL NUEVO PLANO
                                                            </option>
                                                            <option value="PAR">PAR</option>
                                                            <option value="CORTE">CORTE</option>
                                                            <option value="CORTE - TROQUEL FLEXIBLE">CORTE - TROQUEL FLEXIBLE</option>
                                                            <option value="CORTE - TROQUEL&nbsp,PLANO">CORTE -&nbsp,TROQUEL&nbsp,PLANO</option>
                                                            <option value="CORTE - PAR">CORTE - PAR</option>
                                                            <option value="SIN CORTE - PAR">SIN CORTE - PAR</option>
                                                            <option value="No Aplica">No Aplica</option>
                                                        </select>
                                                        <small className="form-text text-muted">Troquel</small>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="input-group  col-6"> 

                                                        <div className="input-group">
                                                            <input type="text" id="cliente" name="cliente" className="form-control col-8" placeholder="Cliente" autofocus="" required=""/>
                                                            <select id="selectClienteOption"  className="inputbuscar form-control form-select col-4 select2-hidden-accessible" name="state" onchange="agregarContenidoCliente(this.value,)" data-select2-id="select2-data-selectClienteOption" tabindex="-1" aria-hidden="true">
                                                                <option selected="" value="0" data-select2-id="select2-data-8-babp">Ayuda al buscar Cliente</option>
                                                                                                                        <option value="8">POLIKEM S.A.S.
                                                                    </option>
                                                            </select>  
                                                                    
                                                        </div>

                                                        <small className="form-text text-muted ml-1">Cliente</small>
                                                    </div>

                                                    <div className="col-3">
                                                        
                                                        <input type="email" id="correoCliente" name="correo" className="form-control inputActiveCDP" placeholder="Correo Cliente"/>
                                                        <small className="form-text text-muted ml-1">Correo</small>
                                                    </div>
                                                    
                                                    <div className="col-3">
                                                        
                                                        <select name="vendedor" id="vendedor" className="form-control inputActiveCDP" required="">
                                                            <option value="">Vendedor</option>
                                                                                                                <option value="LILIANA MARIA HERRERA RAMIREZ">
                                                                    LILIANA MARIA HERRERA RAMIREZ</option>
                                                                                                                <option value="JUAN VILLADA DUQUE">
                                                                    JUAN VILLADA DUQUE</option>
                                                                                                                <option value="GUSTAVO VILLALOBOS">
                                                                    GUSTAVO VILLALOBOS</option>
                                                                                                                <option value="RUBIO HÉCTOR ANTONIO">
                                                                    RUBIO HÉCTOR ANTONIO</option>
                                                                                                                <option value="PROCOFORMAS S.A.">
                                                                    PROCOFORMAS S.A.</option>
                                                                                                                <option value="JORGE ANDRÉS LAVERDE">
                                                                    JORGE ANDRÉS LAVERDE</option>
                                                                                                                <option value="PABLO SEBASTIÁN NUÑEZ">
                                                                    PABLO SEBASTIÁN NUÑEZ</option>
                                                        </select>
                                                        <small className="form-text text-muted ml-1">Vendedor</small>
                                                    </div>

                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col-3">

                                                            <input type="number" className="form-control bordered border-danger" name="op" value="60330" required="" readonly=""/>
                                                            <small className="form-text text-muted ml-1">OP</small>

                                                    </div>

                                                    <div className="col-3 d-none">
                                                        <select name="tipo_orden" className="form-control inputActiveCDP" id="tipo_orden" required="">
                                                            <option value="0">Tipo de orden </option>
                                                            <option style={{color: 'red'}} value="Nuevo Arte">Nuevo Arte</option>
                                                            <option value="Nuevo Arte (Sin preprensa)">Nuevo Arte (Sin preprensa)
                                                            </option>
                                                            <option value="Repeticion Exacta">Repeticion Exacta</option>
                                                            <option style={{color: 'red'}} value="Repeticion Modificada">Repeticion
                                                                Modificada</option>
                                                            <option value="Repeticion Modificada (Sin preprensa)">Repeticion Modificada
                                                                (Sin preprensa)</option>
                                                        </select>
                                                        <small className="form-text text-muted ml-1">Tipo de orden</small>
                                                    </div>

                                                    <div className="col-3">
                                                        <select id="tipo_etiqueta" name="tipo_etiqueta" className="form-control inputActiveCDP" required="">
                                                            <option value="">Tipo de etiqueta </option>
                                                            <option value="Etiqueta">Etiqueta</option>
                                                            <option style={{color: 'red'}} value="Termoencogible">Termoencogible</option>
                                                            <option value="Etiqueta">Etiqueta (Booklet)</option>
                                                        </select>
                                                        <small className="form-text text-muted ml-1">Tipo de etiqueta</small>
                                                    </div>

                                                    <div className="col-3">
                                                        <input type="date" id="fecha_planeada_1" name="fecha_planeada" className="inputActiveCDP  form-control border border-primary text-info font-weight-bold" required="" min="2024-11-17"/>
                                                        <input type="date" id="fecha_planeada_2" name="fecha_planeada2" className="desabilitar_fp inputActiveCDP mt-1 form-control border border-danger text-info font-weight-bold" required="" min="2024-11-17"/>
                                                        <input type="date" id="fecha_planeada_3" name="fecha_planeada3" className="desabilitar_fp inputActiveCDP mt-1 form-control border border-success text-info font-weight-bold" required="" min="2024-11-17"/>
                                                        <input type="date" id="fecha_planeada_4" name="fecha_planeada4" className="desabilitar_fp inputActiveCDP mt-1 form-control border border-warning text-info font-weight-bold" required="" min="2024-11-17"/>
                                                        <input type="date" id="fecha_planeada_5" name="fecha_planeada5" className="desabilitar_fp inputActiveCDP mt-1 form-control border border-info text-info font-weight-bold" required="" min="2024-11-17"/>
                                                        <small className="form-text text-muted ml-1">Fecha planeada</small>
                                                    </div>

                                                    <div className="col-3 ">
                                                        <input type="number" id="cantidad_inventario" name="cantidad_inventario" className="inputActiveCDP form-control" placeholder="Cantidad en inventario" required=""/>
                                                        <small className="form-text text-muted ml-1">Cantidad en inventario</small>
                                                    </div>
                                                </div>

                                                

                                                <div className="row mt-3">

                                                    <div className="col-2 d-none">
                                                        <input type="hidden" id="codigo_interno" name="codigo_interno" className="inputActiveCDP form-control" placeholder="Código interno" required=""/>
                                                        <small className="form-text text-muted ml-1">Código interno</small>
                                                    </div>

                                                    <div className="col-5">
                                                        <input type="text" id="descripcion_producto" name="descripcion_producto" className="inputActiveCDP form-control" placeholder="Descripción del producto" required=""/>
                                                        <small className="form-text text-muted ml-1">Descripción del producto</small>
                                                    </div>

                                                    <div className="col-3">
                                                        <input type="number" id="cantidad" name="cantidad" className="inputActiveCDP form-control" placeholder="Cantidad" required=""/>
                                                        <small className="form-text text-muted ml-1">Cantidad</small>
                                                    </div>

                                                    <div className="col-2">
                                                        <input type="text" id="valor_unitario" name="valor_unitario" className="inputActiveCDP form-control" placeholder="Valor Unitario" required=""/>
                                                        <small className="form-text text-muted ml-1">Valor Unitario </small>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="mb-3 row">
                                                            <div className="col-sm">
                                                                <select className="form-control inputActiveCDP" id="cinta_zebra" name="cinta_zebra" >
                                                                    <option value="0">Seleccionar</option>
                                                                    <option value="Si">Si</option>
                                                                    <option value="No">No</option>

                                                                </select>
                                                                    <small className="form-text text-muted ml-1">
                                                                        Cinta Zebra
                                                                    </small>
                                                            </div>

                                                            <p>
                                                                <a style={{display: 'none'}} id="divCintaBoton" className="btn btn-primary" data-toggle="collapse" href="#divCinta" role="button" aria-expanded="true" aria-controls="divCinta"></a>


                                                            </p>
                                                        </div>



                                                        <div className="collapse hide" id="divCinta">
                                                            <div className="col-12">
                                                                <input type="number" id="metros_cinta" name="metros_cinta" className="inputActiveCDP form-control" placeholder="Metros Cinta" required=""/>
                                                                <small className="form-text text-muted ml-1">Metros Cinta </small>
                                                            </div>
                                                            


                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="row mt-3">

                                                    <div className="col-3">

                                                        <select name="material" className="form-control form-select select2-hidden-accessible" id="material" required="" style={{width: '100% !important'}} data-select2-id="select2-data-material" tabindex="-1" aria-hidden="true">
                                                            <option value="" data-select2-id="select2-data-6-8mwl">Seleccionar Material</option>
                                                                                                                <option value="B60-PE-G62">B60-PE-G62</option>
                                                                                                                <option value="B60-DA-G62">B60-DA-G62</option>
                                                                                                                <option value="B75-FR-K80">B75-FR-K80</option>
                                                                                                                <option value="ESM-16-C1S">ESM-16-C1S</option>
                                                                                                                <option value="ESM-21-C1S">ESM-21-C1S</option>
                                                                                                                <option value="ESM-90-C2S">ESM-90-C2S</option>
                                                                                                                <option value="E80-PE-G62">E80-PE-G62</option>
                                                                                                                <option value="E80-FR-G62">E80-FR-G62</option>
                                                                                                                <option value="E80-RE-G62">E80-RE-G62</option>
                                                                                                                <option value="E80-SE-G62">E80-SE-G62</option>
                                                                                                                <option value="PBT-FR-K94">PBT-FR-K94</option>
                                                                                                                <option value="PLB-PE-G62">PLB-PE-G62</option>
                                                                                                                <option value="PLT-PE-G62">PLT-PE-G62</option>
                                                                                                                <option value="PTB-PE-G62">PTB-PE-G62</option>
                                                                                                                <option value="PBB-PE-G62">PBB-PE-G62</option>
                                                                                                                <option value="PBB-FR-G62">PBB-FR-G62</option>
                                                                                                                <option value="PBB-SE-G62">PBB-SE-G62</option>
                                                                                                                <option value="PBM-SE-G62">PBM-SE-G62</option>
                                                                                                                <option value="PBM-PE-G62">PBM-PE-G62</option>
                                                                                                                <option value="PME-PE-G62">PME-PE-G62</option>
                                                                                                                <option value="PTR-PE-G62">PTR-PE-G62</option>
                                                                                                                <option value="PBB-PE-PET">PBB-PE-PET</option>
                                                                                                                <option value="PTP-PE-G62">PTP-PE-G62</option>
                                                                                                                <option value="PTR-PE-PET">PTR-PE-PET</option>
                                                                                                                <option value="PTR-RS-PET">PTR-RS-PET</option>
                                                                                                                <option value="PTR-RS-PET">PTR-RS-PET</option>
                                                                                                                <option value="PBM-RE-G62">PBM-RE-G62</option>
                                                                                                                <option value="TES-PE-G62">TES-PE-G62</option>
                                                                                                                <option value="TEC-FR-G62">TEC-FR-G62</option>
                                                                                                                <option value="TRT-PE-G62">TRT-PE-G62</option>
                                                                                                                <option value="TRT-FR-G62">TRT-FR-G62</option>
                                                                                                                <option value="TRT-RE-G62">TRT-RE-G62</option>
                                                                                                                <option value="VPM-SE-G80">VPM-SE-G80</option>
                                                                                                                <option value="VPB-SE-G80">VPB-SE-G80</option>
                                                                                                                <option value="PVC-40-000">PVC-40-000</option>
                                                                                                                <option value="PET-45-000">PET-45-000</option>
                                                                                                                <option value="PCR-PE-PET">PCR-PE-PET</option>
                                                                                                                <option value="PET-40-000">PET-40-000</option>
                                                            

                                                        </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-5-2kg0" style={{width: '100%'}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-material-container" aria-controls="select2-material-container"><span className="select2-selection__rendered" id="select2-material-container" role="textbox" aria-readonly="true" title="Seleccionar Material">Seleccionar Material</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        <small className="form-text text-muted ml-1">Material</small>
                                                        <select name="proveedorS" className="form-control form-select " id="proveedorS" style={{width: '100% !important', display: 'none'}}>
                                                            <option value="">Seleccionar proveedor</option>
                                                                                                                <option value="Arclad">Arclad</option>
                                                                                                                <option value="Avery">Avery</option>
                                                                                                                <option value="Ritrama">Ritrama</option>
                                                                                                                <option value="PLuxar">PLuxar</option>
                                                                                                                <option value="Tradhe">Tradhe</option>
                                                                                                                <option value="Dispapeles">Dispapeles</option>
                                                                                                                <option value="Sugrafco">Sugrafco</option>
                                                                                                                <option value="Convertidora de papel">Convertidora de papel</option>
                                                                                                                <option value="Huella Digital">Huella Digital</option>
                                                                                                                <option value="Procoformas">Procoformas</option>
                                                                                                                <option value="Royo Domínguez">Royo Domínguez</option>
                                                            

                                                        </select>
                                                        <small className="form-text text-muted ml-1" id="proveedorSSmall" style={{display: 'none'}}>Proveedor sugerido</small>

                                                    </div>
                                                    <div className="">
                                                        <button type="button" onclick="funcionVerPro()" id="pluspro" style={{border: 'none', background: 'none !important'}}>
                                                        <img src="/img/mas.png" alt="" style={{width: '30px', marginTop: '3px'}}/>
                                                        </button>
                                                        <button type="button" onclick="funcionOculPro()" id="lesspro" style={{display: 'none', border: 'none'}}>
                                                        <img src="/img/signo-menos.png" alt="" style={{width:' 30px', marginTop: '3px'}}/>
                                                        </button>
                                                    
                                                    </div>
                                                    <div className="col-2">
                                                        <input type="number" id="tintas" name="tintas" className="form-control" placeholder="# Tintas" required=""/>
                                                        <small className="form-text text-muted ml-1">Cantidad tintas</small>
                                                    </div>
                                                    <div className="col-2">
                                                        <input type="text" id="ancho" name="ancho" className="inputActiveCDP form-control" placeholder="Ancho" required=""/>
                                                        <small className="form-text text-muted ml-1">Ancho</small>
                                                    </div>
                                                    <div className="col-4">
                                                        <select id="acabado" name="acabado" className="inputActiveCDP form-control border border-info" required="">
                                                            <option value="">Seleccionar Acabado</option>
                                                            <option value="NINGUNO">NINGUNO</option>
                                                            <option value="LAM. TRANSF. TERMICA">LAM. TRANSF. TERMICA</option>
                                                            <option value="LAMINACION BRILLANTE">LAMINACION BRILLANTE</option>
                                                            <option value="LAMINACION MATE">LAMINACION MATE</option>
                                                            <option value="UV MATE TOTAL">UV MATE TOTAL</option>
                                                            <option value="UV MATE PARCIAL">UV MATE PARCIAL</option>
                                                            <option value="UV BRILLANTE PARCIAL">UV BRILLANTE PARCIAL</option>
                                                            <option value="UV BRILLANTE PARCIAL ALTA">UV BRILLANTE PARCIAL ALTA
                                                            </option>
                                                            <option value="UV BRILLANTE PARCIAL PREMIUN">UV BRILLANTE PARCIAL PREMIUM
                                                            </option>
                                                            <option value="UV BRILLANTE TOTAL">UV BRILLANTE TOTAL</option>
                                                            <option value="UV BRILLANTE TOTAL PREMIUN">UV BRILLANTE TOTAL PREMIUM
                                                            </option>
                                                            <option value="UV BRILLANTE TOTAL ALTA">UV BRILLANTE TOTAL ALTA</option>
                                                            <option value="UV BRILLANTE TOTAL ALTA RELEASE">UV BRILLANTE TOTAL ALTA
                                                                RELEASE</option>
                                                            <option value="BARNIZ IMPRIMIBLE TOTAL">BARNIZ IMPRIMIBLE TOTAL</option>
                                                            <option value="LACA BLISTER">LACA BLISTER</option>
                                                            <option value="BARNIZ IMPRIMIBLE PARCIAL">BARNIZ IMPRIMIBLE PARCIAL</option>
                                                        </select>
                                                        <small className="form-text text-muted ml-1">Acabado</small>
                                                    </div>
                                                </div>

                                                <div className="row mt-3">

                                                    <div className="col-2">
                                                        <input type="text" id="metros" name="metros" className="inputActiveCDP form-control" placeholder="Metros" required=""/>
                                                        <small className="form-text text-muted ml-1">Metros</small>
                                                    </div>

                                                    <div className="col-2">
                                                        <input type="text" id="unidad" name="unidad" className="inputActiveCDP form-control" placeholder="Unidad" required=""/>
                                                        <small className="form-text text-muted ml-1">Unidad</small>
                                                    </div>

                                                    <div className="col-2">
                                                        <select id="cold_foild" name="cold_foild" className="inputActiveCDP form-control" required="">
                                                            <option value="">Cold Foild</option>
                                                            <option value="0">Ninguno</option>
                                                            <option value="DORADO">Dorado</option>
                                                            <option value="PLATA">Plata</option>
                                                            <option value="AZUL">Azul</option>
                                                            <option value="COBRE">Cobre</option>
                                                            <option value="Hot Stamping - Oro Rosa">Hot Stamping - Oro Rosa</option>
                                                            <option value="Hot Stamping - Holográfico">Hot Stamping - Holográfico</option>
                                                            <option value="Hot stamping - Dorado">Hot stamping - Dorado</option>
                                                            <option value="Hot stamping - Plata">Hot stamping - Plata</option>
                                                            

                                                        </select>
                                                        <small className="form-text text-muted ml-1">Cold Foild</small>
                                                    </div>

                                                    <div className="col-2">
                                                        <input type="text" id="ancho_cold" name="ancho_cold" className="ancho_cold_v inputActiveCDP form-control" placeholder="Ancho Cold" required=""/>
                                                        <small className="form-text text-muted ml-1">Ancho Cold Foild</small>
                                                    </div>

                                                    <div className="col-2">
                                                        <input type="text" id="metros_cold" name="metros_cold" className="inputActiveCDP form-control" placeholder="Metros Cold" required=""/>
                                                        <small className="form-text text-muted ml-1">Metros Cold Foild</small>
                                                    </div>

                                                    <div className="col-2">
                                                        <input type="text" name="comentarios_op" className="inputActiveCDP form-control" placeholder="Comentarios OP"/>
                                                        <small className="form-text text-muted ml-1">Comentario OP</small>
                                                    </div>


                                                </div>

                                                


                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" data-toggle="modal" data-target="#exampleModal" id="RegistrarComercial" className="btn btn-outline-warning btn-lg btn-block mt-4"><svg className="svg-inline--fa fa-share fa-w-16 mr-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"></path></svg>Ver
                                        orden</button>
                                    
                                </form>


                        

                        


                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>}</>
  );
};

export default Ingreso;
