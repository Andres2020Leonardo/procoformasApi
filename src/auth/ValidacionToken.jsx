

import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientAxios from '../config/ClientAxios';
import Decrypt from '../config/Decrypt';
import Login from './login';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ValidacionToken = ({ children }) => {
  const navigate = useNavigate();
  const [view,setView]=useState(false);
  const [loginApp,setLoginApp]=useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoginApp(true)
      setView(true)
    }else{
      async function fetchData() {
        try {
          const email =Decrypt(localStorage.getItem("SesionToken"));
          const response = await ClientAxios.post(
            `/valideToken`,   {}, 
            {
              headers: {
                'User':  email, 
              }
            }
            
          );
          if(response.data.valideToken=="true"){
            setLoginApp(false)
            setView(true)
          }else{
            setLoginApp(true)
            setView(true)
          }
          
        } catch (error) {
          setLoginApp(true)
          setView(true)
          console.error('Error fetching data:', error);
        } 
      }
      fetchData();
      
    }
  }, [navigate]);

  return (
    <>
      {view?loginApp?<Login/>:children:<><div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-white" style={{height:"90%"}}   icon={faArrowsRotate}/></div></>}
    </>
  );
};

export default ValidacionToken;
