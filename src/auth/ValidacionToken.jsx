

import React, {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientAxios from '../config/ClientAxios';
import Decrypt from '../config/Decrypt';
const ValidacionToken = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
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
            navigate('/')
          }else{
            // localStorage.clear();
            // document.location.reload();
          }
          
        } catch (error) {
          // localStorage.clear();
          // document.location.reload();
          console.error('Error fetching data:', error);
        } finally {
        }
      }
      fetchData();
      
    }
  }, [navigate]);

  return (
    <>
      {children}
    </>
  );
};

export default ValidacionToken;
