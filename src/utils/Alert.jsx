import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Alert = ({ alert, setAlert = null }) => {
  useEffect(() => {
    if (setAlert && typeof setAlert === "function") {
      setTimeout(() => {
        setAlert({});
      }, 8000);
    }
  }, []);

  return (
    <div
      className={`d-flex  mx-auto  text-white w-100 mt-3 rounded ${
        alert.error ? "bg-danger" : `bg-success `
      } `}
    >  <div className="col mx-auto ">
        <div className="p-1 ">
        {alert.error ? (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className=" me-2 "
          />
        ) : (
          <FontAwesomeIcon icon={faCircleCheck} className=" mr-2 sm:w-5" />
        )}
      </div>
      <p className={``}>{alert.msg}</p>
    </div>
      
    </div>
  );
};

Alert.propTypes = {
  /** la propiedad msj se usa para definir el mensaje que se quiere enviar en la alerta y la propiedad error para definir si es una alerta de error o de confirmación  */
  alert: PropTypes.exact({
    msg: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
  }),
  /** Esta funcion se utiliza para cerrar el mensaje de alerta */
  setAlert: PropTypes.func,
};

export default Alert;
