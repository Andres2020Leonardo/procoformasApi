
import { useState } from 'react'


function solicitudCotizacion() {
    return(<>
<div className="navegadorOpen  navegadorScroll sidebar text-left" style={{background: "#011034"}}>
<div className="homeImg"><a className="col-9 mx-auto my-auto" href="/"><img className="mx-auto my-auto" src="./img/JAT2.png"/></a><button type="button" onclick="abrirCerrarMenu('cerrar')" className="btn my-auto btn-link col-3"><img className="mx-auto my-auto" th:src="@{/img/icons/MENU.png}"/></button></div>
<hr className="hrmenu mx-auto" />
<div className="accordion">
    <details>
        <summary className="text-white no-marker df-row" ><div className="col-3 my-auto img-menu"><img className="mx-auto  my-auto"  th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></div><p className="col-9 summap my-auto">Cotizaciones</p></summary>
        <div className="accordion-content mx-auto">
            <ul className="list-group mx-auto">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/solicitudCotizacion"><div className="col-3 my-auto"><img  th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></div><p className="col-9 summap  my-auto">Solicitud Cotización</p> </a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/cotizacion"><div className="col-3 my-auto"><img className="col-3 my-auto" th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></div> <p className="col-9 summap  my-auto">Cotización</p></a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/solicitudesCotizacion"><div className="col-3 my-auto"><img className="col-3 my-auto" th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></div> <p className="col-9 summap my-auto">Solicitudes</p></a>
                </li>
            </ul>
        </div>
    </details>
    <details>
        <summary className="text-white no-marker df-row redirect-button" data-value="/Comercial" ><div className="col-3 my-auto img-menu"><img className="mx-auto  my-auto" th:src="@{/img/icons/comercial.png}" alt=""/></div><p className="col-9 summap my-auto">Comercial</p></summary>
        <div className="accordion-content mx-auto">
        </div>
    </details>
    <details>
        <summary className="text-white no-marker df-row " ><div className="col-3 my-auto img-menu"><img className="mx-auto  my-auto" th:src="@{/img/icons/almacen.png}" alt=""/></div><p className="col-9 summap my-auto">Almacen</p></summary>
        <div className="accordion-content mx-auto">
            <ul className="list-group mx-auto">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/almacen-verificar"><div className="col-3 my-auto"><img  th:src="@{/img/alm_icon.png}" alt=""/></div><p className="col-9 summap  my-auto">Verificar</p> </a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/almacen-Recibir-material"><div className="col-3 my-auto"><img className="col-3 my-auto" th:src="@{/img/alm_icon.png}" alt=""/></div> <p className="col-9 summap  my-auto">Recibir</p></a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/almacen-Inventario"><div className="col-3 my-auto"><img className="col-3 my-auto" th:src="@{/img/alm_icon.png}" alt=""/></div> <p className="col-9 summap my-auto">Inventario</p></a>
                </li>

            </ul>
        </div>
    </details>
    <details>
        <summary className="text-white no-marker df-row" ><div className="col-3 my-auto img-menu"><img className="mx-auto  my-auto"  th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></div><p className="col-9 summap my-auto">Cotizaciones</p></summary>
        <div className="accordion-content mx-auto">
            <ul className="list-group mx-auto">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/solicitudCotizacion"><div className="col-3 my-auto"><img  th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></div><p className="col-9 summap  my-auto">Solicitud Cotización</p> </a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/cotizacion"><div className="col-3 my-auto"><img className="col-3 my-auto" th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></div> <p className="col-9 summap  my-auto">Cotización</p></a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a className="df-row" href="/solicitudesCotizacion"><div className="col-3 my-auto"><img className="col-3 my-auto" th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></div> <p className="col-9 summap my-auto">Solicitudes</p></a>
                </li>
            </ul>
        </div>
    </details>
</div>
</div>

<div className="navegadorClose navegadorScroll displaynone sidebar text-left"  style={{background: "#011034"}}>
<div className="homeImg"><button type="button" onclick="abrirCerrarMenu('abrir')" className="btn my-auto btn-link col-12"><img cerrar className="mx-auto my-auto" th:src="@{/img/icons/MENU.png}"/></button></div>

<hr className="hrmenu mx-auto" />
<div className="accordion">
    <details>
        <summary className="text-white no-marker " ><img className="mx-auto" cerrar th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></summary>
        <div className="accordion-content">
            <ul className="list-group mx-auto">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/solicitudCotizacion"><img th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/cotizacion"><img th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/solicitudesCotizacion"><img th:src="@{/img/icons/solicitud_cotizacion.png}" alt=""/></a>
                </li>
            </ul>
        </div>
    </details>
    <details>
        <summary className="text-white no-marker  align-items-center redirect-button" data-value="/Comercial"  ><img cerrar th:src="@{/img/icons/comercial.png}" alt=""/></summary>
        <div className="accordion-content">
        </div>
    </details>
    <details>
        <summary className="text-white no-marker  align-items-center" ><img cerrar th:src="@{/img/icons/almacen.png}" alt=""/></summary>
        <div className="accordion-content">
        </div>
    </details>
</div>



</div>
<div className=" divbutonsession displaynone" >
<button type="button" className="btn btn-danger" style={{color: "white !important"}} aria-label="Close"><img  th:src="@{/img/icons/ICONOS-13.png}" alt=""/></button>
</div>
<div className=" divbutonsessionopen" >
<button type="button" className="btn btn-danger" style={{color: "white !important"}} aria-label="Close"><img  th:src="@{/img/icons/ICONOS-13.png}" alt=""/> Cerrar sesión</button>
</div>
</>);}
