import { set, useForm } from "react-hook-form";
import ClientAxios from "../config/ClientAxios";
import Decrypt from "../config/Decrypt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faArrowDown, faArrowsRotate, faArrowUp, faCheck, faFilePdf, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import DataTable from 'react-data-table-component';
import TabulatorTable from "../utils/TabulatorTable";
import ImageOCR from "../utils/ImageOCR";
import CotizacionPdf from "../utils/CotizacionPdf";

const Cotizacion=()=> {
    const [loadingIcon,setLoadingIcon] = useState(false);
    const [checkStatus,setCheckStatus] = useState(false);
    const [checkStatusView,setCheckStatusView] = useState(true);
    const [allDatas,setAllDatas] = useState({});
    const [mostrartabla,setMostrartabla]=useState(false);
    const [allCoti,setAllCoti]=useState([])
    const [dataTableCotizacion,setDataTableCotizacion]=useState(null)
    const [dataform,setDataform]=useState(null)
    const [verPdf,setVerPdf]=useState(false);
    
    const [valoresPorCiudad,setValoresPorCiudad]=useState([])
    const [proporcionTroquel,setProporcionTroquel]=useState(0);
    const [proporcionEtiqueta,setProporcionEtiqueta]=useState(0);
    const logo = "./img/cdpLogo2.png";
    const optionsTables = {
        paginationSize: 5, 
        selectable: 1,
      };
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        control,
        watch,
        formState: { errors },
      } = useForm({defaultValues:{
        tipoCotizacion:0,
        solicitud:0,
        cliente:0,
        producto:0,
        gradoDificultad:0,
        unidad:0,
        unidadRefDistintas:0,
        anchoEspe:0,
        avanceEspe:0,
        unidadPlanchas:0,
        unidadTintas:0,
        cantidad1:0,
        cantidad2:0,
        cantidad3:0,
        cantidad4:0,
        cantidad5:0,
        cantidad6:0,
        unidadPar:null,
        troquel_referencia:'',
        troquel_id:null,
        cantidad7:0,
        cantidad8:0,
        entrega1:0,
        entrega2:0,
        entrega3:0,
        entrega4:0,
        entrega5:0,
        entrega6:0,
        entrega7:0,
        entrega8:0,
        supAplica:0,
        usoFinal:0,
        troquel:0,
        par:0,
        material:0,
        adhesivo:0,
        Cubrimiento:0,
        t1:0,
        t2:0,
        acabado:0,
        rollos_por:0,
        EtiqAncho:0,
        Core:0,
        posi:0,
        EtiqHoja:0,
        HojasPaq:0,
        ciudades:0,
        puntos_enttrega:0,
        Vendedor:0,
        comi:0,
        costoTroquelTipo:0,
        costoTroquelTipoOtro:0,
        CUnidad:0,
        around:0,
        across:0,
        sustratoTipo:0,
        espacioexteriores:0.7,
        espacioentreetiquetas:0,
        precioMaterial:0,
        anchoMaterialC:0,
        precioAcabado:0,
        anchoLaminacionC:0,
        precioCold:0,
        anchoColdC:0,
        CubrimientoCoti1:100,
        tipoTinta1:0,
        grTinta1:0,
        PlanchasTinta1:1,
        CubrimientoCoti2:100,
        tipoTinta2:0,
        grTinta2:0,
        PlanchasTinta2:0,
        CubrimientoCoti3:100,
        tipoTinta3:0,
        grTinta3:0,
        PlanchasTinta3:0,
        CubrimientoCoti4:100,
        tipoTinta4:0,
        grTinta4:0,
        PlanchasTinta4:0,
        CambPlanchas:0,
        diferirEtiqueta:0,
        metros:0,
        GradPlanchas:0,
        GradPAR:0,
        PrepTintas:0,
        precioHotStamping:0,
        CambiosTintas:0,
        IRAdhesivo:'No',
        IRLiner:'No',
        TroquelGraduacion:'No',
        ShokAir:'No',
        ponchadoFc:'No',
        MesaShetter:'No',
        velocidadImp:0,
        velocidadImpvalor:300,
        maquina:0,
        etiqAlAncho:0,
        avanceZebra:0,
        RefDistintasZebra:0,
        CintaZebra:0,
        terminacionEn:0,
        recargoTrnsporte:0,
        motivorecargo:0,
        recargoTrnsporteCMCosto:0,
        recargoTrnsporteDMCosto:0,
        recargoTrnsporteCRCosto:0,
        recargoTrnsporteOtroCosto:0,
        transporteCiudad:0,
        ciudad_principal_transporte:0,
        otras_ciudades_transporte:0,
        utilidad:30,
        comision:3,
      }});

      function buscarClientePorId(id) {
        let clienteByID = allDatas.clientes.find(cliente => parseInt(cliente.id) === parseInt(id));
        return clienteByID;
      }
      function buscaProductoPorId(id) {
    
        let productoId = allDatas.productos.find(producto => parseInt(producto.id) === parseInt(id));
      
        return productoId;
      }
      function buscaCiudadPorId(id) {    
        let ciudad = allDatas.ciudades.find(ciudad => parseInt(ciudad.id) === parseInt(id));
        return ciudad;
      }
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
                 setValue("cliente", buscarClientePorId(response.data.cliente)?.razonSocial || response.data.cliente) 
                 setValue("producto", buscaProductoPorId(response.data.producto)?.nombre || response.data.producto) 
                 setValue("gradoDificultad", response.data.gradoDificultad) 
                 setValue("unidad", response.data.unidadUna) 
                 setValue("unidadRefDistintas", response.data.unidadRefDistintas) 
                 setValue("anchoEspe", response.data.anchoEspe) 
                 setValue("avanceEspe", response.data.avanceEspe) 
                 setValue("unidadPlanchas", response.data.unidadPlanchas) 
                 setValue("unidadTintas", response.data.unidadTintas) 
                 setValue("cantidad1", response.data.cantidad1) 
                 setValue("diferirEtiqueta", response.data.cantidad1) 
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
                 setValue("material", response.data.material || "") 
                 setValue("Cubrimiento", response.data.cubrimiento) 
                 setValue("t1", response.data.t1) 
                 setValue("t2", response.data.t2) 
                 setValue("acabado", response.data.acabado || "") 
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
                 if((response.data.tinta1+response.data.tinta1)===0){
                    setValue('comision',1.5)
                 }
                 const arrayCiudades = JSON.parse(response.data.ciudadEntrega);
                 let ciudadSe=""
                 let valorC=[]
                 for (let index = 0; index < arrayCiudades.length; index++) {
                    const element = arrayCiudades[index];
                    if (index===0) {
                        ciudadSe=ciudadSe+buscaCiudadPorId(element).nombre                        
                    }else{
                        ciudadSe=ciudadSe+" - "+buscaCiudadPorId(element).nombre                       
                    }
                    valorC.push(buscaCiudadPorId(element).valorCaja)
                 }
                 setValue("comi", response.data.comision) 
                 document.getElementById('ciudad').value=ciudadSe
                 setValoresPorCiudad(valorC)
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
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
          }
        }
      
        fetchData();   
      }, []);
       /// calculos avance avanceEspe
      function calcularAvance(){
            let calculoAvance=(parseFloat(watch('CUnidad'))*0.3175)
            setValue('avanceReal',parseFloat(calculoAvance.toFixed(1)) || 0)
      }
      /// calculos avance anchoEspe
    function calcularAncho(){
        if(watch('anchoEspe')==""){
            alert("Falta Ancho Esperado")
        }else{
            let calculoAncho=parseFloat(watch('anchoEspe'))*parseFloat(watch('across'))+((parseFloat(watch('across'))-1)*parseFloat(watch('espacioentreetiquetas')))+((2*parseFloat(watch('espacioexteriores'))))
            setValue('anchoMaterialC', parseFloat(calculoAncho.toFixed(1)) || 0);
            setValue('anchoLaminacionC', parseFloat(calculoAncho.toFixed(1)) || 0);
            setValue('anchoColdC', parseFloat(calculoAncho.toFixed(1)) || 0);
            setValue('anchoHotStamping', parseFloat(calculoAncho.toFixed(1)) || 0);
        }
       

    }
    const handleRowSelectedCoti=(datos)=>{       
       
      }
      /// tabla troquel
      const toggleButtonTroquel =useRef(null);
      const [toggleButtonTroquelIsopen,setToggleButtonTroquelIsopen]=useState(false);
      const handleRowSelectedTroquel=(datos)=>{
        if(watch('anchoEspe')==""){
            alert("Falta Ancho Esperado")
        }else{
        if(datos.length==1){
            let dato =datos[0];
            setValue('CUnidad',dato.unidadTroquel);
            setValue('around',dato.around);
            setValue('across',dato.across);
            setValue('troquel_referencia',dato.referencia);
            setValue('troquel_id',dato.id);            
            if (toggleButtonTroquel.current) {
                toggleButtonTroquel.current.querySelector('p').textContent = 'Ref. Troquel: '+dato.referencia;
                toggleButtonTroquel.current.classList.add('checkbutonTables')
              }
              calcularAvance()
              calcularAncho()
        }else{
            setValue('CUnidad','');
            setValue('around','');
            setValue('across','');
            setValue('troquel_referencia','');
            setValue('troquel_id',null); 
            if (toggleButtonTroquel.current) {
                toggleButtonTroquel.current.querySelector('p').textContent  =`Ref. Troquel` ;
                toggleButtonTroquel.current.classList.remove('checkbutonTables')
              }
              calcularAvance()
              calcularAncho()
        }}
       
      }
    /// tabla material
    const toggleButtonMaterial =useRef(null);
      const [toggleButtonMaterialIsopen,setToggleButtonMaterialIsopen]=useState(false);
      const handleRowSelectedMaterial=(datos)=>{
        
        if(datos.length==1){
            let dato =datos[0];
            setValue('precioMaterial',dato.precio);
            setValue('metros',calcularMetros(watch('cantidad1')))
            setValue('materialS',dato.id);
            if (toggleButtonMaterial.current) {
                toggleButtonMaterial.current.querySelector('p').textContent = 'Material: '+dato.material;
                toggleButtonMaterial.current.classList.add('checkbutonTables')
              }
        }else{
            setValue('precioMaterial','');
            setValue('materialS','');
            if (toggleButtonMaterial.current) {
                toggleButtonMaterial.current.querySelector('p').textContent  =`Material` ;
                toggleButtonMaterial.current.classList.remove('checkbutonTables')
              }
        }
       
      }
      /// tabla Acabado
      const toggleButtonAcabado =useRef(null);
      const [toggleButtonAcabadoIsopen,setToggleButtonAcabadoIsopen]=useState(false);
      const handleRowSelectedAcabado=(datos)=>{
        
        if(datos.length==1){
            let dato =datos[0];
            setValue('precioAcabado',dato.precio);
            setValue('acabadoS',dato.id);
            if (toggleButtonAcabado.current) {
                toggleButtonAcabado.current.querySelector('p').textContent = 'Acabado: '+dato.acabado;
                toggleButtonAcabado.current.classList.add('checkbutonTables')
              }
        }else{
            setValue('precioAcabado','');
            setValue('acabadoS','');
            if (toggleButtonAcabado.current) {
                toggleButtonAcabado.current.querySelector('p').textContent  =`Acabado` ;
                toggleButtonAcabado.current.classList.remove('checkbutonTables')
              }
        }
       
      }
        /// tabla par
        const toggleButtonPar =useRef(null);
        const [toggleButtonParIsopen,setToggleButtonParIsopen]=useState(false);
        const handleRowSelectedPar=(datos)=>{
            if(watch('anchoEspe')==""){
                alert("Falta Ancho Esperado")
            }else{
            if(datos.length==1){
                let dato =datos[0];
                setValue('CUnidad',dato.unidad);
                setValue('around',dato.cortes);
                setValue('across',0);
                setValue('unidadPar',dato.id);
                if (toggleButtonPar.current) {
                    toggleButtonPar.current.querySelector('p').textContent = 'Unidad P.A.R.: '+dato.unidad +"-"+dato.valor +"-"+dato.cortes ;
                    toggleButtonPar.current.classList.add('checkbutonTables')
                  }
                  calcularAvance()
                  calcularAncho()
            }else{
                setValue('CUnidad','');
                setValue('around','');
                setValue('across','');
                setValue('unidadPar',null);
                if (toggleButtonPar.current) {
                    toggleButtonPar.current.querySelector('p').textContent  =`Unidad P.A.R.` ;
                    toggleButtonPar.current.classList.remove('checkbutonTables')
                  }
                  calcularAvance()
                  calcularAncho()
            }}
        
         
        }
      /// tabla Cold
      const toggleButtonCold =useRef(null);
      const [toggleButtonColdIsopen,setToggleButtonColdIsopen]=useState(false);
      const handleRowSelectedCold=(datos)=>{
        
        if(datos.length==1){
            let dato =datos[0];
            setValue('precioCold',dato.precio);
            setValue('coldfoildS',dato.id);
            if (toggleButtonCold.current) {
                toggleButtonCold.current.querySelector('p').textContent = 'Cold Foild: '+dato.coldFoild;
                toggleButtonCold.current.classList.add('checkbutonTables')
              }
        }else{
            setValue('precioCold','');
            setValue('coldfoildS','');
            if (toggleButtonCold.current) {
                toggleButtonCold.current.querySelector('p').textContent  =`Cold Foild` ;
                toggleButtonCold.current.classList.remove('checkbutonTables')
              }
        }
       
      }
        /// tabla Cold
        const toggleButtonHotStamping =useRef(null);
        const [toggleButtonHotStampingIsopen,setToggleButtonHotStampingIsopen]=useState(false);
        const handleRowSelectedHotStamping=(datos)=>{
          
          if(datos.length==1){
              let dato =datos[0];
              setValue('precioHotStamping',dato.precio);
              setValue('HotStamping',dato.id);
              if (toggleButtonHotStamping.current) {
                    toggleButtonHotStamping.current.querySelector('p').textContent = 'Cold Foild: '+dato.coldFoild;
                    toggleButtonHotStamping.current.classList.add('checkbutonTables')
                }
          }else{
              setValue('precioHotStamping','');
              setValue('HotStamping','');
              if (toggleButtonHotStamping.current) {
                    toggleButtonHotStamping.current.querySelector('p').textContent  =`Cold Foild` ;
                    toggleButtonHotStamping.current.classList.remove('checkbutonTables')
                }
          }
         
        }
    
    function calcularAreaEtiqueta(){
        return  parseFloat(watch('anchoEspe'))*parseFloat(watch('avanceEspe'));
    }
    //
    ///Etiq para graduar
    function calcularMetros(cantidad){
        let factor=0.3175;
        let constante=60;
        let REGISTRO_COLORES=(parseFloat(watch('t1'))+parseFloat(watch('t2')))*15;
        let MATERIAL_SIN_DESPERDICIO=((((parseFloat(watch('CUnidad'))*factor)/parseFloat(watch('around')))*cantidad)/parseFloat(watch('across')))/100;
        let REGISTRO_DE_TROQUEL=10;
        let CAMBIO_DE_ROLLO =(MATERIAL_SIN_DESPERDICIO/1000)>1 ? (MATERIAL_SIN_DESPERDICIO/999)*40 : 0;
        let CAMBIO_DE_PLANCHAS=parseFloat(watch('CambPlanchas'))*50
        let sumaTotal=constante+REGISTRO_COLORES+MATERIAL_SIN_DESPERDICIO+REGISTRO_DE_TROQUEL+CAMBIO_DE_ROLLO+CAMBIO_DE_PLANCHAS
        let metros=(sumaTotal>1000)?sumaTotal=sumaTotal+50:sumaTotal=sumaTotal+30;
        return  Math.round(metros);
    }
    function calcularCostoTintaM2(){
        let valor_tintas=( parseFloat(watch('grTinta1'))*(parseFloat(watch('CubrimientoCoti1'))/100)*parseFloat(watch('PlanchasTinta1')))+( parseFloat(watch('grTinta2'))*(parseFloat(watch('CubrimientoCoti2'))/100)*parseFloat(watch('PlanchasTinta2')))+( parseFloat(watch('grTinta3'))*(parseFloat(watch('CubrimientoCoti3'))/100)*parseFloat(watch('PlanchasTinta3')))+( parseFloat(watch('grTinta4'))*(parseFloat(watch('CubrimientoCoti4'))/100)*parseFloat(watch('PlanchasTinta4')))
      
        return Math.round(valor_tintas)
    }
    function calcularValorTotalTintas(cantidad){
        
        cantidad = parseFloat(cantidad)
        let area_total_etiquetasCM2=calcularAreaEtiqueta()*cantidad;
        let area_total_etiquetasM2=area_total_etiquetasCM2/10000;
        let Consumo_tintaGramos=area_total_etiquetasM2;
        let Valor_total_de_tinta=Consumo_tintaGramos*calcularCostoTintaM2();
        return Math.round(Valor_total_de_tinta);
    }
   
    function numeroDePlanchas() {
        let texto_acabado=toggleButtonAcabado.current.querySelector('p').textContent;
        let planchas=parseFloat(watch('PlanchasTinta1'))+parseFloat(watch('PlanchasTinta2'))+parseFloat(watch('PlanchasTinta3'))+parseFloat(watch('PlanchasTinta4'))
        if (texto_acabado.includes("PARCIAL")){
            planchas=planchas+1
        }
        return planchas

    }
    
    function calcularValorTroquel(cantidad,diferir) {
        if(watch('cantidad1')===0){
            alert('Buscar solicitud o agregar diferir costo troquel')
            return 0;
        }else{
            let figuras=parseFloat(watch('around'))+parseFloat(watch('across'))
            let valorFiguras=figuras<=20?220000:figuras>20 && figuras<=35? 270000 : figuras>35 && figuras<=50? 320000 : 370000 
            let costoT=((((parseFloat(watch('CUnidad'))*0.3175*parseFloat(watch('anchoMaterialC')))*1200)+valorFiguras)/diferir)*cantidad
            return costoT;
        }
    }
    function costoPlanchasporEtiqueta(cantidad,diferir) {
     

        cantidad = parseFloat(cantidad)
        let cms2 = parseFloat(watch('anchoMaterialC'))  * parseFloat(watch('avanceReal'))
        let valorPlancaCms2 = cms2*100
        let Valorplanchas=valorPlancaCms2*numeroDePlanchas()
        let valorfinalPlanchas=parseFloat(Valorplanchas)/(parseFloat(diferir)/cantidad)
        return Math.round(valorfinalPlanchas)
        
        
    }
    function costoTerminacionEn(cantidad){
        let seleccionTerminado=watch('terminacionEn')
        if (seleccionTerminado==='Rebobinado') {
            return (calcularMetros(cantidad)/562.5)*10000;
        }else if (seleccionTerminado==='En hojas') {
            return (calcularMetros(cantidad)/562.5)*10000;
        }
        else if (seleccionTerminado==='Doblado') {
            return  (calcularMetros(cantidad)/562.5)*10000;
        }else{
            alert('selecionar terminación')
            return 0
        }
    }
    function costoTroquel(cantidad,diferir) {
        if (watch('troquel')==="plano") {
            return 100000;
        }
        switch (watch('costoTroquelTipo')) {            
            case 'Existente':
                return calcularValorTroquel(cantidad,diferir);
                break;
            case 'Nuevo':
                return calcularValorTroquel(cantidad,diferir);
                break;
            case 'Nuevo Especial':
                return calcularValorTroquel(cantidad,diferir);
                break;
            case 'otro':
                return watch('costoTroquelTipoOtro')/diferir;
                break;
            case 'Ninguno':
                return 0;
                break;
            default:
                return 0;
                break;
        }
    }
    function recargoTrnsporteF() {
        switch (watch('recargoTrnsporte')) {
            case 'Corte Manual':
                return parseFloat(watch('recargoTrnsporteCMCosto'));
                break;
            case 'Doblado Manual':
                return parseFloat(watch('recargoTrnsporteDMCosto'));
                break;
            case 'Reproceso de Corte y Rebobinado':
                return parseFloat(watch('recargoTrnsporteCRCosto'));
                break;
            case 'otro':
                return parseFloat(watch('recargoTrnsporteOtroCosto'));
                break;
        
            default:
                return 0;
                break;
        }
    }
    function name(params) {
        switch (key) {
            case value:
                
                break;
        
            default:
                break;
        }
    }

    function costoTotal(cantidad,coti,troquelDif,fotoDife){
        
        cantidad = parseFloat(cantidad)
        let metroslineales=parseFloat(calcularMetros(cantidad));
        let anchomaterial=parseFloat(watch('anchoMaterialC'));
        let metroscuadrados=metros*anchomaterial;
        //// tiempo adicional maquina
        let tiempo_adicional_maquina=0;
        //// precio adicional maquina
        let precio_adicional_maquina=0;
        ///add
        let precioGraduacionPlanchas=parseFloat(document.getElementById('GradPlanchas').getAttribute('attr-precio'))*parseFloat(watch('GradPlanchas'));
        let CambPlanchas=parseFloat(document.getElementById('CambPlanchas').getAttribute('attr-precio'))*parseFloat(watch('CambPlanchas'));
        let GradPAR=parseFloat(document.getElementById('GradPAR').getAttribute('attr-precio'))*parseFloat(watch('GradPAR'));
        let PrepTintas=parseFloat(document.getElementById('PrepTintas').getAttribute('attr-precio'))*parseFloat(watch('PrepTintas'));
        let CambiosTintas=parseFloat( document.getElementById('CambiosTintas').getAttribute('attr-precio'))*parseFloat(watch('CambiosTintas'));
        if (precioGraduacionPlanchas>0){
            tiempo_adicional_maquina=tiempo_adicional_maquina+(parseFloat(watch('GradPlanchas'))*10)
            precio_adicional_maquina=precio_adicional_maquina+precioGraduacionPlanchas;
        }
        if (PrepTintas>0){
            precio_adicional_maquina=precio_adicional_maquina+PrepTintas;
        }
        if (CambPlanchas>0){
            tiempo_adicional_maquina=tiempo_adicional_maquina+(parseFloat(watch('GradPlanchas'))*10)
            precio_adicional_maquina=precio_adicional_maquina+CambPlanchas;
        }
        if (GradPAR>0){
            tiempo_adicional_maquina=tiempo_adicional_maquina+(parseFloat(watch('GradPAR'))*15)
            precio_adicional_maquina=precio_adicional_maquina+GradPAR;
        }
        if (CambiosTintas>0){
            tiempo_adicional_maquina=tiempo_adicional_maquina+(parseFloat(watch('CambiosTintas'))*15)
            precio_adicional_maquina=precio_adicional_maquina+CambiosTintas;
        }
        //// impRevAd
        var IRAdhesivo = document.querySelector('input[name="IRAdhesivo"]:checked');
        
            if(IRAdhesivo.value=="Si"){
                
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(IRAdhesivo.getAttribute('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(IRAdhesivo.getAttribute('attr-tiempo'));
            }
      
        ///// imprevline
        var IRLiner = document.querySelector('input[name="IRLiner"]:checked');
       
            if(IRLiner=="Si"){
                precio_adicional_maquina=precio_adicional_maquina+parseFloat(IRLiner.getAttribute('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(IRLiner.getAttribute('attr-tiempo'));
            }
      
        ///// troquel
        var TroquelGraduacion = document.querySelector('input[name="TroquelGraduacion"]:checked');
       
            if(TroquelGraduacion.value=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(TroquelGraduacion.getAttribute('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(TroquelGraduacion.getAttribute('attr-tiempo'));
            }
   
        ////// Shok air
        var ShokAir = document.querySelector('input[name="ShokAir"]:checked');
       
            if(ShokAir.value=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(ShokAir.getAttribute('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(ShokAir.getAttribute('attr-tiempo'));
            }
      
        ///// ponchado
        var ponchadoFc = document.querySelector('input[name="ponchadoFc"]:checked');
       
            if(ponchadoFc.value=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(ponchadoFc.getAttribute('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(ponchadoFc.getAttribute('attr-tiempo'));
            }
     
        ///// mesa shetter
        var MesaShetter =document.querySelector('input[name="MesaShetter"]:checked');
  
            if(MesaShetter.value=="Si"){
                precio_adicional_maquina=precio_adicional_maquina*parseFloat(MesaShetter.getAttribute('attr-precio'))
                tiempo_adicional_maquina=tiempo_adicional_maquina+ parseFloat(MesaShetter.getAttribute('attr-tiempo'));
            }ShokAir
     
        ///// velocidadImp
        var velocidadImp = document.querySelector('input[name="velocidadImp"]:checked');
        let velocidad=0
        
            if (velocidadImp.value=="Otro"){
                velocidad=parseFloat(watch('velocidadImpvalor'));
            }else{
                velocidad=parseFloat(watch('velocidadImp'));
            }

        ///// maquina
        var maquina = document.querySelector('input[name="maquina"]:checked');
        let maquinaprecio=0
        
        if (maquina) {
            maquinaprecio = parseFloat(maquina.getAttribute('attr-precio'));
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
    
        
        let sherpavalor=document.getElementById('sherpa').getAttribute('attr-precio');
        let preciosherpa=parseFloat(document.getElementById('sherpa').value)*parseFloat(sherpavalor);
        ///// fin radios
        let etiqAlAncho=document.getElementById('etiqAlAncho').getAttribute('attr-precio');
        let avanceZebra=document.getElementById('avanceZebra').getAttribute('attr-precio');
        let RefDistintasZebra=document.getElementById('RefDistintasZebra').getAttribute('attr-precio');
        /// cinta
        var CintaZebra = document.getElementById('CintaZebra');
        var CintaZebraprecio=0
        if(CintaZebra.selectedIndex!==-1){
            CintaZebraprecio = parseFloat(CintaZebra.options[CintaZebra.selectedIndex].getAttribute('attr-precio'));
        }
       
        ///// transporteCiudad aburra 
        var transporteCiudad = document.querySelector('select[id="ciudadEnvio"]');
        let transporteCiudadprecio = 0;
        // Verificar si se ha seleccionado una opción válida
        if (transporteCiudad && transporteCiudad.value) {
            // Obtener el precio del atributo 'attr-precio' de la opción seleccionada
            transporteCiudadprecio = parseFloat(transporteCiudad.selectedOptions[0].getAttribute('att-precio'));
            // Multiplicar por la cantidad de cajas (presupongo que la función 'watch' devuelve el valor de 'cajas')
            transporteCiudadprecio = parseFloat(transporteCiudadprecio) * parseInt(watch('cajas'));
        } else {
            alert("Por favor, selecciona una opción de ciudad.");
        }
           

        ////

        var materialValor = toggleButtonMaterial.current.querySelector('p').textContent;
        let materialValorprecio=0
        if (materialValor=="Material") {
            alert("Por favor, selecciona una opción de Material.");
        } else {
            materialValorprecio =parseFloat(metroslineales)*(parseFloat(watch("anchoMaterialC"))/100)*parseFloat(watch("precioMaterial"));
        }
        var acabadoValor =  toggleButtonAcabado.current.querySelector('p').textContent;
        let acabadoValorprecio=0
        if (acabadoValor=="Acabado") {
            acabadoValorprecio = parseFloat(0);
        } else {
            acabadoValorprecio = parseFloat(metroslineales)*(parseFloat(watch("anchoMaterialC"))/100)*parseFloat(watch("precioAcabado"));
        }
        var coldValor = toggleButtonCold.current.querySelector('p').textContent;
        let coldValorprecio=0
        if (coldValor=="Cold Foild") {
            coldValorprecio = parseFloat(0);
        } else {
            coldValorprecio = parseFloat(metroslineales)*(parseFloat(watch("anchoMaterialC"))/100)*parseFloat(watch("precioCold"));
        }


        const horasMaquina = trabajohoras + tiempo_adicional_maquina;
        let wholeHours = Math.floor(horasMaquina);
        let fractionalHours = horasMaquina - wholeHours;
        let fractionalMinutes = Math.round(fractionalHours * 60);
        
        // Ajustar las horas si los minutos son 60
        if (fractionalMinutes === 60) {
            fractionalMinutes = 0;
            wholeHours += 1;
        }
        
        const formattedMinutes = fractionalMinutes.toString().padStart(2, '0');
        
        const horasMaquinaReales = `${wholeHours} h ${formattedMinutes}m`;




       
        var coti = (coti);
        var cantidadtd =parseFloat((Math.round(cantidad)));
        var materialValorpreciotd =parseFloat((Math.round(materialValorprecio)));
        var acabadoValorpreciotd =parseFloat((Math.round(acabadoValorprecio)));
        var coldValorpreciotd =parseFloat((Math.round(coldValorprecio)));
        var Costo_total_maquinatd =parseFloat((Math.round(Costo_total_maquina)));
        var horas_maquina =(horasMaquinaReales);
        var precioGraduacionPlanchastd =parseFloat((Math.round(precioGraduacionPlanchas)));
        var CambPlanchastd =parseFloat((Math.round(CambPlanchas)));
        var GradPARtd =parseFloat((GradPAR));
        var CambiosTintastd =parseFloat((Math.round(CambiosTintas)));
        var PrepTintastd =parseFloat((Math.round(PrepTintas)));
        var costoPlanchasporEtiquetatd =parseFloat((Math.round(costoPlanchasporEtiqueta(cantidad,fotoDife))));
        var calcularValorTotalTintastd =parseFloat((Math.round(calcularValorTotalTintas(cantidad))));
        var transporteCiudadpreciotd =parseFloat(transporteCiudadprecio) 
        var constoTerminacion =parseFloat(costoTerminacionEn(cantidad));
        var costoTroqueltd =parseFloat(costoTroquel(cantidad,troquelDif));
        var recargoTrnsporteFtd =parseFloat(recargoTrnsporteF());
       
        let costo_total = materialValorpreciotd+acabadoValorpreciotd+coldValorpreciotd+Costo_total_maquinatd+precioGraduacionPlanchastd+CambPlanchastd+GradPARtd+CambiosTintastd+PrepTintastd+costoPlanchasporEtiquetatd+calcularValorTotalTintastd+transporteCiudadpreciotd+constoTerminacion+costoTroqueltd+recargoTrnsporteFtd;
        let subtotal=parseFloat(costo_total);
        var utilildadtd= parseFloat(subtotal*parseFloat(watch('utilidad'))/100)
        var comisiontd = parseFloat(subtotal*parseFloat(watch('comision'))/100)
        costo_total=parseFloat(subtotal)+parseFloat(utilildadtd)+parseFloat(comisiontd);
        var costo_totaltd = parseFloat(Math.round(costo_total));
        let cotizando ={
            'coti':coti,
            'cantidadtd':cantidadtd,
            'materialValorpreciotd':materialValorpreciotd,
            'acabadoValorpreciotd':acabadoValorpreciotd,
            'coldValorpreciotd':coldValorpreciotd,
            'Costo_total_maquinatd':Costo_total_maquinatd,
            'horas_maquina':horas_maquina,
            'precioGraduacionPlanchastd':precioGraduacionPlanchastd,
            'CambPlanchastd':CambPlanchastd,
            'GradPARtd':GradPARtd,
            'CambiosTintastd':CambiosTintastd,
            'PrepTintastd':PrepTintastd,
            'costoPlanchasporEtiquetatd':costoPlanchasporEtiquetatd,
            'calcularValorTotalTintastd':calcularValorTotalTintastd,
            'transporteCiudadpreciotd':transporteCiudadpreciotd,
            'costo_totaltd':costo_totaltd,
            'constoTerminacion':constoTerminacion,
            'costoTroqueltd':costoTroqueltd,
            'recargoTrnsporteFtd':recargoTrnsporteFtd,
            'utilildadtd':utilildadtd,
            'comisiontd':comisiontd,
            'preciosherpa':parseFloat(preciosherpa),
            'subtotal':subtotal,
            }
        
        return   cotizando;
    }
    
    const constructionCotizacion=()=>{  
        setAllCoti([])      
        for (let index = 1; index < 10; index++) {
            let cantidad_select="cantidad"+index;
            let cantidad_foto="difFotopolimero"+index;
            let cantidad_troquel="difTroquel"+index;
                if (parseFloat(watch(cantidad_select))>0){
                    let coOb = costoTotal(watch(cantidad_select),index,watch(cantidad_troquel),watch(cantidad_foto));
                    setAllCoti(prevData => [...prevData, coOb]);
                }
            
        }
        setMostrartabla(true);
    }
    const obtenerMaquinaPorNombre = (nombreProducto) => {
         let preciow = allDatas.maquinas.filter(maquina => maquina.nombre === nombreProducto);
         return preciow[0].precio
    };
    async function onSubmitForm(data) {
        
        try {
            let newData = { ...data, valoresGlobales: allCoti };
             newData = { ...newData, valoresGlobaleslength: allCoti.length };
            console.log(newData)
            const response = await ClientAxios.post(`/insertcotizacionReal`, newData)
            
            
           
            
         
        } catch (error) {
          
            console.log(error)
        }
    } 
   

    return (
        
        <>  {loadingIcon && <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-black" style={{height:"90%"}}   icon={faArrowsRotate}/></div>}
            {checkStatusView ? <></> :  checkStatus ? <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className=" fa-beat-fade text-success" style={{height:"90%"}}   icon={faCheck}/></div>:<div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-beat-fade text-danger" style={{height:"90%"}}   icon={faX}/></div>}
            
            {!allDatas?.clientes?<div className="navegadorOpenBody d-flex  h-100vh"><img
            className="mx-auto my-auto spin"
            src={logo}
            alt="Logo Argos"
          /></div>:<div id="contenedorbody" className=" navegadorOpenBody" >
                <form id="formularioCotizacion" method="POST" className="col-12 " style={{display: "flex", flexDirection: "row"}}>
                    <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>   
                        <div className="card scroll-divs-card"  style={{  marginBottom: "20px",  background: "#011034 " }}>
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
                                            <input type="text" className="form-control" id="cantidad7" {...register("cantidad7")} readOnly={true}  />
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
                                            <input type="text" className="form-control" id="entrega7" {...register("entrega7")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega7">Entrega 7</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega8" {...register("entrega8")} readOnly={true}  />
                                            <label style={{color:"#000000"}} htmlFor="entrega8">Entregas 8</label>
                                        </div>
                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difFotopolimero1" {...register("difFotopolimero1")}   />
                                            <label style={{color:"red"}} htmlFor="difFotopolimero1">Dif. Fotop. 1</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difFotopolimero2" {...register("difFotopolimero2")}   />
                                            <label style={{color:"red"}} htmlFor="difFotopolimero2">Dif. Fotop. 2</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difFotopolimero3" {...register("difFotopolimero3")}  />
                                            <label style={{color:"red"}} htmlFor="difFotopolimero3">Dif. Fotop. 3</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difFotopolimero4" {...register("difFotopolimero4")}   />
                                            <label style={{color:"red"}} htmlFor="difFotopolimero4">Dif. Fotop. 4</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difFotopolimero5" {...register("difFotopolimero5")}   />
                                            <label style={{color:"red"}} htmlFor="difFotopolimero5">Dif. Fotop. 5</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difFotopolimero6" {...register("difFotopolimero6")}   />
                                            <label style={{color:"red"}} htmlFor="difFotopolimero6">Dif. Fotop. 6</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difFotopolimero7" {...register("difFotopolimero7")}   />
                                            <label style={{color:"red"}} htmlFor="difFotopolimero7">Dif. Fotop. 7</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difFotopolimero8" {...register("difFotopolimero8")}   />
                                            <label style={{color:"red"}} htmlFor="difFotopolimero8">Dif. Fotop. 8</label>
                                        </div>
                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difTroquel1" {...register("difTroquel1")}   />
                                            <label style={{color:"red"}} htmlFor="difTroquel1">Dif. Troquel 1</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difTroquel2" {...register("difTroquel2")}   />
                                            <label style={{color:"red"}} htmlFor="difTroquel2">Dif. Troquel 2</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difTroquel3" {...register("difTroquel3")}  />
                                            <label style={{color:"red"}} htmlFor="difTroquel3">Dif. Troquel 3</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difTroquel4" {...register("difTroquel4")}   />
                                            <label style={{color:"red"}} htmlFor="difTroquel4">Dif. Troquel 4</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difTroquel5" {...register("difTroquel5")}   />
                                            <label style={{color:"red"}} htmlFor="difTroquel5">Dif. Troquel 5</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difTroquel6" {...register("difTroquel6")}   />
                                            <label style={{color:"red"}} htmlFor="difTroquel6">Dif. Troquel 6</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difTroquel7" {...register("difTroquel7")}   />
                                            <label style={{color:"red"}} htmlFor="difTroquel7">Dif. Troquel 7</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="difTroquel8" {...register("difTroquel8")}   />
                                            <label style={{color:"red"}} htmlFor="difTroquel8">Dif. Troquel 8</label>
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
                                    <hr style={{marginTop:" -1px", border: "#000000 2px solid"}}/>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                        <div className="form-floating  mx-auto p-1 col-12 ">
                                            <div className="form-control mx-auto" id="costoTroquel" style={{display: "flex", flexDirection:"row", height: "80px "}}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" {...register("costoTroquelTipo")} id="costoTroquelExistente" value="Existente"/>
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
                                                    <input className="form-check-input secondary" type="radio" {...register("costoTroquelTipo")} id="costoTroquelOtro" value="otro"/>
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

                                    <div className="accordion mx-auto p-1  " id="accordionRefTroquel" style={{width: "40% "}}>
                                        <div className="accordion-item">
                                                <button ref={toggleButtonTroquel} onClick={()=>setToggleButtonTroquelIsopen(!toggleButtonTroquelIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto">Ref. Troquel</p>
                                                    {toggleButtonTroquelIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                           
                                            <div id="collaTroquel"   className={`accordion-collapse collapse ${toggleButtonTroquelIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field :'id',
                                                        visible:false,
                                                    },
                                                    {
                                                        title: 'Referencia',
                                                        field :'referencia',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Unidad',
                                                        field :'unidadTroquel',
                                                        headerFilter:"input"
                                                    },
                                                    {
                                                        title: 'Ancho',
                                                        field :'anchoReal',
                                                        headerFilter:"input"
                                                    },
                                                    {
                                                        title: 'Around',
                                                        field :'around',
                                                        headerFilter:"input"
                                                    },
                                                    {
                                                        title: 'Across',
                                                        field :'across',
                                                        headerFilter:"input"
                                                    }]}
                                                    action={handleRowSelectedTroquel}
                                                    data={allDatas.referenciasTroquels}
                                                    />
                                               
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion mx-auto p-1" id="accordionPar" style={{width: "50% "}}>
                                        <div className="accordion-item">
                                        <button ref={toggleButtonPar} onClick={()=>setToggleButtonParIsopen(!toggleButtonParIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto">Unidad P.A.R.</p>
                                                    {toggleButtonParIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaPar"   className={`accordion-collapse collapse ${toggleButtonParIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Unidad',
                                                        field:'unidad',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Valor',
                                                        field:'valor',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Cortes',
                                                        field:'cortes',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.pars}
                                                    action={handleRowSelectedPar}
                                                    /> </div>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% "}}>
                                        <input type="text" className="form-control" id="CUnidad" {...register("CUnidad")} />
                                        <label style={{color:"#000000"}} htmlFor="CUnidad">Unidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% "}}>
                                        <input type="text" className="form-control" id="around" {...register("around")} />
                                        <label style={{color:"#000000"}} htmlFor="around">Around</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% "}}>
                                        <input type="text" className="form-control" id="across" {...register("across")}  />
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
                                        <input type="text" className="form-control" id="espacioexteriores" {...register("espacioexteriores")}  />
                                        <label style={{color:"#000000"}} htmlFor="espacioexteriores">Espacio en exterior</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="espacioentreetiquetas" {...register("espacioentreetiquetas")}  />
                                        <label style={{color:"#000000"}} htmlFor="espacioentreetiquetas">Espacio entre etiquetas</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1 " id="accordionMaterial" style={{width: "50% "}} >
                                        <div className="accordion-item">
                                        <button ref={toggleButtonMaterial} onClick={()=>setToggleButtonMaterialIsopen(!toggleButtonMaterialIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto">Material</p>
                                                    {toggleButtonMaterialIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaMaterial"   className={`accordion-collapse collapse ${toggleButtonMaterialIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Material',
                                                        field:'material',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Id lista',
                                                        field:'idLista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Lista',
                                                        field:'lista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Precio',
                                                        field:'precio',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.materials}
                                                    action={handleRowSelectedMaterial}
                                                    />
                                               
                                               </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioMaterial" {...register("precioMaterial")}  />
                                        <label style={{color:"#000000"}} htmlFor="precioMaterial">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoMaterialC" {...register("anchoMaterialC")} />
                                        <label style={{color:"#000000"}} htmlFor="anchoMaterialC">Ancho</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1" id="accordionAcabado" style={{width: "50% "}}>
                                        <div className="accordion-item">
                                                <button ref={toggleButtonAcabado} onClick={()=>setToggleButtonAcabadoIsopen(!toggleButtonAcabadoIsopen)} className="button  bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto">Acabado</p>
                                                    {toggleButtonAcabadoIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaacabado"   className={`accordion-collapse collapse ${toggleButtonAcabadoIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Acabado',
                                                        field:'acabado',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Id lista',
                                                        field:'idLista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Lista',
                                                        field:'lista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Precio',
                                                        field:'precio',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.acabados}
                                                    action={handleRowSelectedAcabado}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioAcabado" {...register("precioAcabado")} />
                                        <label style={{color:"#000000"}} htmlFor="precioAcabado">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoLaminacionC" {...register("anchoLaminacionC")} />
                                        <label style={{color:"#000000"}} htmlFor="anchoLaminacionC">Ancho Laminacion</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1" id="accordionCold" style={{width: "50% "}}>
                                        <div className="accordion-item">
                                        <button ref={toggleButtonCold} onClick={()=>setToggleButtonColdIsopen(!toggleButtonColdIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto">Cold Foild</p>
                                                    {toggleButtonColdIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaCold"   className={`accordion-collapse collapse ${toggleButtonColdIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Cold Foild',
                                                        field:'coldFoild',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Id lista',
                                                        field:'idLista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Lista',
                                                        field:'lista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Precio',
                                                        field:'precio',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.coldFoilds}
                                                    action={handleRowSelectedCold}
                                                    /> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioCold" {...register("precioCold")} />
                                        <label style={{color:"#000000"}} htmlFor="precioCold">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoColdC" {...register("anchoColdC")} />
                                        <label style={{color:"#000000"}} htmlFor="anchoColdC">Ancho Cold Foild</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1" id="accordionCold" style={{width: "50% "}}>
                                        <div className="accordion-item">
                                        <button ref={toggleButtonCold} onClick={()=>setToggleButtonHotStampingIsopen(!toggleButtonHotStampingIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto">Hot stamping</p>
                                                    {toggleButtonColdIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaCold"   className={`accordion-collapse collapse ${toggleButtonHotStampingIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Host stamping',
                                                        field:'hostStamping	',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Id lista',
                                                        field:'idLista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Lista',
                                                        field:'lista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Precio',
                                                        field:'precio',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.hotStampings}
                                                    action={handleRowSelectedHotStamping}
                                                    /> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioHotStamping" {...register("precioHotStamping")} />
                                        <label style={{color:"#000000"}} htmlFor="precioHotStamping">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoHotStamping" {...register("anchoHotStamping")} />
                                        <label style={{color:"#000000"}} htmlFor="anchoHotStamping">Ancho Cold Foild</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti1" {...register("CubrimientoCoti1")} />
                                        <label style={{color:"#000000"}} htmlFor="CubrimientoCoti1">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta1" {...register("tipoTinta1")} onChange={(e)=>setValue('grTinta1',parseFloat(e.target.selectedOptions[0].getAttribute('attr-precio'))*parseFloat(e.target.selectedOptions[0].getAttribute('attr-gramosM2')))} aria-label="tipoTinta1">
                                            <option  >Ninguno</option>
                                            {allDatas.tintas.map(tinta => (
                                                <option key={tinta.id} value={tinta.id} attr-precio={tinta.precioGramo}  attr-gramosM2={tinta.gramosM2 || 0}>
                                                    {tinta.tinta}
                                                </option>
                                            ))}
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipoTinta1">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta1" {...register("grTinta1")} readOnly={true} />
                                        <label style={{color:"#000000"}} htmlFor="grTinta1">$Gr. tinta (m²)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta1" {...register("PlanchasTinta1")} />
                                        <label style={{color:"#000000"}} htmlFor="PlanchasTinta1">Planchas</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti2" {...register("CubrimientoCoti2")} />
                                        <label style={{color:"#000000"}} htmlFor="CubrimientoCoti2">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta2" {...register("tipoTinta2")} onChange={(e)=>setValue('grTinta2',parseFloat(e.target.selectedOptions[0].getAttribute('attr-precio'))*parseFloat(e.target.selectedOptions[0].getAttribute('attr-gramosM2')))} aria-label="tipoTinta2">
                                            <option  >Ninguno</option>
                                            {allDatas.tintas.map(tinta => (
                                                <option key={tinta.id} value={tinta.id} attr-precio={tinta.precioGramo}  attr-gramosM2={tinta.gramosM2}>
                                                    {tinta.tinta}
                                                </option>
                                            ))}
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipoTinta2">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta2" {...register("grTinta2")} readOnly={true} />
                                        <label style={{color:"#000000"}} htmlFor="grTinta2">$Gr. tinta (m²)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta2" {...register("PlanchasTinta2")} />
                                        <label style={{color:"#000000"}} htmlFor="PlanchasTinta2">Planchas</label>
                                    </div>

                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti3" {...register("CubrimientoCoti3")} />
                                        <label style={{color:"#000000"}} htmlFor="CubrimientoCoti3">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta3" {...register("tipoTinta3")} onChange={(e)=>setValue('grTinta3',parseFloat(e.target.selectedOptions[0].getAttribute('attr-precio'))*parseFloat(e.target.selectedOptions[0].getAttribute('attr-gramosM2')))} aria-label="tipoTinta3">
                                            <option  >Ninguno</option>
                                            {allDatas.tintas.map(tinta => (
                                                <option key={tinta.id} value={tinta.id} attr-precio={tinta.precioGramo}  attr-gramosM2={tinta.gramosM2}>
                                                    {tinta.tinta}
                                                </option>
                                            ))}
                                           
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipoTinta3">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta3" {...register("grTinta3")} readOnly={true} />
                                        <label style={{color:"#000000"}} htmlFor="grTinta3">$Gr. tinta (m²)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta3" {...register("PlanchasTinta3")}  />
                                        <label style={{color:"#000000"}} htmlFor="PlanchasTinta3">Planchas</label>
                                    </div>

                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti4" {...register("CubrimientoCoti4")} />
                                        <label style={{color:"#000000"}} htmlFor="CubrimientoCoti4">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta4"  {...register("tipoTinta4")}  onChange={(e)=>setValue('grTinta4',parseFloat(e.target.selectedOptions[0].getAttribute('attr-precio'))*parseFloat(e.target.selectedOptions[0].getAttribute('attr-gramosM2')))} aria-label="tipoTinta4">
                                            <option  >Ninguno</option>
                                           {allDatas.tintas.map(tinta => (
                                                <option key={tinta.id} value={tinta.id} attr-precio={tinta.precioGramo}  attr-gramosM2={tinta.gramosM2}>
                                                    {tinta.tinta}
                                                </option>
                                            ))}
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipoTinta4">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta4" {...register("grTinta4")} readOnly={true} />
                                        <label style={{color:"#000000"}} htmlFor="grTinta4">$Gr. tinta (m²)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta4" {...register("PlanchasTinta4")} />
                                        <label style={{color:"#000000"}} htmlFor="PlanchasTinta4">Planchas</label>
                                    </div>

                                </div>

                            <hr style={{marginTop:" -1px", border: "#000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CambPlanchas" {...register("CambPlanchas")}  attr-precio="0"  />
                                        <label style={{color:"#000000"}} htmlFor="CambPlanchas">Camb. planchas</label>
                                    </div>
                                  
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="metros" {...register("metros")} readOnly={true}/>
                                        <label style={{color:"#000000"}} htmlFor="metros" >Metros lineales</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="avanceReal" {...register("avanceReal")}  readOnly={true}/>
                                        <label style={{color:"#000000"}} htmlFor="avanceReal" >Avance</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Graduaciones</h4>

                                <hr style={{marginTop:" -1px", border: "#000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="GradPlanchas" {...register("GradPlanchas")}  attr-precio="12000"  />
                                        <label style={{color:"#000000"}} htmlFor="GradPlanchas">#Grad. Planchas</label>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="GradPAR" {...register("GradPAR")}  attr-precio="20000" />
                                        <label style={{color:"#000000"}} htmlFor="GradPAR">#Grad. P.A.R.</label>
                                    </div>
                                    
                                    <div className="form-floating  mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="PrepTintas" {...register("PrepTintas")}  attr-precio="8000" />
                                        <label style={{color:"#000000"}} htmlFor="PrepTintas">#Prep. Tintas</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CambiosTintas" {...register("CambiosTintas")}  attr-precio="5000" />
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
                                                    <input className="form-check-input" type="radio" {...register("IRAdhesivo")} id="opnoG1" value="No"  attr-precio="0" />
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
                                                    <input className="form-check-input" type="radio" {...register("IRLiner")} id="opnoG2" value="No" attr-precio="0" />
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
                                                    <input className="form-check-input" type="radio" {...register("TroquelGraduacion")} id="opnoG3" value="No" attr-precio="0"/>
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
                                                    <input className="form-check-input" type="radio" {...register("ShokAir")} id="opnoG4" value="No" attr-precio="0" />
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
                                                    <input className="form-check-input" type="radio" {...register("ponchadoFc")} id="opnoG5" value="No" attr-precio="0" />
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
                                                    <input className="form-check-input" type="radio" {...register("MesaShetter")} id="opnoG6" value="No" attr-precio="0" />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="opnoG6">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="divg6">Mesa Shetter</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Impresion</h4>
                                <hr style={{marginTop:" -1px", border: "#000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-6 ">
                                        <div className="form-control" id="impresionV" style={{display: "flex", flexDirection: "column", height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("velocidadImp")} id="velocidadImp300" value="300"  />
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
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroq" value="Troq Bco" attr-precio={obtenerMaquinaPorNombre("Troq Bco")}  />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroq">
                                                        Troq Bco
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAqv1" value="Aq4 UV1" attr-precio={obtenerMaquinaPorNombre("Aq4 UV1")}/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqAqv1">
                                                        Aq4 UV1
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqUv5" value="AUV5 UV6" attr-precio={obtenerMaquinaPorNombre("UV5 UV6")}/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqUv5">
                                                        UV5 UV6
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="mt-3" style={{display: "flex", flexDirection:"row"}}>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>

                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAq6" value="Aq6 UV1" attr-precio={obtenerMaquinaPorNombre("Aq6 UV1")}/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqAq6">
                                                        Aq6 UV1
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAq7" value='Aq7 UV1 (13")' attr-precio={obtenerMaquinaPorNombre("Aq7 UV1 (13'')")}/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqAq7">
                                                        Aq7 UV1 (13")
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqTirama" value='Tirama' attr-precio={obtenerMaquinaPorNombre("Tirama")}/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="maquinaTroqTirama">
                                                        Tirama
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <label style={{color:"#000000"}} htmlFor="maquinadiv">Maquina</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Impresion variable en zebra</h4>
                                <hr style={{marginTop:" -1px", border: "#000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>


                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="etiqAlAncho" attr-precio="0"  {...register("etiqAlAncho")}/>
                                        <label style={{color:"#000000"}} htmlFor="etiqAlAncho">#Etiq. al ancho</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="avanceZebra" attr-precio="0" {...register("avanceZebra")} />
                                        <label style={{color:"#000000"}} htmlFor="avanceZebra">Avance (cms)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="RefDistintasZebra"   {...register("RefDistintasZebra")} attr-precio="5000"/>
                                        <label style={{color:"#000000"}} htmlFor="RefDistintasZebra">Ref. Distintas</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 " style={{width: "25% "}}>
                                        <select className="form-select" id="CintaZebra" {...register("CintaZebra")} >
                                            <option value="Cera" attr-precio="1.00">Cera</option>
                                            <option value="Resina" attr-precio="2.00">Resina</option>
                                            <option value="Cera Resina" attr-precio="1.50">Cera Resina</option>
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="CintaZebra" attr-precio="1.50">Cinta</label>
                                    </div>

                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Terminacion y empaque</h4>
                                <hr style={{marginTop:" -1px", border: "#000000 2px solid"}}/>
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
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="EtiqXRollo" {...register("etiqAlAncho")} attr-precio="0"/>
                                                    <label style={{color:"#000000"}} htmlFor="etiqAlAncho">#Etiq. X Rollo</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="EtiqXHoja1" {...register("etiqAlAncho")} attr-precio="0"/>
                                                    <label style={{color:"#000000"}} htmlFor="etiqAlAncho">#Etiq. X Hoja</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="EtiqXHoja2" {...register("etiqAlAncho")} attr-precio="0"/>
                                                    <label style={{color:"#000000"}} htmlFor="etiqAlAncho">#Etiq. X Hoja</label>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Recargo</h4>
                                <hr style={{marginTop:" -1px", border: "#000000 2px solid"}}/>
                                <div className="col-12 zoom90 " style={{ flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-12 ">
                                        <div className="form-control" id="" style={{display: "flex", flexDirection: "column", height: "330px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteCM" value="Corte Manual" />
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="recargoTrnsporteCM">
                                                        Corte Manual
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteDM" value="Doblado Manual"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="recargoTrnsporteDM">
                                                        Doblado Manual
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteCR" value="Reproceso de Corte y Rebobinado"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="recargoTrnsporteCR">
                                                        Reproceso de Corte y Rebobinado
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteOtro" value="otro"/>
                                                    <label style={{color:"#000000"}} className="form-check-label" htmlFor="recargoTrnsporteOtro">
                                                        Otro recargo
                                                    </label>
                                                </div>
                                               
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteCMCosto" {...register("recargoTrnsporteCMCosto")} />
                                                    <label style={{color:"#000000"}} htmlFor="recargoTrnsporteCMCosto">$ Valor</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteDMCosto" {...register("recargoTrnsporteDMCosto")} />
                                                    <label style={{color:"#000000"}} htmlFor="recargoTrnsporteDMCosto">$ Valor</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteCRCosto" {...register("recargoTrnsporteCRCosto")} />
                                                    <label style={{color:"#000000"}} htmlFor="recargoTrnsporteCRCosto">$ Valor</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteOtroCosto" {...register("recargoTrnsporteOtroCosto")} />
                                                    <label style={{color:"#000000"}} htmlFor="recargoTrnsporteOtroCosto">$ Valor</label>
                                                </div>
                                            </div>
                                            <h4 className="col-12 text-black mt-4" style={{textAlign: "center"}}>Ciudad de envio</h4>
                                            <hr style={{width:"100%" ,marginTop: "10px", border: "#000000 2px solid"}}/>
                                            <div style={{display: "flex", flexDirection:"row", marginTop: "5px"}}>
                                            <div className="form-floating  mx-auto p-1 col-6">
                                                <input type="text" className="form-control" id="ciudad" readOnly={true}  />
                                                <label style={{color:"#000000"}} htmlFor="ciudad">Ciudad/es</label>

                                            </div>
                                            <div className="form-floating mx-auto p-1 col-4 " >
                                                <select className="form-select bg-secondary-subtle-r " id="ciudadEnvio" {...register("ciudadEnvio",{required:'campo requerido'})} >
                                                    <option value={""} >Seleccionar</option>
                                                    <option value={"aburra"} att-precio="16627">Valle de aburra</option>
                                                    <option value={"Ciudad Principal"} att-precio="22367">Ciudad Principal</option>
                                                    <option value={"Ciudad Secundaria"} att-precio="21889">Ciudad Secundaria</option>
                                                    <option value={"Ciudad Terciara"} att-precio="30464">Ciudad Terciara</option>
                                                    <option value={"Ciudad especial 1"} att-precio="55535">Ciudad especial 1</option>
                                                    <option value={"Ciudad especial 2"} att-precio="125146">Ciudad especial 2</option>


                                                </select>
                                                <label style={{color:"#000000"}} htmlFor="ciudadEnvio">Ciudad de envio</label>
                                            </div>
                                            <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="cajas" {...register("cajas")} />
                                                    <label style={{color:"#000000"}} htmlFor="cajas">Cajas</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Valores internos</h4>
                                <hr style={{marginTop:" -1px", border: "#000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="sherpa" attr-precio="20000"  {...register("sherpa")}/>
                                        <label style={{color:"#000000"}} htmlFor="sherpa">Sherpa</label>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="utilidad" attr-precio="0"  {...register("utilidad")}/>
                                        <label style={{color:"#000000"}} htmlFor="utilidad">Utilidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="comision" attr-precio="0" {...register("comision")} />
                                        <label style={{color:"#000000"}} htmlFor="comision">Comision</label>
                                    </div>
                                  

                                </div>
                                <div className="col-12" style={{display: "flex", flexDirection:"row"}}>
                                    <button id="cotizarB" type="button" className="btn btn-success mx-auto col-8 text-black mt-3 mb-2 p-2" onClick={constructionCotizacion}>Cotizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </form>
            
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
                                        {title:'Costo Maquina',field:'Costo_total_maquinatd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Horas Maquina',field:'horas_maquina'},
                                        {title:'Costo Graduación Planchas',field:'precioGraduacionPlanchastd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Cambio de plancha',field:'CambPlanchastd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Graduación P.A.R',field:'GradPARtd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Cambio de tintas',field:'CambiosTintastd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo Prep. tintas',field:'PrepTintastd',formatter:"money", formatterParams:{
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
                                        {title:'Costo Transporte',field:'transporteCiudadpreciotd',formatter:"money", formatterParams:{
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
                                        {title:'Costo Sherpa',field:'preciosherpa',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Subtotal',field:'subtotal',formatter:"money", formatterParams:{
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
                                        
                                        {title:'Costo Total',field:'costo_totaltd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title: 'Acciones', field: 'acciones', formatter: function(cell, formatterParams, onRendered){
                                            // Crear el botón
                                            const button = document.createElement("button");
                                            button.className = "btn btn-primary";
                                            button.innerHTML = `
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-pdf" class="svg-inline--fa fa-file-pdf " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width:16px;height:16px;">
                                                    <path fill="currentColor" d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"></path>
                                                </svg>`;
                                
                                            // Agregar evento click al botón
                                            button.addEventListener("click", function() {
                                                const rowData = cell.getRow().getData(); // Obtener los datos de la fila actual
                                                const currentData = watch();
                                                setDataTableCotizacion(rowData);
                                                setDataform(currentData);
                                                setVerPdf(true)                                               
                                                // Aquí puedes agregar más lógica, como abrir un modal o redirigir a otra página
                                            });
                                
                                            // Devolver el botón con el SVG
                                            return button;
                                        }}
                                    ]}
                                    action={handleRowSelectedCoti}
                                    data={allCoti}
                                    
                                    ></TabulatorTable>
                                    <div className="mt-4"><button className="btn btn-success" onClick={()=>onSubmitForm(watch())} >Guardar cotizaciones</button></div>
                        </div>
                        
                    </div>
                    }
                {verPdf && 
                    <div className="bg-success  top-50 start-50 translate-middle" style={{position:"fixed",width:"100vw",height:"100vh",zIndex:"400"}}>
                        <div className="bg-body rounded top-50 start-50 translate-middle p-4" style={{position:"fixed",width:"85vw",height:"80vh",zIndex:"500"}}>
                                    <button   onClick={()=>setVerPdf(false)} style={{position:"absolute",top:8,right:8,width:"30px",height:"30px",display:"flex",alignItems:"center",alignContent:"center"}}><FontAwesomeIcon
                                        icon={faX}
                                        
                                        className=" my-auto mx-auto bg-body"
                                    
                                    /></button>
                                    <div className="mt-4">
                                        <CotizacionPdf dataTableCotizacion={dataTableCotizacion} dataform={dataform}></CotizacionPdf>

                                    </div>
                                  
                        </div>
                        
                    </div>
                    }
                                        
            </div>
            }
        
        </>);
}
export default Cotizacion;