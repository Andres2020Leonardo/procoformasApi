import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const CertificadoLaboral = () => {
  // Estados para los datos del formulario
  const [empleado, setEmpleado] = useState({
    nombre: '',
    identificacion: '',
    cargo: '',
    fechaIngreso: '',
    fechaRetiro: '',
    salario: '',
    motivoRetiro: 'Terminación de contrato'
  });

  const certificadoRef = useRef();

  // Manejador de cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generar PDF
  const handlePrint = useReactToPrint({
    content: () => certificadoRef.current,
    documentTitle: `Certificado_Laboral_${empleado.nombre.replace(/\s+/g, '_')}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `
  });

  // Fecha actual formateada
  const fechaActual = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Componente del certificado que se imprimirá
  const CertificadoParaImprimir = React.forwardRef((props, ref) => (
    <div ref={ref} className="certificado-container">
      <div className="certificado-header">
        <h2>PROCOFORMAS SAS</h2>
        <p>Nit: 900.123.456-7</p>
        <p>Bogotá D.C., Colombia</p>
      </div>
      
      <div className="certificado-title">
        <h1>CERTIFICADO LABORAL</h1>
      </div>
      
      <div className="certificado-body">
        <p>El suscrito, <strong>Jorge López</strong>, en mi calidad de Gerente General de <strong>PROCOFORMAS SAS</strong>, 
        certifica que:</p>
        
        <p><strong>{empleado.nombre.toUpperCase()}</strong>, identificado(a) con {empleado.identificacion}, 
        laboró en nuestra empresa en el cargo de <strong>{empleado.cargo}</strong> desde el 
        <strong> {empleado.fechaIngreso ? new Date(empleado.fechaIngreso).toLocaleDateString('es-CO') : '______'} </strong>
        {empleado.fechaRetiro ? `hasta el ${new Date(empleado.fechaRetiro).toLocaleDateString('es-CO')}` : 'hasta la fecha'}.</p>
        
        <p>Durante su vinculación con nuestra compañía, el(la) señor(a) {empleado.nombre.split(' ')[0]} desempeñó sus funciones con 
        {empleado.motivoRetiro === 'Renuncia voluntaria' ? ' responsabilidad y dedicación' : ' compromiso y profesionalismo'}, 
        dejando constancia de sus capacidades profesionales y personales.</p>
        
        <p>El motivo de su retiro fue: <strong>{empleado.motivoRetiro}</strong>.</p>
        
        <p>Su salario básico al momento del retiro era de <strong>{empleado.salario || '______'}</strong>.</p>
        
        <p>Este certificado se expide a solicitud del interesado(a) para los fines que estime convenientes.</p>
        
        <p className="fecha">En Bogotá D.C., a {fechaActual}.</p>
        
        <div className="firma-container">
          <div className="firma-space"></div>
          <img 
            src="https://via.placeholder.com/200x100.png?text=Firma+Jorge+Lopez" 
            alt="Firma Jorge López" 
            className="firma-img"
          />
          <p className="firma-text">_________________________</p>
          <p className="firma-text"><strong>Jorge López</strong></p>
          <p className="firma-text">Gerente General</p>
          <p className="firma-text">PROCOFORMAS SAS</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div id="contenedorbody" className=" navegadorOpenBody" >
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Generador de Certificados Laborales</h1>
      <p>Procoformas SAS</p>
      
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Datos del Empleado</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre completo:</label>
          <input 
            type="text" 
            name="nombre" 
            value={empleado.nombre} 
            onChange={handleChange} 
            placeholder="Ej: María González Pérez"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Documento de identidad:</label>
          <input 
            type="text" 
            name="identificacion" 
            value={empleado.identificacion} 
            onChange={handleChange} 
            placeholder="C.C. 12.345.678"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cargo:</label>
          <input 
            type="text" 
            name="cargo" 
            value={empleado.cargo} 
            onChange={handleChange} 
            placeholder="Ej: Asesor Comercial"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha de ingreso:</label>
          <input 
            type="date" 
            name="fechaIngreso" 
            value={empleado.fechaIngreso} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha de retiro (opcional):</label>
          <input 
            type="date" 
            name="fechaRetiro" 
            value={empleado.fechaRetiro} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Salario:</label>
          <input 
            type="text" 
            name="salario" 
            value={empleado.salario} 
            onChange={handleChange} 
            placeholder="Ej: $2.500.000"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Motivo de retiro:</label>
          <select 
            name="motivoRetiro" 
            value={empleado.motivoRetiro} 
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="Terminación de contrato">Terminación de contrato</option>
            <option value="Renuncia voluntaria">Renuncia voluntaria</option>
            <option value="Despido">Despido</option>
            <option value="Liquidación">Liquidación</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        
        <button 
          onClick={handlePrint} 
          disabled={!empleado.nombre || !empleado.cargo}
          style={{
            background: !empleado.nombre || !empleado.cargo ? '#cccccc' : '#4CAF50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: !empleado.nombre || !empleado.cargo ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          Generar Certificado en PDF
        </button>
      </div>
      
      {/* Componente que se convertirá a PDF */}
      <div style={{ display: 'none' }}>
        <CertificadoParaImprimir ref={certificadoRef} />
      </div>
    </div>
    </div>
  );
};

export default CertificadoLaboral;