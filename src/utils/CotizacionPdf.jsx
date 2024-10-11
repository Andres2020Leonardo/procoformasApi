import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ClientAxios from '../config/ClientAxios';
import Decrypt from '../config/Decrypt';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  headerItem: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  subheader: {
    border: '1px solid black',
    padding: 10,
    marginBottom: 0,
  },
  subheaderTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 15,
    marginRight:'auto',
    marginLeft:'auto',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  subheaderContent: {
    fontSize: 10,
  },
  body: {
    marginTop: 10,
  },
  bodyTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    display:'flex',
    marginRight:'auto',
    marginLeft:'auto',
    backgroundColor:'#9b9b9b'
  },
  comprasTable: {
    fontSize: 9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:"#c2c2c2",
    paddingBottom: 5,
    padding:1,
  },
  comprasTable2: {
    fontSize: 9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:"#FFFFFF",
    paddingBottom: 5,
    padding:1,
  },  
  comprasTableTitle: {
    display: 'flex',
    fontSize: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:"#0a0a0a",
    paddingBottom: 5,
    padding:1,
    color:"#FFFFFF"
  },
  comprasTableTitle2: {
    display: 'flex',
    fontSize: 10,
    padding:2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:"#0a0a0a",
    paddingBottom: 5,
    color:"#FFFFFF"
  },
  comprasTableTitle3: {
    display: 'flex',
    fontSize: 11,
    padding:2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  tableItem: {
    display:"flex",
    width: '20%',
    fontSize:9,
    textAlign: 'center',
    padding:0,
    justifyContent:"center",
    marginTop:"auto",
    marginBottom:"auto"
  },
  tableItem2: {
    display:"flex",
    width: '100%',
    fontSize:12,
    textAlign: 'center',
    padding:0,
    justifyContent:"center",
    marginTop:"auto",
    marginBottom:"auto",
    fontWeight:"bold"
  },
  tableHeader: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerItemCliente:{
    display:'flex',
    flexDirection:'column'
  }
});

const CotizacionPdf = ({ cotizacion=0,planeacion=1,data={nombreCliente:"familia",producto:"ETQ. seguridad Armonia"},dataTableCotizacion,dataform }) => {
  useEffect(() => {
    console.log(dataTableCotizacion)
    console.log(dataform)
  }, [])
  const fechaTime=new Date();
  const anio = fechaTime.getFullYear();
  const mes = ("0" + (fechaTime.getMonth() + 1)).slice(-2); // Los meses comienzan desde 0
  const dia = ("0" + fechaTime.getDate()).slice(-2);
  
  const fechaFormateada = `${anio}-${mes}-${dia}`;
  const diferido_foto="difFotopolimero"+dataTableCotizacion.coti;
  const diferido_troquel="difTroquel"+dataTableCotizacion.coti;
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerItem}>Anexo Solicitud Numero: {dataform.id || 0}</Text>
            <Text style={styles.headerItem}># Planeación: {dataTableCotizacion.coti}</Text>
            <Text style={styles.headerItem}>Fecha cotizacion: {dataform?.fechaCotizacion || fechaFormateada}</Text>
            <Text style={styles.headerItem}>Vigencia:  {dataform?.fechaVigencia || fechaFormateada}</Text>
          </View>
          <View style={styles.headerRow}>
            <div style={{fontSize: 10,fontWeight: 'bold',display:'flex',flexDirection:'column'}}>
                <Text>Cliente: {data?.cliente}</Text>
                <Text style={{marginTop:"4px",fontSize:"12px",fontWeight: 'bold'}}>{data?.nombreCliente}</Text>
            </div>
            <div style={{fontSize: 10,fontWeight: 'bold',display:'flex',flexDirection:'column'}}>
              <Text style={styles.headerItem}>Producto: {dataform?.producto}</Text>
              <Text style={{marginTop:"4px",fontSize:"8px"}}>({dataform.anchoEspe} X {dataform.avanceEspe}) - ({dataform.t1} X {dataform.t2} Tintas ) (#Refs. {dataTableCotizacion.coti})</Text>
              <Text style={{marginTop:"4px",fontSize:"8px",fontWeight: 'bold'}}>({dataform.material}) - ({dataform.anchoMaterialC}) Unidad : {dataform.CUnidad} # Around: {dataform.around} # Across: {dataform.across}</Text>
            </div>
          
          </View>
        </View>
  
        <View style={styles.subheader}>
          <Text style={styles.subheaderTitle}>PRECAUCIO: tenga encuenta que esta no es la cotización básica. La cotización básica es la # {cotizacion}:{planeacion}. esta difere en lo siguiente: </Text>
          <Text style={styles.subheaderContent}>Este es el contenido dentro del cuadro. Aquí se puede incluir cualquier tipo de texto adicional o información.</Text>
        </View>
  
        <View style={styles.body}>
          <Text style={styles.bodyTitle}>MATERIA PRIMAS E INSUMOS (POR ETIQUETA)</Text>
  
          <View style={styles.comprasTableTitle}>
            <Text style={[styles.tableItem, styles.tableHeader]}>Referencia</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor/etiqueta</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Referencia</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor/etiqueta</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor Global</Text>
          </View>
          
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Sobrante</Text>
            <Text style={styles.tableItem}>en revisión</Text>{/* valor sobrante */}
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Costo materia prima</Text>
            <Text style={styles.tableItem}>${parseFloat(dataTableCotizacion.materialValorpreciotd)/parseFloat(dataTableCotizacion.cantidadtd)}</Text>{/* valor material sobre cantidad */}
            <Text style={styles.tableItem}>Area etiqueta</Text>
            <Text style={styles.tableItem}>{parseFloat(dataform.anchoEspe)*parseFloat(dataform.avanceEspe)} Cm²</Text>{/* valor area etiqueta */}
            <Text style={styles.tableItem}>${parseFloat(dataTableCotizacion.materialValorpreciotd)/parseFloat(dataform.metros)}</Text>{/* valor material sobre metros */}
          </View>
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Costo de la tinta</Text>
            <Text style={styles.tableItem}>${parseFloat(dataTableCotizacion.calcularValorTotalTintastd)/parseFloat(dataTableCotizacion.cantidadtd)}</Text>{/* valor tinta sobre cantidad */}
            <Text style={styles.tableItem}>Gramos de tinta</Text>
            <Text style={styles.tableItem}>{(4*(parseFloat(dataform.anchoEspe)*parseFloat(dataform.avanceEspe)))/100000} Gr</Text>
            <Text style={styles.tableItem}>-</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Costo de barniz</Text>
            <Text style={styles.tableItem}>${parseFloat(dataTableCotizacion.acabadoValorpreciotd)/parseFloat(dataTableCotizacion.cantidadtd)}</Text>{/* valor tinta sobre cantidad */}
            <Text style={styles.tableItem}>Gramos de barniz</Text>
            <Text style={styles.tableItem}>{(4*(parseFloat(dataform.anchoEspe)*parseFloat(dataform.avanceEspe)))/100000} Gr</Text>
            <Text style={styles.tableItem}>-</Text>
          </View> 
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Costo de laminación</Text>
            <Text style={styles.tableItem}>$40 (pendiente)</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
          </View> 
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Costo de Cold Foild</Text>
            <Text style={styles.tableItem}>${parseFloat(dataTableCotizacion.coldValorpreciotd)/parseFloat(dataTableCotizacion.cantidadtd)}</Text>{/* valor tinta sobre cantidad */}
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Subtotal MP e Insumos</Text>
            <Text style={styles.tableItem}>${(parseFloat(dataTableCotizacion.materialValorpreciotd)+parseFloat(dataTableCotizacion.calcularValorTotalTintastd)+parseFloat(dataTableCotizacion.acabadoValorpreciotd)+parseFloat(dataTableCotizacion.coldValorpreciotd))/parseFloat(dataTableCotizacion.cantidadtd)} </Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
          </View> 
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyTitle}>DIFERIDOS (POR ETIQUETA)</Text>
  
          <View style={styles.comprasTableTitle}>
            <Text style={[styles.tableItem, styles.tableHeader]}>Referencia</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor/etiqueta</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Referencia</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor/etiqueta</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor Global</Text>
          </View>
          
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Costo fotopolimero</Text>
            <Text style={styles.tableItem}>${parseFloat(dataTableCotizacion.costoPlanchasporEtiquetatd)/parseFloat(dataTableCotizacion.cantidadtd)}</Text>
            <Text style={styles.tableItem}>Area fotopolimero</Text>
            <Text style={styles.tableItem}>{parseFloat(dataform.avanceReal)*parseFloat(dataform.anchoMaterialC)} Cm²</Text>
            <Text style={styles.tableItem}>-</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>Diferir en</Text>
            <Text style={styles.tableItem}>{dataform[diferido_foto]} Etiq.</Text>
            
          </View>
          <View style={styles.comprasTable}>
          <Text style={styles.tableItem}>Troquel P.A.R.</Text>
          <Text style={styles.tableItem}>$ {dataform.unidadPar!==null ? parseFloat(dataTableCotizacion.costoTroqueltd)/parseFloat(dataTableCotizacion.cantidadtd) : 0}</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Costo Troquel</Text>
            <Text style={styles.tableItem}>$ {dataform.unidadPar===null ? parseFloat(dataTableCotizacion.costoTroqueltd)/parseFloat(dataTableCotizacion.cantidadtd) : 0}</Text>
            <Text style={styles.tableItem}>Troquel</Text>
            <Text style={styles.tableItem}>Valor total Troquel</Text>
            <Text style={styles.tableItem}>$ {parseFloat(dataTableCotizacion.costoTroqueltd)}</Text>
            
          </View>
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}><Text style={{fontWeight:"bold"}}>{dataform.troquel_referencia}</Text></Text>
            <Text style={styles.tableItem}>Diferir en</Text>
            <Text style={styles.tableItem}>{dataform[diferido_troquel]} Etiq.</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Subtotal Diferidos</Text>
            <Text style={styles.tableItem}>${(parseFloat(dataTableCotizacion.costoPlanchasporEtiquetatd)/parseFloat(dataTableCotizacion.cantidadtd))+( parseFloat(dataTableCotizacion.costoTroqueltd)/parseFloat(dataTableCotizacion.cantidadtd))}</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
          </View> 
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyTitle}>GRADUACIONES E IMPRESION</Text>
  
          <View style={styles.comprasTableTitle}>
            <Text style={[styles.tableItem, styles.tableHeader]}>Referencia</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Cant.</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Tiempo/Valor</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Referencia</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Cant.</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Tiempo/Valor</Text>
          </View>
          
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Preparación Tintas</Text>
            <Text style={styles.tableItem}>{dataform.PrepTintas}</Text>
            <Text style={styles.tableItem}>${parseFloat(dataform.PrepTintas)*8000}</Text>
            <Text style={styles.tableItem}>Grad. Mesa Shetter </Text>
            <Text style={styles.tableItem}>{dataform.MesaShetter==="Si" ? '1' : '0'}</Text>
            <Text style={styles.tableItem}>{dataform.MesaShetter==="Si" ? '0h 15m' : '0h 00m'}</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Graduación Unid. imp.</Text>
            <Text style={styles.tableItem}>{dataform.GradPlanchas}</Text>
            <Text style={styles.tableItem}>{dataform.GradPlanchas===0 ? '0h 00m' : `0h ${parseFloat(dataform.GradPlanchas)*10}m`} - ${dataTableCotizacion.precioGraduacionPlanchastd}</Text>
            <Text style={styles.tableItem}>Grad. Delam/Relam</Text>
            <Text style={styles.tableItem}>0 (pendiente)</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
          </View>
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Grad. Cambio plancha</Text>
            <Text style={styles.tableItem}>{dataform.CambPlanchas}</Text>
            <Text style={styles.tableItem}>{dataform.CambPlanchas===0 ? '0h 00m' : `0h ${parseFloat(dataform.CambPlanchas)*10}m`} -{dataTableCotizacion.CambPlanchastd} </Text>
            <Text style={styles.tableItem}>Recargo Imp X Adhes.</Text>
            <Text style={styles.tableItem}>{dataform.IRAdhesivo==="Si"?1:0}</Text>
            <Text style={styles.tableItem}>$ {dataform.IRAdhesivo==="Si"?12000:0}</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Valor cambios tintas</Text>
            <Text style={styles.tableItem}>{dataform.CambiosTintas}</Text>
            <Text style={styles.tableItem}>${parseFloat(dataform.CambiosTintas)*5000}</Text>
            <Text style={styles.tableItem}>Grad. Volteo</Text>
            <Text style={styles.tableItem}>0 (pendiente)</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
          </View> 
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Grad. Troquel</Text>
            <Text style={styles.tableItem}>{dataform.TroquelGraduacion==="Si"?1:0}</Text>
            <Text style={styles.tableItem}> {dataform.TroquelGraduacion==="Si"?'0h 10m':'0h 00m'}</Text>
            <Text style={styles.tableItem}>Grad. Shok Air</Text>
            <Text style={styles.tableItem}>{dataform.ShokAir==="Si"?1:0}</Text>
            <Text style={styles.tableItem}> {dataform.ShokAir==="Si"?'0h 10m':'0h 00m'}</Text>
          </View> 
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Grad. P.A.R.</Text>
            <Text style={styles.tableItem}>{dataform.GradPAR}</Text>
            <Text style={styles.tableItem}>0h 10m - $ {parseFloat(dataform.GradPAR)*20000}</Text>
            <Text style={styles.tableItem}>Grad. Ponchado</Text>
            <Text style={styles.tableItem}>{dataform.ponchadoFc==="Si"?1:0}</Text>
            <Text style={styles.tableItem}>{dataform.ponchadoFc==="Si"?'0h 15m':'0h 00m'}</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>Maquina: {dataform.maquina}</Text>
            <Text style={styles.tableItem}>Velocidad:</Text>
            <Text style={styles.tableItem}>{dataform.velocidadImp}</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Costo Impresión</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>$41.404</Text>
            <Text style={styles.tableItem}>Impresión de {dataform.metros}</Text>
            <Text style={styles.tableItem}>Tiempo</Text>
            <Text style={styles.tableItem}>{dataTableCotizacion.horas_maquina}</Text>
          </View> 
          
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyTitle}>OTROS PROCESOS</Text>
  
          <View style={styles.comprasTableTitle}>
            <Text style={[styles.tableItem, styles.tableHeader]}>Referencia</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor/etiqueta</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor/etiqueta</Text>
            <Text style={[styles.tableItem, styles.tableHeader]}>Valor Global</Text>
          </View>
          
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Costo imp. variable tipo cinta</Text>
            <Text style={styles.tableItem}>$0 (pendiente)</Text>
            <Text style={styles.tableItem}>Recargo corte manual</Text>
            <Text style={styles.tableItem}>$ {parseFloat(dataform.recargoTrnsporteCMCosto)/parseFloat(dataTableCotizacion.cantidadtd)|| 0}</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Doblado F.C.</Text>
            <Text style={styles.tableItem}>$ (pendiente)</Text>
            <Text style={styles.tableItem}>Recargo doblado manual</Text>
            <Text style={styles.tableItem}>$ {parseFloat(dataform.recargoTrnsporteDMCosto)/parseFloat(dataTableCotizacion.cantidadtd)|| 0}</Text>
            
          </View>
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Rebobinado y Empaque</Text>
            <Text style={styles.tableItem}>$ {parseFloat(dataform.constoTerminacion)/parseFloat(dataTableCotizacion.cantidadtd)|| 0}</Text>
            <Text style={styles.tableItem}>Recargo reproc. corte y rebobinado</Text>
            <Text style={styles.tableItem}>$ {parseFloat(dataform.recargoTrnsporteCRCosto)/parseFloat(dataTableCotizacion.cantidadtd)|| 0}</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Transporte</Text>
            <Text style={styles.tableItem}>$ {parseFloat(dataform.transporteCiudadpreciotd)/parseFloat(dataTableCotizacion.cantidadtd) || 0}</Text>
            <Text style={styles.tableItem}>Otro recargo</Text>
            <Text style={styles.tableItem}>$ {parseFloat(dataform.recargoTrnsporteCRCosto)/parseFloat(dataTableCotizacion.cantidadtd) || 0}</Text>
            
          </View>
         
         
        </View>
        <View style={styles.body}>
  
        
         
          <View style={styles.comprasTableTitle2}>
            <Text style={styles.tableItem}>Comisión</Text>
            <Text style={styles.tableItem}>{dataform.comision} % - $ {dataTableCotizacion.comisiontd}</Text>
            <Text style={styles.tableItem}>Utilidad</Text>
            <Text style={styles.tableItem}>{dataform.utilidad} % - $ {dataTableCotizacion.utilildadtd}</Text>
            <Text style={styles.tableItem}></Text>
            <Text style={styles.tableItem}></Text>
          </View> 
          
        </View>
        <View style={styles.body}>
  
        
         
        <View  style={styles.comprasTableTitle3}>
          <Text  style={styles.tableItem2}>Precio para: {dataTableCotizacion.cantidadtd} Etiq. es de $ {parseFloat(dataTableCotizacion.costo_totaltd)/parseFloat(dataTableCotizacion.cantidadtd)} por Etiqueta</Text>
        </View> 
        
      </View>
      </Page>
    </Document>
  );
  return (
    <div>
       
        <PDFViewer style={{ width: '90%', height: '70vh' }}>
          <MyDocument />
        </PDFViewer>
     
    </div>
  );
};

export default CotizacionPdf;
