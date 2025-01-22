import React, { useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import config from "../config/config";
import TabulatorTable from "../utils/TabulatorTable";
import Decrypt from "../config/Decrypt";
import { useForm } from "react-hook-form";
const logo = "./img/cdpLogo2.png";
const RecibirMaterial = () => {
  const [allDatas,setAllDatas] =useState({});
  const [update,setUpdate] =useState(false);
  const [entradaData, setEntradaData] = useState({ categoria: null, idMaterial: null,nombre:null});
  const [allOrdenes,setAllOrdenes] =useState([]);

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    control,
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
  useEffect(() => {
    async function fetchData() {
      try {
        
        const ordenes = await ClientAxios.post(
            `/ordenes-recibir`,   {}, 
            {
              headers: {
                'User': Decrypt(localStorage.getItem("SesionToken"))
              }
            }
            
          );
          console.log(ordenes.data)
          setAllOrdenes(ordenes.data);
       
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
            <div className="card scroll-divs-card mx-auto"  style={{marginBottom: "20px"}}>
                <div className="card-body" >
                            <h4 className="col-12 mb-4" style={{textAlign: 'center'}}>Recibir material</h4>
                            <div className="col-12 ">
                                <TabulatorTable
                                    columns={[
                                        {title:"Orden de producción", field:"idOp",headerFilter:"input",formatter: function(cell) {return '<span class="input-group-text fs-6 zoom90">' + cell.getValue() + '</span>';}},
                                        {title:"Categoria", field:"categoria",headerFilter:"input",formatter: function(cell) {return '<span class="input-group-text fs-6 zoom90">' + cell.getValue() + '</span>';}},
                                        {title:"Material", field:"nombreMaterial",headerFilter:"input",formatter: function(cell) {return '<span class="input-group-text fs-6 zoom90">' + cell.getValue() + '</span>';}},
                                        {title:"Fecha de orden", field:"fechaOrden",headerFilter:"input",formatter: function(cell) {return '<span class="input-group-text fs-6 zoom90">' + cell.getValue() + '</span>';}},
                                        {title:"Cantidad", field:"cantidad",headerFilter:"input",formatter: function(cell) {return '<span class="input-group-text fs-6 zoom90">' + cell.getValue() + '</span>';}},
                        
                                        {
                                            title: "FEcha estimada de entrega",
                                            field: "fechaEstimadaEntrega",
                                            headerFilter:"input",
                                            formatter: function (cell) {
                                                console.log(cell.getRow().getData())
                                                let fecha = new Date();
                                                if (cell.getRow().getData().fechaEstimadaEntrega<fecha){
                                                    return '<span class="input-group-text fs-6 zoom90 bg-success text-white">' + cell.getValue() + '</span>';
                                                }else{
                                                    return '<span class="input-group-text fs-6 zoom90 bg-danger text-white">' + cell.getValue() + '</span>';
                                                }
                                            }
                        
                        
                                        },
                                        {title:"Comentario", field:"comentario",headerFilter:"input",formatter: function(cell) {return '<span class="input-group-text fs-6 zoom90">' + cell.getValue() + '</span>';}},
                        
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
                                          
                                            div.append(button)
                                            // Devolver el botón con el SVG
                                            return div;
                                        }},
                                    ]}
                                    data={allOrdenes}
                                />
                            </div>

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
                        </div>
            </div>
        </div>
    </div>}</>
  );
};

export default RecibirMaterial;
