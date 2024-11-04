import React, { useState } from 'react';
import ClientAxios from '../config/ClientAxios';
import { useForm } from 'react-hook-form';

const FileUploadForm = ({setFilName}) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        control,
        watch,
        formState: { errors },
      } = useForm();
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onsubmit = async (event) => {
        

        if (!file) {
            setMessage('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await ClientAxios.post('/fileCotizacion', formData);
            setFilName(response.data)
            setMessage(response.data);
        } catch (error) {
            setMessage('Error al subir el archivo: ' + error.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)} className='col-12' style={{display:"flex",width:"100%"}}>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <input className="form-control " name='files' style={{height:"100%"}} type="file" id="formFile" ccept=".pdf, .jpg" onChange={handleFileChange} />
                    
                    <input className="btn  mx-auto  my-auto " style={{background:"#498ac2"}} type="button" value="Subir" onClick={handleSubmit(onsubmit)}/>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUploadForm;
