import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const logo = "./img/cdpLogo2.png";
  const logoOnly = "./img/JAT2.png";
  const cotizacion = "./img/icons/solicitud_cotizacion.png";
  const comercial = "./img/icons/ICONOS-03.png";
  const almacen = "./img/icons/almacen.png";
  return (
    <>
       
      <div
        className={`  w-6vw hover-w-13vw bg-api-p p-2 animacionMenu`}
        onMouseLeave={()=>setIsOpen(false)} style={{zIndex:100}}
      > 
        <div className="h-8vh p-2 mx-auto w-100"  style={{width:"100%"}}>
        <Link onClick={() => setActive(0)} to="/" className="w-100 mx-auto" >
          <img
            className="mx-auto h-5vh  view"
            src={logo}
            alt="Logo Argos"
          />
           
            <img
              className=" mx-auto h-5vh hidden "
              src={logoOnly}
              alt="Logo argos"
            />

        </Link>
        </div>
        
        <div className="  d-flex flex-column ">
        <Link
            onClick={()=>setIsOpen(!isOpen)}
            className={`${
              active == 1 && " bg-[#DDEB47] "
            } mt-3 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
          >
           
             <img
            className=" text-api-s me-1   my-auto "
                src={cotizacion}
                alt="Logo Argos"
                style={{height:"95%",Width:"auto", objectFit:"contain"}}
            />
            <p className="text-api-s  hidden overflow-hidden my-auto ">
              Cotización
            </p>
            
          </Link>
          <div className={`collapse ${isOpen && "show"}`} id="collapseExample">
                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          
            </div>
          <Link
            
            className={`${
              active == 1 && " bg-[#DDEB47] "
            } mt-3 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh`}
          >
           
             <img
            className=" text-api-s me-1   my-auto "
                src={comercial}
                alt="Logo Argos"
                style={{height:"95%",Width:"auto", objectFit:"contain"}}
            />
            <p className="text-api-s  hidden overflow-hidden my-auto ">
              Comercial
            </p>
          </Link>
          <Link
           
            className={`${
              active == 1 && " bg-[#DDEB47] "
            } mt-3 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh`}
          >
           
             <img
            className=" text-api-s me-1   my-auto "
                src={almacen}
                alt="Logo Argos"
                style={{height:"95%",Width:"auto", objectFit:"contain"}}
            />
            <p className="text-api-s  hidden overflow-hidden my-auto ">
              Almacen
            </p>
          </Link>
       
        </div>
      </div>
     </>
  );
};

export default Sidebar;
