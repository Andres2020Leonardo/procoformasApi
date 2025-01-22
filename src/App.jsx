import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './layouts/sidebar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/Globals.less';
import ValidacionToken from './auth/ValidacionToken';
import NotFound from './utils/NotFound';
import Decrypt from './config/Decrypt';
import Pages from './pages/Pages';
import Encrypt from './config/Encrypt';

function App() {
  const [page, setPage] = useState("");
  const rol = localStorage.getItem("AcessToken") ? Decrypt(localStorage.getItem("AcessToken")) : 0;
  function addPage(p) {
    localStorage.setItem("page", Encrypt(p));
    const pageq = localStorage.getItem("page") ? Decrypt(localStorage.getItem("page")) : 'home';
    setPage(pageq);
  }
  useEffect(() => {
    function pageSelected() {
      const pageq = localStorage.getItem("page") ? Decrypt(localStorage.getItem("page")) : 'home';
      setPage(pageq)
    }
    pageSelected();
  }, [])
  
  // Crear el enrutador con las rutas
  const router = createBrowserRouter([
   
    {
      path: "/",
      element: (
        <ValidacionToken>          
          <div className="start-0 top-0 position-fixed h-100vh w-100vw d-flex flex-row">
            <Sidebar rol={rol} addPage={addPage} />
            <Pages page={page} setPage={setPage} />
          </div>
        </ValidacionToken>
      ),
    },
    {
      path: "*",
      element: <ValidacionToken><NotFound /></ValidacionToken>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
