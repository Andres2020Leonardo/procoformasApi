import { useForm } from "react-hook-form";
import ClientAxios from "../config/ClientAxios";
import Decrypt from "../config/Decrypt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import { useState } from "react";


const Cotizacion=()=> {
    const [loadingIcon,setLoadingIcon] = useState(false);
    const [checkStatus,setCheckStatus] = useState(false)
    const [checkStatusView,setCheckStatusView] = useState(true)
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        control,
        watch,
        formState: { errors },
      } = useForm();
    async function searchSolicitud(value) {
        setLoadingIcon(true)
        try {
            const response = await ClientAxios.post(`/buscarCotizacion`, {
                solicitud: value,                
              }, {
                headers: {
                  'User': Decrypt(localStorage.getItem("SesionToken")), 
                }
              })        
            
            if(response.data.id){
                 setLoadingIcon(false)
                 setCheckStatus(true)
                 setCheckStatusView(false)                 
                 setValue("tipoCotizacion", response.data.tipoCotizacion) 
                 setValue("cliente", response.data.cliente) 
                 setValue("producto", response.data.producto) 
                 setValue("gradoDificultad", response.data.gradoDificultad) 
                 setValue("unidad", response.data.unidadUna) 
                 setValue("unidadRefDistintas", response.data.unidadRefDistintas) 
                 setValue("anchoEspe", response.data.anchoEspe) 
                 setValue("avanceEspe", response.data.avanceEspe) 
                 setValue("unidadPlanchas", response.data.unidadPlanchas) 
                 setValue("unidadTintas", response.data.unidadTintas) 
                 setValue("cantidad1", response.data.cantidad1) 
                 setValue("diferirEnTinta1", response.data.cantidad1) 
                 setValue("cantidad2", response.data.cantidad2) 
                 setValue("cantidad3", response.data.cantidad3) 
                 setValue("cantidad4", response.data.cantidad4) 
                 setValue("cantidad5", response.data.cantidad5) 
                 setValue("cantidad6", response.data.cantidad6) 
                 setValue("cantidad7", response.data.cantidad7) 
                 setValue("cantidad8", response.data.cantidad8) 
                 setValue("entrega1", response.data.entrega1) 
                 setValue("entrega2", response.data.entrega2) 
                 setValue("entrega3", response.data.entrega3) 
                 setValue("entrega4", response.data.entrega4) 
                 setValue("entrega5", response.data.entrega5) 
                 setValue("entrega6", response.data.entrega6) 
                 setValue("entrega7", response.data.entrega7) 
                 setValue("entrega8", response.data.entrega8) 
                 setValue("troquel", response.data.troquel) 
                 setValue("material", response.data.material) 
                 setValue("Cubrimiento", response.data.cubrimiento) 
                 setValue("t1", response.data.t1) 
                 setValue("t2", response.data.t2) 
                 setValue("acabado", response.data.acabado) 
                 setValue("rollos_por", response.data.rollosPor) 
                 setValue("EtiqAncho", response.data.etiqAncho) 
                 setValue("Core", response.data.core) 
                 setValue("posi", response.data.posicionPresentacion) 
                 setValue("EtiqHoja", response.data.etiquetasHoja) 
                 setValue("HojasPaq", response.data.hojasPaquete) 
                 setValue("ciudades", response.data.ciudadesEntrega) 
                 setValue("puntos_enttrega", response.data.puntosEntrega) 
                 setValue("Vendedor", response.data.asesor) 
                 setValue("comi", response.data.comision) 
                 setTimeout(() => {
                    setCheckStatusView(true)
                }, 3000);
            }else{
                setLoadingIcon(false)
                setCheckStatus(false)
                setCheckStatusView(false)
                setTimeout(() => {
                    setCheckStatusView(true)
                }, 3000);
            }
          
           
          } catch (error) {
            
            console.error('Error fetching data:', error);
            setLoadingIcon(false)
            setCheckStatus(false)
            setCheckStatusView(false)
            setTimeout(() => {
                setCheckStatusView(true)
            }, 3000);
          } 
        
    }

    /// calculos avance avanceEspe
    function calcularAvance(){
        let calculoAvance=(parseFloat($('#CUnidad').val())*0.3175)
        $('#avanceReal').val(parseFloat(calculoAvance.toFixed(1)));
    }
    /// calculos avance anchoEspe

    function calcularAncho(){
        let calculoAncho=parseFloat($('#anchoEspe').val())*parseFloat($('#across').val())+((parseFloat($('#across').val())-1)*parseFloat($('#espacioentreetiquetas').val()))+((2*parseFloat($('#espacioexteriores').val())))
        $('#anchoMaterialC').val(  parseFloat(calculoAncho.toFixed(1)));
        $('#anchoLaminacionC').val(  parseFloat(calculoAncho.toFixed(1)));
        $('#anchoColdC').val(  parseFloat(calculoAncho.toFixed(1)));

    }
    function calcularAreaEtiqueta(){
        return  parseFloat($('#anchoEspe').val())*parseFloat($('#avanceEspe').val());
    }
    ///Etiq para graduar
    function calcularMetros(cantidad){
        let factor=0.3175;
        let constante=60;
        let REGISTRO_COLORES=(parseFloat($('#t1').val())+parseFloat($('#t2').val()))*15;
        let MATERIAL_SIN_DESPERDICIO=((((parseFloat($('#CUnidad').val())*factor)/parseFloat($('#around').val()))*cantidad)/parseFloat($('#across').val()))/100;
        let REGISTRO_DE_TROQUEL=10;
        let CAMBIO_DE_ROLLO =(MATERIAL_SIN_DESPERDICIO/1000)>1 ? (MATERIAL_SIN_DESPERDICIO/1000-1)*40 : 0;
        let CAMBIO_DE_PLANCHAS=parseFloat($('#CambPlanchas').val())*50
        let sumaTotal=constante+REGISTRO_COLORES+MATERIAL_SIN_DESPERDICIO+REGISTRO_DE_TROQUEL+CAMBIO_DE_ROLLO+CAMBIO_DE_PLANCHAS
        console.log(constante);
        console.log(REGISTRO_COLORES);
        console.log(MATERIAL_SIN_DESPERDICIO);
        console.log(REGISTRO_DE_TROQUEL);
        console.log(CAMBIO_DE_ROLLO);
        console.log(CAMBIO_DE_PLANCHAS);
        console.log(sumaTotal);
        let metros=(sumaTotal>1000)?sumaTotal=sumaTotal+50:sumaTotal=sumaTotal+30;

        return  Math.round(metros);
    }
    function calcularCostoTintaM2(){
        let valor_tintas=( parseFloat($('#grTinta1').val())*(parseFloat($('#CubrimientoCoti1').val())/100))+( parseFloat($('#grTinta2').val())*(parseFloat($('#CubrimientoCoti2').val())/100))+( parseFloat($('#grTinta3').val())*(parseFloat($('#CubrimientoCoti3').val())/100))+( parseFloat($('#grTinta4').val())*(parseFloat($('#CubrimientoCoti4').val())/100))
        return Math.round(valor_tintas)
    }
    function calcularValorTotalTintas(cantidad){
        cantidad = parseFloat(cantidad)
        let area_total_etiquetasCM2=calcularAreaEtiqueta()*cantidad;
        let area_total_etiquetasM2=area_total_etiquetasCM2/10000;
        let Consumo_tintaGramos=area_total_etiquetasM2*4;
        let Valor_total_de_tinta=Consumo_tintaGramos*calcularCostoTintaM2();
        return Math.round(Valor_total_de_tinta);
    }
    function numeroDePlanchas() {
        let texto_acabado=$("#toggleButtonAcabado").text();
        let planchas=parseFloat($('#PlanchasTinta1').val())+parseFloat($('#PlanchasTinta2').val())+parseFloat($('#PlanchasTinta3').val())+parseFloat($('#PlanchasTinta4').val())
        if (texto_acabado.includes("PARCIAL")){
            planchas=planchas+1
        }
        return planchas

    }
    function costoPlanchasporEtiqueta(cantidad) {
        cantidad = parseFloat(cantidad)
        let cms2 = parseFloat($('#anchoMaterialC').val())  * parseFloat($('#avanceReal').val())
        let valorPlancaCms2 = cms2*100///costo del cms2 plancha 100
        let Valorplanchas=valorPlancaCms2*numeroDePlanchas()
        let valorfinalPlanchas=Valorplanchas/parseFloat($('#diferirEnTinta1').val())*cantidad
        return Math.round(valorfinalPlanchas)

    }
    function costoTotal(cantidad,coti){
        cantidad = parseFloat(cantidad)
        let metroslineales=parseFloat(calcularMetros(cantidad));
        let anchomaterial=parseFloat($('#anchoMaterialC').val());
        let metroscuadrados=metros*anchomaterial;
        //// tiempo adicional maquina
        let tiempo_adicional_maquina=0;
        //// precio adicional maquina
        let precio_adicional_maquina=0;
        ///add
        let precioGraduacionPlanchas=parseFloat($('#GradPlanchas').attr('attr-precio'))*parseFloat($('#GradPlanchas').val());
        let CambPlanchas=parseFloat($('#CambPlanchas').attr('attr-precio'))*parseFloat($('#CambPlanchas').val());
        let GradPAR=parseFloat($('#GradPAR').attr('attr-precio'))*parseFloat($('#GradPAR').val());
        let PrepTintas=parseFloat($('#PrepTintas').attr('attr-precio'))*parseFloat($('#PrepTintas').val());
        let CambiosTintas=parseFloat($('#CambiosTintas').attr('attr-precio'))*parseFloat($('#CambiosTintas').val());
        if (precioGraduacionPlanchas>0){
            tiempo_adicional_maquina=tiempo_adicional_maquina+(parseFloat($('#GradPlanchas').val())*10)
            precio_adicional_maquina=precio_adicional_maquina+precioGraduacionPlanchas;
        }
        if (PrepTintas>0){
            precio_adicional_maquina=precio_adicional_maquina+PrepTintas;
        }
        if (CambPlanchas>0){
            ///tiempo_adicional_maquina=tiempo_adicional_maquina+(parseFloat($('#GradPlanchas').val())*10)
            precio_adicional_maquina=precio_adicional_maquina+CambPlanchas;
        }
        if (GradPAR>0){
            tiempo_adicional_maquina=tiempo_adicional_maquina+(parseFloat($('#GradPAR').val())*15)
            precio_adicional_maquina=precio_adicional_maquina+GradPAR;
        }
        if (CambiosTintas>0){
            tiempo_adicional_maquina=tiempo_adicional_maquina+(parseFloat($('#CambiosTintas').val())*15)
            precio_adicional_maquina=precio_adicional_maquina+CambiosTintas;
        }
        //// impRevAd
        var IRAdhesivo = $('input[name="IRAdhesivo"]:checked');

        if (IRAdhesivo.length > 0) {
            if(IRAdhesivo.val()=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(IRAdhesivo.attr('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(IRAdhesivo.attr('attr-tiempo'));
            }ShokAir
        } else {
            alert("Por favor, selecciona una opción IRAdhesivo.");
        }
        ///// imprevline
        var IRLiner = $('input[name="IRLiner"]:checked');
        if (IRLiner.length > 0) {
            if(IRLiner.val()=="Si"){
                precio_adicional_maquina=precio_adicional_maquina+parseFloat(IRLiner.attr('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(IRLiner.attr('attr-tiempo'));
            }
        } else {
            alert("Por favor, selecciona una opción IRLiner.");
        }
        ///// troquel
        var TroquelGraduacion = $('input[name="TroquelGraduacion"]:checked');
        if (TroquelGraduacion.length > 0) {
            if(TroquelGraduacion.val()=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(TroquelGraduacion.attr('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(TroquelGraduacion.attr('attr-tiempo'));
            }
        } else {
            alert("Por favor, selecciona una opción TroquelGraduacion.");
        }
        ////// Shok air
        var ShokAir = $('input[name="ShokAir"]:checked');
        if (ShokAir.length > 0) {
            if(ShokAir.val()=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(ShokAir.attr('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(ShokAir.attr('attr-tiempo'));
            }
        } else {
            alert("Por favor, selecciona una opción ShokAir. ");
        }
        ///// ponchado
        var ponchadoFc = $('input[name="IRAdhesivo"]:checked');
        if (ponchadoFc.length > 0) {
            if(ponchadoFc.val()=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(ponchadoFc.attr('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(ponchadoFc.attr('attr-tiempo'));
            }
        } else {
            alert("Por favor, selecciona una opción ponchadoFc.");
        }
        ///// mesa shetter
        var MesaShetter = $('input[name="IRAdhesivo"]:checked');
        if (MesaShetter.length > 0) {
            if(MesaShetter.val()=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(MesaShetter.attr('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(MesaShetter.attr('attr-tiempo'));
            }ShokAir
        } else {
            alert("Por favor, selecciona una opción MesaShetter.");
        }
        ///// velocidadImp
        var velocidadImp = $('input[name="velocidadImp"]:checked');
        let velocidad=0
        if (velocidadImp.length > 0) {
            if (velocidadImp.val()=="Otro"){
                velocidad=parseFloat($('#velocidadImpvalor').val());
            }else{
                velocidad=parseFloat(velocidadImp.val());
            }

        } else {
            alert("Por favor, selecciona una opción velocidadImp.");
        }
        ///// maquina
        var maquina = $('input[name="maquina"]:checked');
        let maquinaprecio=0
        if (maquina.length > 0) {
            maquinaprecio = parseFloat(maquina.attr('attr-precio'));
        } else {
            alert("Por favor, selecciona una opción maquina.");
        }
        /// calculo valor maquina

        let trabajohoras=metroslineales/velocidad;
        tiempo_adicional_maquina=tiempo_adicional_maquina/60
        let Costo_tiempo_adicional=maquinaprecio*tiempo_adicional_maquina
        let Costo_total_trabajo=trabajohoras*maquinaprecio
        let Costo_total_maquina=0
        Costo_total_maquina=Costo_total_trabajo+Costo_tiempo_adicional
        ///// fin radios
        let etiqAlAncho=$('#etiqAlAncho').attr('attr-precio');
        let avanceZebra=$('#avanceZebra').attr('attr-precio');
        let RefDistintasZebra=$('#RefDistintasZebra').attr('attr-precio');
        /// cinta
        var CintaZebra = $('#CintaZebra option:selected');
        var CintaZebraprecio = parseFloat(CintaZebra.attr('attr-precio'));
        ///// transporteCiudad
        var transporteCiudad = $('input[name="transporteCiudad"]:checked');
        let transporteCiudadprecio=0
        if (transporteCiudad.length > 0) {
            transporteCiudadprecio = parseFloat(transporteCiudad.attr('attr-precio'));
        } else {
            alert("Por favor, selecciona una opción transporteCiudad.");
        }
        var materialValor = $("#toggleButtonMaterial").text();
        let materialValorprecio=0
        if (materialValor=="Material") {
            alert("Por favor, selecciona una opción de Material.");
        } else {
            materialValorprecio =parseFloat(metroslineales)*(parseFloat($("#anchoMaterialC").val())/100)*parseFloat($("#precioMaterial").val());
        }
        var acabadoValor = $("#toggleButtonAcabado").text();
        let acabadoValorprecio=0
        if (acabadoValor=="Acabado") {
            acabadoValorprecio = parseFloat(0);
        } else {
            acabadoValorprecio = parseFloat(metroslineales)*(parseFloat($("#anchoMaterialC").val())/100)*parseFloat($("#precioAcabado").val());
        }
        var coldValor = $("#toggleButtonCold").text();
        let coldValorprecio=0
        if (coldValor=="Cold Foild") {
            coldValorprecio = parseFloat(0);
        } else {
            coldValorprecio = parseFloat(metroslineales)*(parseFloat($("#anchoMaterialC").val())/100)*parseFloat($("#precioCold").val());
        }


        const horasMaquina = trabajohoras+tiempo_adicional_maquina;
        const wholeHours = Math.floor(horasMaquina);
        const fractionalHours = horasMaquina - wholeHours;
        const fractionalMinutes = fractionalHours * 60;
        const formattedMinutes = fractionalMinutes.toFixed(0).padStart(2, '0');
        const horasMaquinaReales = `${wholeHours}:${formattedMinutes}`;




        let costo_total=coldValorprecio+materialValorprecio+acabadoValorprecio+Costo_total_maquina+precioGraduacionPlanchas+CambPlanchas+GradPAR+PrepTintas+CambiosTintas+costoPlanchasporEtiqueta(cantidad)+calcularValorTotalTintas(cantidad)+transporteCiudadprecio
        var tbody = $("#TablaCotizaciones tbody");
        var tr= $("<tr>");
        var coti = $("<td>").text(coti);
        var cantidadtd = $("<td>").text(Math.round(cantidad));
        var materialValorpreciotd = $("<td>").text(Math.round(materialValorprecio));
        var acabadoValorpreciotd = $("<td>").text(Math.round(acabadoValorprecio));
        var coldValorpreciotd = $("<td>").text(Math.round(coldValorprecio));
        var Costo_total_maquinatd = $("<td>").text(Math.round(Costo_total_maquina));
        var horas_maquina = $("<td>").text(horasMaquinaReales);
        var precioGraduacionPlanchastd = $("<td>").text(Math.round(precioGraduacionPlanchas));
        var CambPlanchastd = $("<td>").text(Math.round(CambPlanchas));
        var GradPARtd = $("<td>").text(GradPAR);
        var CambiosTintastd = $("<td>").text(Math.round(CambiosTintas));
        var PrepTintastd = $("<td>").text(Math.round(PrepTintas));
        var costoPlanchasporEtiquetatd = $("<td>").text(Math.round(costoPlanchasporEtiqueta(cantidad)));
        var calcularValorTotalTintastd = $("<td>").text(Math.round(calcularValorTotalTintas(cantidad)));
        var transporteCiudadpreciotd = $("<td>").text("hhh");
        var costo_totaltd = $("<td>").text(Math.round(costo_total));
        tr.append(coti);
        tr.append(cantidadtd);
        tr.append(materialValorpreciotd);
        tr.append(acabadoValorpreciotd);
        tr.append(coldValorpreciotd);
        tr.append(Costo_total_maquinatd);
        tr.append(horas_maquina);
        tr.append(precioGraduacionPlanchastd);
        tr.append(CambPlanchastd);
        tr.append(GradPARtd);
        tr.append(CambiosTintastd);
        tr.append(PrepTintastd);
        tr.append(costoPlanchasporEtiquetatd);
        tr.append(calcularValorTotalTintastd);
        tr.append(transporteCiudadpreciotd);
        tr.append(costo_totaltd);
        tbody.append(tr);

        return Math.round(costo_total)
    }
    return (
        <>  {loadingIcon && <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-white" style={{height:"90%"}}   icon={faArrowsRotate}/></div>}
            {checkStatusView ? <></> :  checkStatus ? <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className=" fa-beat-fade text-success" style={{height:"90%"}}   icon={faCheck}/></div>:<div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-beat-fade text-danger" style={{height:"90%"}}   icon={faX}/></div>}
            
            <div id="contenedorbody" className=" navegadorOpenBody" >
                <form id="formularioCotizacion" method="POST" className="col-12 " style={{display: "flex", flexDirection: "row"}}>
                    <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>   
                        <div className="card scroll-divs-card"  style={{  marginBottom: "20px",  background: "#011034 !important" }}>
                            <div className="card-body" >
                                <h3 className="col-12 text-black bold" style={{textAlign: "center"}}>Cotización</h3>
                                
                                <div className="col-12  h-100 p-1 " style={{display: "flex", flexDirection: "column"}}>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                       
                                        <div className="form-floating  mx-auto p-1 " >
                                            <input type="text" className="form-control shadow-lg" id="tipoCotizacion" {...register("tipoCotizacion")}/>
                                            <label style={{color:"#000000"}} htmlFor="tipoCotizacion">Tipo</label>
                                        </div>


                                        <div className="form-floating  mx-auto p-1 " >
                                            <input type="number" className="form-control" id="solicitud" {...register("solicitud")} onBlur={(e)=>searchSolicitud(e.target.value)}/>
                                            <label style={{color:"#000000"}} htmlFor="solicitud">Solicitud</label>
                                        </div>

                                        <div className="form-floating  mx-auto p-1 col-2 ">
                                            <input type="text" className="form-control" id="cliente" {...register("cliente")} readOnly={true} />
                                            <label style={{color:"#000000"}} htmlFor="cliente">Cliente</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="producto" {...register("producto")} readOnly={true} />
                                            <label style={{color:"#000000"}} htmlFor="producto">Producto</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="gradoDificultad" {...register("gradoDificultad")} readOnly={true} />
                                            <label style={{color:"#000000"}} htmlFor="gradoDificultad">Dificultad</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="unidad" {...register("unidad")} readOnly={true} />
                                            <label style={{color:"#000000"}} htmlFor="unidad">Unidad</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="unidadRefDistintas" {...register("unidadRefDistintas")} readOnly={true} />
                                            <label style={{color:"#000000"}} htmlFor="unidadRefDistintas">Ref. Dist.</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="anchoEspe" {...register("anchoEspe")} readOnly={true} style={{background: ""}}/>
                                            <label style={{color:"#000000"}} htmlFor="anchoEspe">Ancho</label>
                                        </div>
                                        <b className="my-auto" style={{fontSize: "18px", color: "#000000"}}>X</b>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="avanceEspe" {...register("avanceEspe")} readOnly={true} style={{background: ""}} />
                                            <label style={{color:"#000000"}} htmlFor="avanceEspe">Avance</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="unidadPlanchas" {...register("unidadPlanchas")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="unidadPlanchas">C. Plancha</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="unidadTintas" {...register("unidadTintas")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="unidadTintas">c. Tinta</label>
                                        </div>


                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad1" {...register("cantidad1")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="cantidad1">Cantidad 1</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad2" {...register("cantidad2")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="cantidad2">Cantidad 2</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad3" {...register("cantidad3")} readOnly={true} />
                                            <label style={{color:"#000000"}} htmlFor="cantidad3">Cantidad 3</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad4" {...register("cantidad4")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="cantidad4">Cantidad 4</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad5" {...register("cantidad5")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="cantidad5">Cantidad 5</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad6" {...register("cantidad6")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="cantidad6">Cantidad 6</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad7" {...register("v")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="cantidad7">Cantidad 7</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad8" {...register("cantidad8")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="cantidad8">Cantidad 8</label>
                                        </div>
                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega1" {...register("entrega1")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega1">Entrega 1</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega2" {...register("entrega2")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega2">Entrega 2</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega3" {...register("entrega3")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega3">Entrega 3</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega4" {...register("entrega4")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega4">Entrega 4</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega5" {...register("entrega5")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega5">Entrega 5</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega6" {...register("entrega6")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega6">Entrega 6</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega7" {...register("v")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega7">Entrega 7</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega8" {...register("entrega8")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega8">Entregas 8</label>
                                        </div>
                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="supAplica" {...register("supAplica")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="supAplica">Sup. Aplica</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="usoFinal" {...register("usoFinal")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="usoFinal">Uso final</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="troquel" {...register("troquel")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="troquel">Troquel</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="par" {...register("par")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="par">P.A.R</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 col-2">
                                            <input type="text" className="form-control" id="material" {...register("material")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="material">Sustrato</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="adhesivo" {...register("adhesivo")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="adhesivo">Adhesivo</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="Cubrimiento" {...register("Cubrimiento")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="Cubrimiento">Cubrimiento</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="t1" {...register("t1")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="t1">Tinta 1</label>
                                        </div>
                                        <b className="my-auto" style={{fontSize: "18px", color: "#ffffff"}}>X</b>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="t2" {...register("t2")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="t2">Tinta 2</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="acabado" {...register("acabado")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="acabado">Acabado</label>
                                        </div>
                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="rollos_por" {...register("rollos_por")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="rollos_por">Rollas por.</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="EtiqAncho" {...register("EtiqAncho")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="EtiqAncho">Etiq. ancho</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="Core" {...register("Core")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="Core">Core</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="posi" {...register("posi")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="posi">Posición</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1">
                                            <input type="text" className="form-control" id="EtiqHoja" {...register("EtiqHoja")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="EtiqHoja">Etiq. Hoja</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="HojasPaq" {...register("HojasPaq")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="HojasPaq">Hojas paq.</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="ciudades" {...register("ciudades")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="ciudades">Ciudades</label>

                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="puntos_enttrega" {...register("puntos_enttrega")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="puntos_enttrega">Puntos_entrega</label>
                                        </div>

                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="Vendedor" {...register("Vendedor")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="Vendedor">Vendedor</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="comi" {...register("comi")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="comi">Comis. (%)</label>
                                        </div>
                                    </div>
                                    <h4 className="col-12 text-black mt-3 bold " style={{textAlign: "center"}}>Planeación y costo troquel</h4>
                                    <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                        <div className="form-floating  mx-auto p-1 col-12 ">
                                            <div className="form-control mx-auto" id="costoTroquel" style={{display: "flex", flexDirection:"row", height: "80px !important"}}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" {...register("costoTroquelTipo")} id="costoTroquelExistente" checked="" value="Existente"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="costoTroquelExistente">
                                                        Existente
                                                    </label>
                                                </div>
                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input" type="radio" {...register("costoTroquelTipo")} id="costoTroquelNuevo" value="Nuevo"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="costoTroquelNuevo">
                                                        Nuevo
                                                    </label>
                                                </div>
                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input" type="radio" {...register("costoTroquelTipo")} id="costoTroquelNinguno" value="Ninguno"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="costoTroquelNinguno">
                                                        Ninguno
                                                    </label>
                                                </div>
                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input" type="radio" {...register("costoTroquelTipo")} id="costoTroquelNuevoEspecial" value="Nuevo Especial"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="costoTroquelNuevoEspecial">
                                                        Nuevo Especial
                                                    </label>
                                                </div>
                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input secondary" type="radio" {...register("costoTroquelTipo")} id="costoTroquelOtro" value="Nuevo Especial"/>
                                                    <label  className="form-check-label" htmlFor="costoTroquelOtro" style={{display: "flex",color:"#000000", flexDirection:"row"}}>
                                                        Otro <input type="text" className="form-control ms-2" id="costoTroquelTipoOtro" {...register("costoTroquelTipoOtro")} placeholder="Cual?"/>
                                                    </label>
                                                </div>

                                            </div>
                                            <label style={{color:"#000000"}} htmlFor="costoTroquel">Tipo de troquel</label>
                                        </div>



                                    </div>


                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1  " id="accordionRefTroquel" style={{width: "40% !important"}}>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button id="toggleButtonTroquel" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collaTroquel" aria-expanded="false" aria-controls="collaTroquel">
                                                    Ref. Troquel
                                                </button>
                                            </h2>
                                            <div id="collaTroquel"   className="accordion-collapse collapse displaynone">
                                                <div className="accordion-body">
                                                    <table id="TablaTroquel">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">id</th>
                                                            <th scope="col">Referencia</th>
                                                            <th scope="col">Unidad</th>
                                                            <th scope="col">Ancho</th>
                                                            <th scope="col">Around</th>
                                                            <th scope="col">Across</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr th:each="troquel : ${referenciaTroquels}" >
                                                            <td th:text="${troquel.getId()}"></td>
                                                            <td th:text="${troquel.getReferencia()}"></td>
                                                            <td th:text="${troquel.getUnidadTroquel()}"></td>
                                                            <td th:text="${troquel.getAnchoReal()}"></td>
                                                            <td th:text="${troquel.getAround()}"></td>
                                                            <td th:text="${troquel.getAcross()}"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating mx-auto p-1 " style={{width: "15% !important"}}>
                                        <select className="form-select" id="UnidadPAR" {...register("UnidadPAR")} aria-label="UnidadPAR">
                                            <option value="">Seleccionar Troquel</option>
                                            <option value="Flexible Existente">FLEXIBLE EXISTENTE</option>
                                            <option value="Plano Existente">PLANO EXISTENTE</option>
                                            <option style={{color: "red"}} value="Troquel Nuevo Flexible">TROQUEL NUEVO
                                                FLEXIBLE</option>
                                            <option style={{color: "red"}} value="Troquel Nuevo Plano">TROQUEL NUEVO PLANO
                                            </option>
                                            <option value="PAR">PAR</option>
                                            <option value="No Aplica">No Aplica</option>

                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="UnidadPAR">Unidad P.A.R.</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% !important"}}>
                                        <input type="text" className="form-control" id="CUnidad" {...register("CUnidad")} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="CUnidad">Unidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% !important"}}>
                                        <input type="text" className="form-control" id="around" {...register("around")} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="around">Around</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% !important"}}>
                                        <input type="text" className="form-control" id="across" {...register("across")} value="0" />
                                        <label style={{color:"#000000"}} htmlFor="across">Across</label>
                                    </div>


                                </div>
                                <hr style={{marginTop:" 8px", border: "#000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-6" >
                                        <div className="form-control" id="sustratotipodiv" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("sustratoTipo")} id="sustratoTipoBasico" value="Básico"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="sustratoTipoBasico">
                                                        Básico
                                                    </label>
                                                </div>

                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("sustratoTipo")} id="sustratoTipoAlternativo" value="Alternativo"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="sustratoTipoAlternativo">
                                                        Alternativo
                                                    </label>
                                                </div>

                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="sustratotipodiv">Sustrato</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="espacioexteriores" {...register("espacioexteriores")} value="0" />
                                        <label style={{color:"#000000"}} htmlFor="espacioexteriores">Espacio en exterior</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="espacioentreetiquetas" {...register("espacioentreetiquetas")} value="0" />
                                        <label style={{color:"#000000"}} htmlFor="espacioentreetiquetas">Espacio entre etiquetas</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1 " id="accordionMaterial" style={{width: "50% !important"}} >
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button id="toggleButtonMaterial" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collaMaterial" aria-expanded="false" aria-controls="collaMaterial">Material</button>
                                            </h2>
                                            <div id="collaMaterial"   className="accordion-collapse collapse displaynone">
                                                <div className="accordion-body">
                                                    <table id="TablaMaterial">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">id</th>
                                                            <th scope="col">Material</th>
                                                            <th scope="col">Id lista</th>
                                                            <th scope="col">Lista</th>
                                                            <th scope="col">Precio</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr th:each="material : ${materials}" >
                                                            <td th:text="${material.getId()}"></td>
                                                            <td th:text="${material.getMaterial()}"></td>
                                                            <td th:text="${material.getIdLista()}"></td>
                                                            <td th:text="${material.getLista()}"></td>
                                                            <td th:text="${material.getPrecio()}"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioMaterial" {...register("precioMaterial")}  value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="precioMaterial">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoMaterialC" {...register("anchoMaterialC")} />
                                        <label style={{color:"#000000"}} htmlFor="anchoMaterialC">Ancho</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1" id="accordionAcabado" style={{width: "50% !important"}}>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button id="toggleButtonAcabado" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collaAcabado" aria-expanded="false" aria-controls="collaAcabado">Acabado</button>
                                            </h2>
                                            <div id="collaAcabado"   className="accordion-collapse collapse displaynone">
                                                <div className="accordion-body">
                                                    <table id="TablaAcabado">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">id</th>
                                                            <th scope="col">Acabado</th>
                                                            <th scope="col">Id lista</th>
                                                            <th scope="col">Lista</th>
                                                            <th scope="col">Precio</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr th:each="acabado : ${acabados}" >
                                                            <td th:text="${acabado.getId()}"></td>
                                                            <td th:text="${acabado.getAcabado()}"></td>
                                                            <td th:text="${acabado.getIdLista()}"></td>
                                                            <td th:text="${acabado.getLista()}"></td>
                                                            <td th:text="${acabado.getPrecio()}"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioAcabado" {...register("precioAcabado")} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="precioAcabado">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoLaminacionC" {...register("anchoLaminacionC")} />
                                        <label style={{color:"#000000"}} htmlFor="anchoLaminacionC">Ancho Laminacion</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1" id="accordionCold" style={{width: "50% !important"}}>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button id="toggleButtonCold" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collaCold" aria-expanded="false" aria-controls="collaCold">Cold Foild</button>
                                            </h2>
                                            <div id="collaCold"   className="accordion-collapse collapse displaynone">
                                                <div className="accordion-body">
                                                    <table id="TablaCold">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">id</th>
                                                            <th scope="col">Cold Folid</th>
                                                            <th scope="col">Id lista</th>
                                                            <th scope="col">Lista</th>
                                                            <th scope="col">Precio</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr th:each="coldFoild : ${coldFoilds}" >
                                                            <td th:text="${coldFoild.getId()}"></td>
                                                            <td th:text="${coldFoild.getColdFoild()}"></td>
                                                            <td th:text="${coldFoild.getIdLista()}"></td>
                                                            <td th:text="${coldFoild.getLista()}"></td>
                                                            <td th:text="${coldFoild.getPrecio()}"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="" className="form-control" id="precioCold" {...register("precioCold")} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="precioCold">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoColdC" {...register("anchoColdC")} />
                                        <label style={{color:"#000000"}} htmlFor="anchoColdC">Ancho Cold Foild</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti1" {...register("CubrimientoCoti1")} value="100"/>
                                        <label style={{color:"#000000"}} htmlFor="CubrimientoCoti1">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta1" {...register("tipoTinta1")} aria-label="tipoTinta1">
                                            <option value="0" >Ninguno</option>
                                            
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipoTinta1">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta1" {...register("grTinta1")} readOnly={true} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="grTinta1">$Gr. tinta (m &sup2)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta1" {...register("PlanchasTinta1")} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="PlanchasTinta1">Planchas</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti2" {...register("CubrimientoCoti2")} value="100"/>
                                        <label style={{color:"#000000"}} htmlFor="CubrimientoCoti2">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta2" {...register("tipoTinta2")} aria-label="tipoTinta2">
                                            <option value="0" >Ninguno</option>
                                           
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipoTinta2">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta2" {...register("grTinta2")} readOnly={true} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="grTinta2">$Gr. tinta (m &sup2)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta2" {...register("PlanchasTinta2")} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="PlanchasTinta2">Planchas</label>
                                    </div>

                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti3" {...register("CubrimientoCoti3")} value="100"/>
                                        <label style={{color:"#000000"}} htmlFor="CubrimientoCoti3">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta3" {...register("tipoTinta3")} aria-label="tipoTinta3">
                                            <option value="0" >Ninguno</option>
                                            <option  th:each="tinta : ${tintas}"   th:value="${tinta.getTinta()}" th:text="${tinta.getTinta()}" th:attr="attr-precio=${tinta.precioGramo}, attr-gramosM2=${tinta.gramosM2}"></option>

                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipoTinta3">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta3" {...register("grTinta3")} readOnly={true} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="grTinta3">$Gr. tinta (m &sup2)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta3" {...register("PlanchasTinta3")} value="0" />
                                        <label style={{color:"#000000"}} htmlFor="PlanchasTinta3">Planchas</label>
                                    </div>

                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti4" {...register("CubrimientoCoti4")} value="100"/>
                                        <label style={{color:"#000000"}} htmlFor="CubrimientoCoti4">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta4" {...register("tipoTinta4")} aria-label="tipoTinta4">
                                            <option value="0" >Ninguno</option>
                                            <option  th:each="tinta : ${tintas}"   th:value="${tinta.getTinta()}" th:text="${tinta.getTinta()}" th:attr="attr-precio=${tinta.precioGramo}, attr-gramosM2=${tinta.gramosM2}"></option>

                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipoTinta4">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta4" {...register("grTinta4")} readOnly={true} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="grTinta4">$Gr. tinta (m&sup2)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta4" {...register("PlanchasTinta4")} value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="PlanchasTinta4">Planchas</label>
                                    </div>

                                </div>

                            <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CambPlanchas" {...register("CambPlanchas")}  attr-precio="0"  value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="CambPlanchas">Camb. planchas</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="diferirEnTinta1" {...register("diferirEnTinta1")} />
                                        <label style={{color:"#000000"}} htmlFor="diferirEnTinta1">Diferir en (Etiq.)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="metros" {...register("metros")} readOnly={true}/>
                                        <label style={{color:"#000000"}} htmlFor="metros" >Metros lineales</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="avanceReal" readOnly={true}/>
                                        <label style={{color:"#000000"}} htmlFor="avanceReal" >Avance</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Graduaciones</h4>

                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="GradPlanchas" {...register("GradPlanchas")}  attr-precio="12000" value="0" />
                                        <label style={{color:"#000000"}} htmlFor="GradPlanchas">#Grad. Planchas</label>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="GradPAR" {...register("GradPAR")}  attr-precio="20000" value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="GradPAR">#Grad. P.A.R.</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="PrepTintas" {...register("PrepTintas")}  attr-precio="8000" value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="PrepTintas">#Prep. Tintas</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CambiosTintas" {...register("CambiosTintas")}  attr-precio="5000" value="0"/>
                                        <label style={{color:"#000000"}} htmlFor="CambiosTintas">#Cambios Tinta</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg1" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("IRAdhesivo")} id="opsiG1" value="Si"  attr-precio="12000" attr-tiempo="10"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opsiG1">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("IRAdhesivo")} id="opnoG1" value="No"  attr-precio="0" checked/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opnoG1">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="divg1">Imp. Rev. Adhesivo</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg2" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("IRLiner")} id="opsiG2" value="Si"  attr-precio="5000" attr-tiempo="15"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opsiG2">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("IRLiner")} id="opnoG2" value="No" attr-precio="0" checked/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opnoG2">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="divg2">Imp. Rev. Liner</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg3" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("TroquelGraduacion")} id="opsiG3" value="Si" attr-precio="10000" attr-tiempo="10"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opsiG3">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("TroquelGraduacion")} id="opnoG3" value="No" attr-precio="0" checked/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opnoG3">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="divg3">Troquel</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg4" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("ShokAir")} id="opsiG4" value="Si" attr-precio="20000" attr-tiempo="25"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opsiG4">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("ShokAir")} id="opnoG4" value="No" attr-precio="0" checked/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opnoG4">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="divg4">Shok Air</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg5" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("ponchadoFc")} id="opsiG5" value="Si" attr-precio="20000" attr-tiempo="15"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opsiG5">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("ponchadoFc")} id="opnoG5" value="No" attr-precio="0" checked/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opnoG5">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="divg5">Ponchado FC</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg6" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("MesaShetter")} id="opsiG6" value="Si" attr-precio="10000" attr-tiempo="15"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opsiG6">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("MesaShetter")} id="opnoG6" value="No" attr-precio="0" checked/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opnoG6">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="divg6">Mesa Shetter</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Impresion</h4>
                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-6 ">
                                        <div className="form-control" id="impresionV" style={{display: "flex", flexDirection: "column", height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("velocidadImp")} id="velocidadImp300" value="300" checked />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="velocidadImp300">
                                                        Muy baja (300)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("velocidadImp")} id="velocidadImp750" value="750" />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="velocidadImp750">
                                                        Normal (750)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("velocidadImp")} id="velocidadImp1000" value="1000" />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="velocidadImp1000">
                                                        Alta (1000)
                                                    </label>
                                                </div>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("velocidadImp")} id="velocidadImp500" value="500" />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="velocidadImp500">
                                                        baja (500)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("velocidadImp")} id="velocidadImp1300" value="1300" />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="velocidadImp1300">
                                                        Muy Alta (1300)
                                                    </label>
                                                </div>

                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input secondary" type="radio" {...register("velocidadImp")} id="velocidadImpotro" value="Otro"/>
                                                    <label  className="form-check-label" htmlFor="velocidadImpotro" style={{display: "flex",color:"#000000", flexDirection:"row"}}>
                                                        Otro <input type="text" className="form-control ms-2" id="velocidadImpvalor" {...register("velocidadImpvalor")} placeholder="Cual?"/>
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="impresionV">Velocidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-6 ">
                                        <div className="form-control" id="maquinadiv" style={{display: "flex", flexDirection: "column",height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroq" value="Troq Bco" th:attr="attr-precio=${troqBco.getPrecio()}" checked/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroq">
                                                        Troq Bco
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAqv1" value="Aq4 UV1" th:attr="attr-precio=${Aq4UV1.getPrecio()}"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqAqv1">
                                                        Aq4 UV1
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqUv5" value="AUV5 UV6" th:attr="attr-precio=${UV5UV6.getPrecio()}"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqUv5">
                                                        UV5 UV6
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="mt-3" style={{display: "flex", flexDirection:"row"}}>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>

                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAq6" value="Aq6 UV1" th:attr="attr-precio=${Aq6UV1.getPrecio()}"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqAq6">
                                                        Aq6 UV1
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAq7" value='Aq7 UV1 (13")' th:attr="attr-precio=${Aq7UV1.getPrecio()}"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqAq7">
                                                        Aq7 UV1 (13")
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqTirama" value='Tirama' th:attr="attr-precio=${Tirama.getPrecio()}"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqTirama">
                                                        Tirama
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="maquinadiv">Maquina</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Impresion variable en zebra</h4>
                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>


                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                        <input type="text" className="form-control" id="etiqAlAncho" {...register("etiqAlAncho")}/>
                                        <label style={{color:"#000000"}} htmlFor="etiqAlAncho">#Etiq. al ancho</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                        <input type="text" className="form-control" id="avanceZebra" {...register("avanceZebra")}/>
                                        <label style={{color:"#000000"}} htmlFor="avanceZebra">Avance (cms)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                        <input type="text" className="form-control" id="RefDistintasZebra" {...register("RefDistintasZebra")} attr-precio="5000"/>
                                        <label style={{color:"#000000"}} htmlFor="RefDistintasZebra">Ref. Distintas</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 " style={{width: "25% !important"}}>
                                        <select className="form-select" id="CintaZebra" {...register("CintaZebra")} aria-label="ciudad">
                                            <option value="Cera" attr-precio="1.00">Cera</option>
                                            <option value="Resina" attr-precio="2.00">Resina</option>
                                            <option value="Cera Resina" attr-precio="1.50">Cera Resina</option>
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="CintaZebra" attr-precio="1.50">Cinta</label>
                                    </div>

                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Terminacion y empaque</h4>
                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-12 ">
                                        <div className="form-control" id="" style={{display: "flex", flexDirection: "column", height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("terminacionEn")} id="terminacionEnR" value="Rebobinado" />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="terminacionEnR">
                                                    Rebobinado
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("terminacionEn")} id="terminacionEnH" value="En hojas"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="terminacionEnH">
                                                        En hojas
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("terminacionEn")} id="terminacionEnD" value="Doblado"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="terminacionEnD">
                                                        Doblado
                                                    </label>
                                                </div>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="EtiqXRollo" {...register("etiqAlAncho")} attr-precio="0"/>
                                                    <label style={{color:"#000000"}} htmlFor="etiqAlAncho">#Etiq. X Rollo</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="EtiqXHoja1" {...register("etiqAlAncho")} attr-precio="0"/>
                                                    <label style={{color:"#000000"}} htmlFor="etiqAlAncho">#Etiq. X Hoja</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="EtiqXHoja2" {...register("etiqAlAncho")} attr-precio="0"/>
                                                    <label style={{color:"#000000"}} htmlFor="etiqAlAncho">#Etiq. X Hoja</label>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Recargo, transporte, mdel y comisión</h4>
                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-12 ">
                                        <div className="form-control" id="" style={{display: "flex", flexDirection: "column", height: "230px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteCM" value="Corte Manual" />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="terminacionEnR">
                                                        Corte Manual
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteDM" value="Doblado Manual"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="terminacionEnH">
                                                        Doblado Manual
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteCR" value="Reproceso de Corte y Rebobinado"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="terminacionEnD">
                                                        Reproceso de Corte y Rebobinado
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteOtro" value="Reproceso de Corte y Rebobinado"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="recargoTrnsporteOtro">
                                                        Otro recargo <input  type="text" placeholder="motivo" {...register("motivorecargo")}/>
                                                    </label>
                                                </div>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteCMCosto" {...register("recargoTrnsporteCMCosto")} />
                                                    <label style={{color:"#000000"}} htmlFor="recargoTrnsporteCMCosto">$ C/U</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteDMCosto" {...register("recargoTrnsporteDMCosto")} />
                                                    <label style={{color:"#000000"}} htmlFor="recargoTrnsporteDMCosto">$ C/U</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteCRCosto" {...register("recargoTrnsporteCRCosto")} />
                                                    <label style={{color:"#000000"}} htmlFor="recargoTrnsporteCRCosto">$ C/U</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteOtroCosto" {...register("recargoTrnsporteOtroCosto")} />
                                                    <label style={{color:"#000000"}} htmlFor="recargoTrnsporteOtroCosto">$ C/U</label>
                                                </div>
                                            </div>
                                            <hr style={{width:"95%" ,marginTop: "-1px", border: "#ffffff 2px solid"}}/>
                                            <div style={{display: "flex", flexDirection:"row", marginTop: "5px"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("transporteCiudad")} id="valleaburratrans" value="Valle de aburra" attr-precio="0" checked/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="valleaburratrans">
                                                        Valle de aburra
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("transporteCiudad")} id="ciudad_principal_transporte_select" value="Ciudad principal" attr-precio="0"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="ciudad_principal_transporte_select">
                                                        Ciudad principal <input  type="text" placeholder="Cual?" {...register("ciudad_principal_transporte")}/>
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("transporteCiudad")} id="otras_ciudades_transporte_select" value="Otras Ciudades/Municipios" attr-precio="0"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="otras_ciudades_transporte_select">
                                                        Otras Ciudades/Municipios <input  type="text" placeholder="Cual?" {...register("otras_ciudades_transporte")}/>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12" style={{display: "flex", flexDirection:"row"}}>
                                    <button id="cotizarB" type="button" className="btn btn-success mx-auto col-8 text-white mt-3 mb-2 p-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Cotizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Cotizaciones</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table id="TablaCotizaciones">
                                    <thead>
                                    <tr>
                                        <th scope="col">Cotización</th>
                                        <th scope="col">Cantidad Etiquetas</th>
                                        <th scope="col">Costo Material</th>
                                        <th scope="col">Costo Acabado</th>
                                        <th scope="col">Costo Cold foild</th>
                                        <th scope="col">Costo Maquina</th>
                                        <th scope="col">Horas Maquina</th>
                                        <th scope="col">Costo Graduación Planchas</th>
                                        <th scope="col">Costo Cambio de plancha</th>
                                        <th scope="col">Costo Graduación P.A.R</th>
                                        <th scope="col">Costo Cambio de tintas</th>
                                        <th scope="col">Costo Prep. tintas</th>
                                        <th scope="col">Costo Planchas</th>
                                        <th scope="col">Costo Tintas</th>
                                        <th scope="col">Costo Transporte</th>
                                        <th scope="col">Costo Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Guardar cotizaciones</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        
        </>);
}
export default Cotizacion;