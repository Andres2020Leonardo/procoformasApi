import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ClientAxios from '../config/ClientAxios';
import Decrypt from '../config/Decrypt';

const styles = StyleSheet.create({
  page: { padding: 20, backgroundColor: '#E4E4E4' },
  section: { margin: 10, padding: 10, flexGrow: 1, },
  title: { fontSize: 20, marginBottom: 10, textAlign: 'center', },
  table: { display: 'table', width: '100%', margin: '10px 0', },
  tableRow: { margin: 'auto', width: '100%', flexDirection: 'row',},
  tableCell: { flex: 1, border: '1px solid black', padding: 5, textAlign: 'center', },
});

const CotizacionPDFViewer = ({ cotizacion }) => {
  const [cotizacionV, setCotizacionV] = useState(null);

  useEffect(() => {
    async function api() {
      try {
        const response = await ClientAxios.post(
          `/buscarCotizacion`,
          { solicitud: cotizacion },
          {
            headers: {
              User: Decrypt(localStorage.getItem('SesionToken')),
            },
          }
        );

        setCotizacionV(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    api();
  }, [cotizacion]);

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Cotización</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Campo</Text>
              <Text style={styles.tableCell}>Valor</Text>
              <Text style={styles.tableCell}>Notas</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>ID</Text>
              <Text style={styles.tableCell}>{cotizacionV?.id}</Text>
              <Text style={styles.tableCell}>Identificador único</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Tipo</Text>
              <Text style={styles.tableCell}>{cotizacionV?.tipoCotizacion}</Text>
              <Text style={styles.tableCell}>Tipo de cotización</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Fecha Cotización</Text>
              <Text style={styles.tableCell}>{new Date(cotizacionV?.fechaCotizacion).toLocaleDateString()}</Text>
              <Text style={styles.tableCell}>Fecha de creación</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Fecha Vigencia</Text>
              <Text style={styles.tableCell}>{new Date(cotizacionV?.fechaVigencia).toLocaleDateString()}</Text>
              <Text style={styles.tableCell}>Fecha hasta la cual es válida</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Cliente</Text>
              <Text style={styles.tableCell}>{cotizacionV?.cliente}</Text>
              <Text style={styles.tableCell}>ID del cliente</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Producto</Text>
              <Text style={styles.tableCell}>{cotizacionV?.producto}</Text>
              <Text style={styles.tableCell}>Código del producto</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Descripción</Text>
              <Text style={styles.tableCell}>{cotizacionV?.descripcionProducto}</Text>
              <Text style={styles.tableCell}>Descripción del producto</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Cantidad 1</Text>
              <Text style={styles.tableCell}>{cotizacionV?.cantidad1}</Text>
              <Text style={styles.tableCell}>Cantidad solicitada</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Observaciones</Text>
              <Text style={styles.tableCell}>{cotizacionV?.observaciones || 'Ninguna'}</Text>
              <Text style={styles.tableCell}>Notas adicionales</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
        {cotizacionV ? (
        <PDFViewer style={{ width: '100%', height: '400px' }}>
          <MyDocument />
        </PDFViewer>
      ) : (
        "Esperando PDF..."
      )}
    </div>
  );
};

export default CotizacionPDFViewer;
