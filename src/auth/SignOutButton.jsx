import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

/**
 * Renders a sign out button
 */
export const SignOutButton = () => {
  const handleLogout = (logoutType) => {
      localStorage.clear();
      window.location.reload();
   
  };

  return (
    <>
      <button
        className="text-primary left-5 mx-auto items-center d-flex " style={{transition: "width 0.1s ease-in-out",position:"absolute",bottom:"5px",flexDirection:"row",maxHeight:"40px",maxWidth:"12vw"}}
        type="button"
        onClick={() => handleLogout("popup")}
      >
        <FontAwesomeIcon
          className="text-primary  me-2"
          icon={faRightFromBracket}
        />
        <p className="hidden " style={{fontSize:"12px"}}>Cerrar Sesión</p>
      </button>
    </>
  );
};
