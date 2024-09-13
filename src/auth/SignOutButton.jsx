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
        className="text-primary left-5 mx-auto  d-flex my-auto" style={{transition: "width 0.6s ease-in-out",flexDirection:"row",width:"100%",background:"transparent",justifyContent:"center"}}
        type="button"
        onClick={() => handleLogout("popup")}
      >
        <FontAwesomeIcon
          className="text-primary  me-2"
          icon={faRightFromBracket}
        />
        <p className="hidden  my-auto" style={{fontSize:"13px",whiteSpace:"nowrap"}}>Cerrar Sesión</p>
      </button>
    </>
  );
};
