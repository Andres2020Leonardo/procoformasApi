import { useContext } from "react";
import UserContext from "../auth/UserProvider";

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
