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

const CotizacionPdf = ({ cotizacion=0,planeacion=1,data={nombreCliente:"familia",producto:"ETQ. seguridad Armonia"} }) => {
  
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerItem}>Anexo Solicitud Numero: {cotizacion}</Text>
            <Text style={styles.headerItem}># Planeación: {planeacion}</Text>
            <Text style={styles.headerItem}>Fecha cotizacion: {data?.fechaCotizacion}</Text>
            <Text style={styles.headerItem}>Vigencia:  {data?.fechaVigencia}</Text>
          </View>
          <View style={styles.headerRow}>
            <div style={{fontSize: 10,fontWeight: 'bold',display:'flex',flexDirection:'column'}}>
                <Text>Cliente: {data?.cliente}</Text>
                <Text style={{marginTop:"4px",fontSize:"12px",fontWeight: 'bold'}}>{data?.nombreCliente}</Text>
            </div>
            <div style={{fontSize: 10,fontWeight: 'bold',display:'flex',flexDirection:'column'}}>
              <Text style={styles.headerItem}>Producto: {data?.producto}</Text>
              <Text style={{marginTop:"4px",fontSize:"8px"}}>(17.50 X 12.0) - (2 X 0 Tintas + 0 Cambios) (#Refs. 1)</Text>
              <Text style={{marginTop:"4px",fontSize:"8px",fontWeight: 'bold'}}>(PBB-FR-G62) - (20.0) Unidad : 78 # Around: 2 # Across: 1</Text>
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
            <Text style={styles.tableItem}>19.42%</Text>
            <Text style={styles.tableItem}>Graduar</Text>
            <Text style={styles.tableItem}>492 Etiq.</Text>
            <Text style={styles.tableItem}>-</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Costo materia prima</Text>
            <Text style={styles.tableItem}>$40</Text>
            <Text style={styles.tableItem}>Area etiqueta</Text>
            <Text style={styles.tableItem}>24.65 Cm²</Text>
            <Text style={styles.tableItem}>$2.110.00 / M²</Text>
          </View>
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Costo de la tinta</Text>
            <Text style={styles.tableItem}>$40</Text>
            <Text style={styles.tableItem}>Gramos de tinta</Text>
            <Text style={styles.tableItem}>0.35489 Gr</Text>
            <Text style={styles.tableItem}>$2.110.00 / Gr</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Costo de barniz</Text>
            <Text style={styles.tableItem}>$40</Text>
            <Text style={styles.tableItem}>Gramos de barniz</Text>
            <Text style={styles.tableItem}>0.35489 Gr</Text>
            <Text style={styles.tableItem}>$2.110.00 / Gr</Text>
          </View> 
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Costo de laminación</Text>
            <Text style={styles.tableItem}>$40</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>$2.110.00 / Gr</Text>
          </View> 
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Costo de Cold Foild</Text>
            <Text style={styles.tableItem}>$40</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>$2.110.00 / Gr</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Subtotal MP e Insumos</Text>
            <Text style={styles.tableItem}>$40</Text>
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
            <Text style={styles.tableItem}>$49.53</Text>
            <Text style={styles.tableItem}>Area fotopolimero</Text>
            <Text style={styles.tableItem}>24.65 Cm²</Text>
            <Text style={styles.tableItem}>$100 Cm²</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>Diferir en</Text>
            <Text style={styles.tableItem}>3000 Etiq.</Text>
            
          </View>
          <View style={styles.comprasTable}>
          <Text style={styles.tableItem}>Troquel P.A.R.</Text>
          <Text style={styles.tableItem}>$0.00</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Costo Troquel</Text>
            <Text style={styles.tableItem}>$ 45.24</Text>
            <Text style={styles.tableItem}>Troquel</Text>
            <Text style={styles.tableItem}>Valor total Troquel</Text>
            <Text style={styles.tableItem}>$814.360</Text>
            
          </View>
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}><Text style={{fontWeight:"bold"}}>R-175</Text></Text>
            <Text style={styles.tableItem}>Diferir en</Text>
            <Text style={styles.tableItem}>$18.000</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Subtotal Diferidos</Text>
            <Text style={styles.tableItem}>$94.77</Text>
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
            <Text style={styles.tableItem}>2</Text>
            <Text style={styles.tableItem}>$16.000.00</Text>
            <Text style={styles.tableItem}>Grad. Mesa Shetter </Text>
            <Text style={styles.tableItem}>0</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Graduación Unid. imp.</Text>
            <Text style={styles.tableItem}>3</Text>
            <Text style={styles.tableItem}>0h 30m</Text>
            <Text style={styles.tableItem}>Grad. Delam/Relam</Text>
            <Text style={styles.tableItem}>0</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
          </View>
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Grad. Cambio plancha</Text>
            <Text style={styles.tableItem}>0</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
            <Text style={styles.tableItem}>Recargo Imp X Adhes.</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>$0</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Valor cambios tintas</Text>
            <Text style={styles.tableItem}>0</Text>
            <Text style={styles.tableItem}>$0</Text>
            <Text style={styles.tableItem}>Grad. Volteo</Text>
            <Text style={styles.tableItem}>0</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
          </View> 
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Grad. Troquel</Text>
            <Text style={styles.tableItem}>1</Text>
            <Text style={styles.tableItem}>0h 10m</Text>
            <Text style={styles.tableItem}>Grad. Shok Air</Text>
            <Text style={styles.tableItem}>0</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
          </View> 
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Grad. P.A.R.</Text>
            <Text style={styles.tableItem}>0</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
            <Text style={styles.tableItem}>Grad. Ponchado</Text>
            <Text style={styles.tableItem}>0</Text>
            <Text style={styles.tableItem}>0h 0m</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Tiempo Graduaciones</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>0h 40m</Text>
            <Text style={styles.tableItem}>MAquina</Text>
            <Text style={styles.tableItem}>Velocidad:</Text>
            <Text style={styles.tableItem}>750</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Costo Impresión</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>$41.404</Text>
            <Text style={styles.tableItem}>Impresión de </Text>
            <Text style={styles.tableItem}>Tiempo</Text>
            <Text style={styles.tableItem}>0h 35m</Text>
          </View> 
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Total Graduaciones e Impresion</Text>
            <Text style={styles.tableItem}>$104.404</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
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
            <Text style={styles.tableItem}>$0</Text>
            <Text style={styles.tableItem}>Recargo corte manual</Text>
            <Text style={styles.tableItem}>$0</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Doblado F.C.</Text>
            <Text style={styles.tableItem}>$0</Text>
            <Text style={styles.tableItem}>Recargo doblado manual</Text>
            <Text style={styles.tableItem}>$0</Text>
            
          </View>
          <View style={styles.comprasTable}>
            <Text style={styles.tableItem}>Rebobinado y Empaque</Text>
            <Text style={styles.tableItem}>$16.66</Text>
            <Text style={styles.tableItem}>Recargo reproc. corte y rebobinado</Text>
            <Text style={styles.tableItem}>$0</Text>
          </View>
          <View style={styles.comprasTable2}>
            <Text style={styles.tableItem}>Transporte</Text>
            <Text style={styles.tableItem}>$0</Text>
            <Text style={styles.tableItem}>Otro recargo</Text>
            <Text style={styles.tableItem}>$0</Text>
            
          </View>
         
          <View style={styles.comprasTableTitle}>
            <Text style={styles.tableItem}>Subtotal otros</Text>
            <Text style={styles.tableItem}>$16.66</Text>
            <Text style={styles.tableItem}>-</Text>
            <Text style={styles.tableItem}>-</Text>
          </View> 
        </View>
        <View style={styles.body}>
  
        
         
          <View style={styles.comprasTableTitle2}>
            <Text style={styles.tableItem}>Comisiones M. de I.</Text>
            <Text style={styles.tableItem}>3.0%</Text>
            <Text style={styles.tableItem}>Comisión Asesor</Text>
            <Text style={styles.tableItem}>3.0%</Text>
            <Text style={styles.tableItem}>Cotizado por:</Text>
            <Text style={styles.tableItem}>Cotizado por</Text>
          </View> 
          
        </View>
        <View style={styles.body}>
  
        
         
        <View  style={styles.comprasTableTitle3}>
          <Text  style={styles.tableItem2}>Precio para: 3000 Etiq. es de $315.00 por Etiqueta</Text>
        </View> 
        
      </View>
      </Page>
    </Document>
  );
  return (
    <div>
       
        <PDFViewer style={{ width: '90vw', height: '100vh' }}>
          <MyDocument />
        </PDFViewer>
     
    </div>
  );
};

export default CotizacionPdf;
