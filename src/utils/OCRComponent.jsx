import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function OCRComponent() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log("URL",e.target.files[0])
  };

  const handleExtractText = () => {
    try {
        Tesseract.recognize(
            image,
            'eng', // Idioma en español
            {
             
              logger: (m) => console.log(m),
            }
          ).then(({ data: { text } }) => {
            setText(text);
          }).catch(err => {
            console.error("Error en el reconocimiento:", err);
          });
    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <div>
      <h1>OCR con Tesseract.js</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Imagen cargada" width="300" />}
      <button onClick={handleExtractText}>Extraer texto</button>
      <p>Texto extraído: {text}</p>
    </div>
  );
}

export default OCRComponent;
