
import React, { useEffect, useState,useRef } from "react"; 
import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css";

const TabulatorTable = ({ data,columns,action }) => {
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
      tabla=new Tabulator(tableRef.current, {
        data: data,
        columns: columns,
        layout: 'fitData',
        pagination: 'local',
        paginationSize: 5,        
        selectableRows: 1,       
       
      });
      tabla.on("rowSelectionChanged", function(data){
        action(data)
      });
    }
  }, []);

 
  return (
    <div ref={tableRef}></div>
  );
};


export default TabulatorTable;
