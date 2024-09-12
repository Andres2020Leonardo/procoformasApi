
const logo ='./img/JAT1.png';
import { useForm } from 'react-hook-form';
import ClientAxios from '../config/ClientAxios';
import './login.css'
import { useNavigate } from 'react-router-dom';
import Encrypt from '../config/Encrypt';
import Config from '../config/config';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import axios from 'axios';
import { faArrowsRotate, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const login=()=> {    const navigate = useNavigate();
    const [loadingIcon,setLoadingIcon] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [alert, setAlert] = useState({msg:"",error:false});
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        control,
        watch,
        formState: { errors },
      } = useForm();
    async function handleCaptchaChange(value) {
        
        setCaptchaToken(value)
        if(false){
            setAlert({msg:"reCaptcha listo",error:true})
        }
        setTimeout(() => {
            setAlert({msg:"",error:false})
        }, 3000);
        
    }
    const onSubmit = async (data) => {
        setLoadingIcon(true)
        if(captchaToken){
            
            try {
                const response = await ClientAxios.post(`/login`, data)
                if (response.data.token) {
                  
                  localStorage.setItem("token", Encrypt(response.data.token));
                  localStorage.setItem("SesionToken", Encrypt(response.data.email));
                  localStorage.setItem("AcessToken", Encrypt(response.data.rol));
                  localStorage.setItem("NameToken", Encrypt(response.data.name));
                  document.location.reload();
                  setLoadingIcon(false)
                } else {
                  setAlert({msg:"Credenciales incorrectas",error:false})
                  setTimeout(() => {
                        setAlert({msg:"",error:false})
                    }, 4000);
                  setLoadingIcon(false)
                  localStorage.clear();
                }
                
              } catch (error) {
                setAlert({msg:"Credenciales incorrectas o error de servidor",error:false})
                  setTimeout(() => {
                        setAlert({msg:"",error:false})
                    }, 4000);
                    setLoadingIcon(false)
                  localStorage.clear();
                  console.log(error)
              }
        }else{
            setAlert({msg:"Realizar la validación de reCaptcha",error:false})
            setTimeout(() => {
                  setAlert({msg:"",error:false})
              }, 4000);
            setLoadingIcon(false)
        }
        
      };
    
      const Alert=()=>{
            return(
                <>
                    <div className={`p-1  mt-2 mb-2 ${alert.error?"text-success":"text-danger"}`} style={{height:"30px",width:"100%"}}>
                        <FontAwesomeIcon className={` fa-beat-fade ${alert.error?"text-success":"text-danger"}  me-2`} style={{height:"90%"}}   icon={alert.error?faCheck:faX} />{alert.msg}
                    </div>
            
                </>
            );
      }

    
    return(
        <>
        {loadingIcon && <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-white" style={{height:"90%"}}   icon={faArrowsRotate}/></div>}
                    
        <div className='position-fixed h-100vh w-100vw top-0 start-0 fondo' style={{overflowY:"auto" ,backgroundRepeat: "repeat", backgroundPosition: "center center",backgroundSize: "cover"}}>
            <div className="wrapper fadeInDown" style={{zoom: "85%"}}>
                <div id="formContent" className="">
                    <img src={logo} className="mi-div-flotante" />
                    <br/>
                    <h2 className="active" style={{marginTop: "10px"}}> Iniciar sesión</h2>

                    <div className="fadeIn first">

                    </div>

                    <form  onSubmit={handleSubmit(onSubmit)} method="POST" id="formlogin">
                        <input type="text" id="emailL" className="fadeIn second" {...register("email")}  placeholder="Correo electronico" required/>
                        <input type="password" id="password" className="fadeIn third"  {...register("password")} placeholder="Contraseña" required/>
                        <div className="" style={{display: "flex",
                        justifyContent: "center",
                        alignItems: "center", padding: "10px" }}><ReCAPTCHA
                        sitekey="6LfFBUEqAAAAACguzSxGNgCykyx940qDaIuwnqhp"
                        onChange={handleCaptchaChange}
                      />
                      </div>
                        <p className=" bold text-warning align-middle my-auto " style={{margin: "30%",fontSize: "15px", verticalAlign: "middle" ,display: "flex" ,alignItems: "center" }}  ></p>
                        {alert.msg!=="" && <><Alert/></>}
                        <input type="submit" style={{background: "#379e46"}}  className="fadeIn fourth" value="Iniciar sesion"/>
                    </form>
                    
                    <div id="formFooter">
                        
                        <a data-bs-toggle="modal" data-bs-target="#modalex" className="underlineHover" href="#">¿Olvido su contraseña?</a>
                    </div>

                </div>
            </div>
            <div className="modal fade" id="modalex" tabIndex="-1" aria-labelledby="modalexLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Soporte</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            contactar a servicio técnico
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                        </div>
                    </div>
                </div>

            </div>
            <footer className="footer" style={{backgroundColor: "#425fa0" ,   marginTop: "auto"}}>
                <div className="pt-4 text-center">
                    <p style={{color: "#ffffff"}}>© 2024 Procoformas S.A.S</p>
                </div>
                <div className="footer-links pb-1" style={{boxSizing: "border-box", display: "flex", flexDirection: "row"}}>
                    <p className="mx-auto"><a style={{color: "#ffffff",fontWeight: "700"}} href="https://procoformas.com">Pagina web</a></p>
                    </div>
            </footer>
        </div>
        
        </>


    );
}

export default login;
