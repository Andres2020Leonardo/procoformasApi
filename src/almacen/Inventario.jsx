import React, { useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import config from "../config/config";
import TabulatorTable from "../utils/TabulatorTable";
import Decrypt from "../config/Decrypt";
import { useForm } from "react-hook-form";
const logo = "./img/cdpLogo2.png";
const Inventario = () => {
  const [allDatas,setAllDatas] =useState({});
  const [update,setUpdate] =useState(false);
  const [entradaData, setEntradaData] = useState({ categoria: null, idMaterial: null,nombre:null});
  const [salidaData, setSalidaData] = useState({ categoria: "", idMaterial: "",nombre:"" });
  const [allInventarioMovimientos,setAllInventarioMovimientos] =useState([]);
  const [allInventario,setAllInventario] =useState([]);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({defaultValues:{
    idMaterial:0,
    categoria:0,
    
  }});

  const handleGuardarEntrada = (id, categoria, idMaterial) => {
    let nombre='';
    switch (categoria) {
        case 'acabado':
            nombre=buscaAcabadoPorId(idMaterial)?.acabado;
            break;
        case 'material':
            nombre=buscaMaterialPorId(idMaterial).material;
            break;
        case 'cold':
            nombre=buscaColdPorId(idMaterial).coldFoild;
            break;  
        case 'tintas':
            nombre='';
            break;  
        default:
            nombre='';
            break;
    }
    setValue('material_id',idMaterial)
    setValue('categoria',categoria)
    setEntradaData({ categoria: categoria, idMaterial: idMaterial,nombre:nombre});
  };

  const handleGuardarSalida = (id, categoria, idMaterial) => {
    let nombre='';
    switch (categoria) {
        case 'acabado':
            nombre=buscaAcabadoPorId(idMaterial)?.acabado;
            break;
        case 'material':
            nombre=buscaMaterialPorId(idMaterial).material;
            break;
        case 'cold':
            nombre=buscaColdPorId(idMaterial).coldFoild;
            break;  
        case 'tintas':
            nombre='';
            break;  
        default:
            nombre='';
            break;
    }
    setValue('material_id',idMaterial)
    setValue('categoria',categoria)
    setSalidaData({ categoria: categoria, idMaterial: idMaterial,nombre:nombre});
  };

  const submitEntrada = async (data) => {
    
    try {
      
      await ClientAxios.post("/createEntrada", data);
      setEntradaData({ categoria: null, idMaterial: null,nombre:null});
      setValue('cantidadEntrada',null);
      setValue('proveedorEntrada',null);
      setValue('notaEntrada',null);
      setValue('material_id',null);
      setValue('categoria',null);
      setUpdate(!update);
    } catch (error) {
      console.error(error);
    }
  };

  const submitSalida = async (data) => {
    
    try {
   
      await ClientAxios.post("/createSalida", data);
      setSalidaData({ categoria: null, idMaterial: null,nombre:null})
      setValue('cantidadSalida',null);
      setValue('op',null);
      setValue('notaSalida',null);
      setValue('material_id',null);
      setValue('categoria',null);
      setUpdate(!update);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        
        const inventario = await ClientAxios.post(
            `/inventario`,   {}, 
            {
              headers: {
                'User': Decrypt(localStorage.getItem("SesionToken")), 
              }
            }
            
          );

          setAllInventario(inventario.data)
        const inventarioMovimientos = await ClientAxios.post(
          `/inventario-movimientos`,   {}, 
          {
            headers: {
              'User': Decrypt(localStorage.getItem("SesionToken")), 
            }
          }
          
        );
        console.log(inventario.data)
        setAllInventarioMovimientos(inventarioMovimientos.data)
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

  return (<>

    {!allDatas?.clientes?<div className="navegadorOpenBody d-flex  h-100vh"><img
        className="mx-auto my-auto spin"
        src={logo}
        alt="Logo Argos"
      /></div>:
    <div id="contenedorbody" className="navegadorOpenBody">
        <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>
            <div className="card scroll-divs-card mx-auto"  style={{pmarginBottom: "20px"}}>
                <div className="card-body">
                    <h4 className="col-12  mb-4 text-center">Área de inventario (Materiales: {allInventario?.length})</h4>
                    <TabulatorTable
                        columns= {[
                            { title: "Id", field: "idInventario", headerFilter: "input" },
                            { title: "Categoria", field: "categoria", headerFilter: "input" },
                            { title: "Material", field: "nombreMaterial", headerFilter: "input" },
                            { title: "Cantidad", field: "cantidad", headerFilter: "input" },
                            { title: "Creado", field: "updatedAt", headerFilter: "input" },
                            { title: "Actualizado", field: "createdAt", headerFilter: "input" },
                            {title: 'Acciones', field: 'acciones', formatter: function(cell, formatterParams, onRendered){
                                // Crear el botón
                                const div = document.createElement("div");
                                const button = document.createElement("button");
                                button.className = "btn btn-success btn-editar";
                                button.setAttribute('data-bs-toggle','modal');
                                button.setAttribute('data-bs-target','#modalentrada')
                                button.innerHTML = `
                                    Entrada`;
                    
                                // Agregar evento click al botón
                                button.addEventListener("click", function() {
                                    const rowData = cell.getRow().getData(); // Obtener los datos de la fila actual
                                    handleGuardarEntrada(rowData.idInventario, rowData.categoria, rowData.idMaterial)                                           
                                    // Aquí puedes agregar más lógica, como abrir un modal o redirigir a otra página
                                });
                                const button2 = document.createElement("button");
                                button2.className = "btn btn-danger btn-eliminar ms-1";
                                button2.innerHTML = `
                                    Salida`;
                    
                                // Agregar evento click al botón
                                button2.addEventListener("click", function() {
                                    const rowData = cell.getRow().getData(); // Obtener los datos de la fila actual
                                    handleGuardarSalida(rowData.idInventario, rowData.categoria, rowData.idMaterial)                                          
                                    // Aquí puedes agregar más lógica, como abrir un modal o redirigir a otra página
                                });
                                div.append(button)
                                div.append(button2)
                                // Devolver el botón con el SVG
                                return div;
                            }},
                            
                        ]}
                        data={allInventario}
                        />

                    <h4 className="col-12 text-white mt-3 text-center">Historial de Entradas y salidas</h4>
                    <div id="historial_table" style={{ width: "100%" }}></div>
                    <TabulatorTable 
                        columns= {[
                            {
                            title: "Movimiento",
                            field: "movimiento",
                            headerFilter: "input",
                            formatter: (cell) => {
                                const isEntrada = cell.getRow().getData().esEntrada;
                                const button = document.createElement("button");
                                button.className = `btn btn-success ${isEntrada ? "bg-success" : "bg-danger"} btn-editar`;
                                button.style="width:100%"
                                button.innerHTML = `<span  text-white' style='width:100% !important'>
                                ${isEntrada ? "Entrada" : "Salida"}
                                </span>`;
                    

                                return button

                            },
                            },
                            { title: "Categoria", field: "categoria", headerFilter: "input" },
                            { title: "Fecha", field: "fecha", headerFilter: "input" },
                            { title: "Material", field: "nombreMaterial", headerFilter: "input" },
                            { title: "Cantidad", field: "cantidad", headerFilter: "input" },
                            { title: "Proveedor", field: "proveedorId", headerFilter: "input" },
                        ]} 
                        data={allInventarioMovimientos}
                    />
                    {/* Modales */}
                    <div className={`${entradaData?.nombre?"":"hidden"}`} id="" style={{position:'fixed',zIndex:'200',top:0,left:0, background:'rgba(0, 0, 0, 0.5)',width:"100vw", height:"100vh",zoom:'111.11%'}}>
                        <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% ",display:"flex",width:"100%",height:'100%'}}>
                            <div className="card scroll-divs-card mx-auto my-auto modal-content"  style={{pmarginBottom: "20px",width:"70%"}}>
                                <div className="modal-header d-flex" style={{display:'flex',flexDirection:'row'}}>
                                            <h1 className="modal-title fs-5 col-11" id="modalentradaLabel">Entrada {entradaData.categoria} : {entradaData?.nombre}</h1>
                                            <button type="button" onClick={()=>{setEntradaData({ categoria: null, idMaterial: null,nombre:null});setValue('cantidadEntrada',null);setValue('proveedorEntrada',null);setValue('notaEntrada',null);setValue('material_id',null);setValue('categoria',null)}} className="btn-close col-1" style={{right:0}} data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="card-body">
                                    <form id="formEntrada">
                                                        <input type="text" class="hidden" name="material_id" id="material_id" value={entradaData.idMaterial} />
                                                        <input type="text" class="hidden" name="categoria" id="categoria_entrada" value={entradaData.categoria} />
                                                        <div class="mb-3">
                                                            <label htmlFor="cantidadEntrada" class="form-label">Cantidad</label>
                                                            <input type="text" class="form-control" id="cantidadEntrada" name="cantidadEntrada" {...register("cantidadEntrada")}/>
                                                        </div>
                                                        <div class="mb-3 ">
                                                            <label class="form-label" htmlFor="proveedorEntrada" >Proveedor</label>
                                                            <input type="text" class="form-control" id="proveedorEntrada" name="proveedorEntrada" {...register("proveedorEntrada")}/>
                                                        </div>
                                                        <div class="mb-3 ">
                                                            <label class="form-label" htmlFor="notaEntrada" >Nota</label>
                                                            <input type="text" class="form-control" id="notaEntrada" name="notaEntrada" {...register("notaEntrada")}/>

                                                        </div>
                                                        <div class="mb-3 ">
                                                            <button type="button" onClick={()=>submitEntrada(watch())} className="btn btn-success">Guardar entrada</button>
                                                        </div>
                                                        

                                    </form>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${salidaData?.nombre?"":"hidden"}`} id="" style={{position:'fixed',zIndex:'200',top:0,left:0, background:'rgba(0, 0, 0, 0.5)',width:"100vw", height:"100vh",zoom:'111.11%'}}>
                        <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% ",display:"flex",width:"100%",height:'100%'}}>
                            <div className="card scroll-divs-card mx-auto my-auto modal-content"  style={{pmarginBottom: "20px",width:"70%"}}>
                                <div className="modal-header d-flex" style={{display:'flex',flexDirection:'row'}}>
                                            <h1 className="modal-title fs-5 col-11" id="modalentradaLabel">Salida {salidaData.categoria} : {salidaData?.nombre}</h1>
                                            <button type="button" onClick={()=>{setSalidaData({ categoria: null, idMaterial: null,nombre:null});setValue('cantidadSalida',null);setValue('op',null);setValue('notaSalida',null);setValue('material_id',null);setValue('categoria',null)}} className="btn-close col-1" style={{right:0}} data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="card-body">
                                    <form id="formEntrada">
                                                        <input type="text" class="hidden" name="material_id" id="material_id" value={salidaData.idMaterial} />
                                                        <input type="text" class="hidden" name="categoria" id="categoria_entrada" value={salidaData.categoria} />
                                                        <div class="mb-3">
                                                            <label htmlFor="cantidadSalida" class="form-label">Cantidad</label>
                                                            <input type="text" class="form-control" id="cantidadSalida" name="cantidadSalida" {...register("cantidadSalida")}/>
                                                        </div>
                                                        <div class="mb-3 ">
                                                            <label class="form-label" htmlFor="op" >OP (opcional)</label>
                                                            <input type="text" class="form-control" id="op" name="op" {...register("op")}/>
                                                        </div>
                                                        <div class="mb-3 ">
                                                            <label class="form-label" htmlFor="notaSalida" >Nota</label>
                                                            <input type="text" class="form-control" id="notaSalida" name="notaSalida" {...register("notaSalida")}/>

                                                        </div>
                                                        <div class="mb-3 ">
                                                            <button type="button" onClick={()=>submitSalida(watch())} className="btn btn-success">Guardar entrada</button>
                                                        </div>
                                                        

                                    </form>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>}</>
  );
};

export default Inventario;
