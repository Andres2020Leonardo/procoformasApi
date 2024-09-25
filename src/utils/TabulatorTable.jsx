
import jsPDF from "jspdf";
import React, { useEffect, useState,useRef } from "react"; 
import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css";
import "jspdf-autotable"; 
const TabulatorTable = ({ data,columns,action=null }) => {
  const tableRef = useRef(null);
  let tabla;
  const localeConfig = {
    "es-es": {
      pagination: {
        first: "Primera",
        first_title: "Primera Página",
        last: "Última",
        last_title: "Última Página",
        prev: "Anterior",
        prev_title: "Página Anterior",
        next: "Siguiente",
        next_title: "Página Siguiente",
        page_size: "Mostrar",
      },
      headerFilters: {
        default: "", // Placeholder para los filtros de encabezado
      },
      groups: {
        item: "elemento", // Singular
        items: "elementos", // Plural
      },
      columns: {
        // Placeholder para búsqueda en columnas
        title: "Título",
      },
      data: {
        loading: "Cargando...", // Mensaje durante la carga de datos
        error: "Error", // Mensaje de error de carga
      },
     
      
    },
  };


  
  

  useEffect(() => {
    if (tableRef.current) {
      console.log(data)
      tabla=new Tabulator(tableRef.current, {
        data: data,
        columns: columns,
        layout: 'fitData',
        pagination: 'local',
        paginationSize: 10,
        paginationSizeSelector: [5, 10, 20, 50,100],
        selectableRows: 1,       
       
      });
   
        tabla.on("rowSelectionChanged", function(data){
          action(data)
        });
      
      
    }
  }, []);

   // Función para descargar la tabla como PDF
   const downloadPDF = () => {
    const doc = new jsPDF();
    const rows = tabla.getData(); // Obtener los datos de la tabla

    // Agregar un título al PDF
    doc.text("Tabla de Datos", 10, 10);

    // Agregar los encabezados de las columnas
    const headers = columns.map(col => col.title);
    doc.autoTable({
      head: [headers],
      body: rows.map(row => columns.map(col => row[col.field])),
      startY: 20,
    });

    // Guarda el PDF
    doc.save("tabla.pdf");
  };
  return (
    <><button onClick={downloadPDF}>Descargar PDF</button><div ref={tableRef}></div></>
    
  );
};


export default TabulatorTable;
