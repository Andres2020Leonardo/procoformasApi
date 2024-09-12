

import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientAxios from '../config/ClientAxios';
import Decrypt from '../config/Decrypt';
import Login from './login';
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
        } f
      }
      fetchData();
      
    }
  }, [navigate]);

  return (
    <>
      {view?loginApp?<Login/>:children:<></>}
    </>
  );
};

export default ValidacionToken;
