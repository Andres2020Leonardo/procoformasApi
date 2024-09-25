import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import * as XLSX from 'xlsx';


function ImageOCR() {
  const [result, setResult] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Utiliza Tesseract.js para reconocer texto de la imagen
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
        // Extraer los números del texto reconocido
        const numbers = text.match(/\d+(\.\d+)?/g) || [];

        // Crear un nuevo libro de trabajo de Excel
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(numbers.map(number => ({ number })));
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

        // Guardar el libro de trabajo como un archivo Excel
        XLSX.writeFile(workbook, "resultados.xlsx");

        // Establecer el resultado de los números extraídos
        setResult(numbers.join(', '));
      } catch (error) {
        console.error('Error al reconocer el texto:', error);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h1>Reconocimiento de Texto OCR</h1>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick}>Subir Imagen</button>
      {result && (
        <div>
          <h2>Números Extraídos:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default ImageOCR;
