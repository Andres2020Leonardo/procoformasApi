import React, { useRef, useState } from 'react';

const ColorAnalyzer = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [precision, setPrecision] = useState(0.9);
  const [maxColors, setMaxColors] = useState(10);
  const [detectPantone, setDetectPantone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileSelect({ target: { files: [file] } });
    }
  };

  const analyzeImage = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('min_precision', precision);
    formData.append('max_colors', maxColors);
    formData.append('detect_pantone', detectPantone);

    setLoading(true);
    setResults(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/analysis/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Analizador de Colores Flexo</h1>

      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        <p>Arrastra tu imagen aquí o haz clic para seleccionar</p>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Vista previa"
            style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }}
          />
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Precisión:
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.05"
            value={precision}
            onChange={(e) => setPrecision(parseFloat(e.target.value))}
          />
          <span style={{ marginLeft: '10px' }}>{precision}</span>
        </label>

        <label>
          Máx. colores:
          <input
            type="number"
            min="1"
            max="20"
            value={maxColors}
            onChange={(e) => setMaxColors(parseInt(e.target.value))}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={detectPantone}
            onChange={(e) => setDetectPantone(e.target.checked)}
          />
          Detectar Pantone
        </label>

        <button
          onClick={analyzeImage}
          disabled={!imageSrc || loading}
          style={{ padding: '10px', marginTop: '10px' }}
        >
          Analizar Imagen
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Analizando imagen...</p>}

      {results && (
        <div style={{ marginTop: '20px' }}>
          {results.error ? (
            <p style={{ color: 'red' }}>Error: {results.error}</p>
          ) : (
            <>
              <h3>Resultados del Análisis</h3>
              <p>Total colores encontrados: {results.total_colors}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {results.colors.map((color, index) => (
                  <div
                    key={index}
                    style={{
                      width: '50px',
                      height: '50px',
                      margin: '5px',
                      backgroundColor: color.hex || '#fff',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-25px',
                        fontSize: '10px',
                        color: '#000',
                      }}
                    >
                      {color.hex}<br />
                      {(color.proportion * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorAnalyzer;
