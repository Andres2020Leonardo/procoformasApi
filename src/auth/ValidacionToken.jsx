

import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientAxios from '../config/ClientAxios';
import Decrypt from '../config/Decrypt';
import Login from './login';
const ValidacionToken = ({ children }) => {
  const navigate = useNavigate();
  const [loginApp,setLoginApp]=useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoginApp(true)
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
          }else{
            setLoginApp(true)
          }
          
        } catch (error) {
          setLoginApp(true)
          console.error('Error fetching data:', error);
        } f
      }
      fetchData();
      
    }
  }, [navigate]);

  return (
    <>
      {loginApp?<Login/>:children}
    </>
  );
};

export default ValidacionToken;
