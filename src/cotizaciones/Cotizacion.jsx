

const Cotizacion=()=> {
    return (
        <> 
            <div id="contenedorbody" className=" navegadorOpenBody" >
                <form id="formularioCotizacion" method="POST" className="col-12 " style={{display: "flex", flexDirection: "row"}}>
                    <div className="carousel-item active mx-auto"  style={{ padding: "1%", zoom: "80% !important"}}>
                        <div className="card scroll-divs-card"  style={{  marginBottom: "20px",  background: "#011034 !important" }}>
                            <div className="card-body" >
                                <h3 className="col-12 text-black bold" style={{textAlign: "center"}}>Cotización</h3>
                                
                                <div className="col-12  h-100 p-1 " style={{display: "flex", flexDirection: "column"}}>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                       
                                        <div className="form-floating  mx-auto p-1" >
                                            <input type="text" className="form-control" id="tipoCotizacion" name="tipoCotizacion"/>
                                            <label htmlFor="tipoCotizacion">Tipo</label>
                                        </div>


                                        <div className="form-floating  mx-auto p-1 " >
                                            <input type="number" className="form-control" id="solicitud" name="solicitud"/>
                                            <label htmlFor="solicitud">Solicitud</label>
                                        </div>

                                        <div className="form-floating  mx-auto p-1 col-2 ">
                                            <input type="text" className="form-control" id="cliente" name="cliente" readonly />
                                            <label htmlhtmlFor="cliente">Cliente</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="producto" name="producto" readonly />
                                            <label htmlFor="producto">Producto</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="gradoDificultad" name="gradoDificultad" readonly />
                                            <label htmlFor="gradoDificultad">Dificultad</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="unidad" name="unidad" readonly />
                                            <label htmlFor="unidad">Unidad</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="unidadRefDistintas" name="unidadRefDistintas" readonly />
                                            <label htmlFor="unidadRefDistintas">Ref. Dist.</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="anchoEspe" name="anchoEspe" readonly style={{background: "#02C9AF"}}/>
                                            <label htmlFor="anchoEspe">Ancho</label>
                                        </div>
                                        <b className="my-auto" style={{fontSize: "18px", color: "#ffffff"}}>X</b>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="avanceEspe" name="avanceEspe" readonly style={{background: "#02C9AF"}} />
                                            <label htmlFor="avanceEspe">Avance</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="unidadPlanchas" name="unidadPlanchas" readonly  />
                                            <label htmlFor="unidadPlanchas">C. Plancha</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="unidadTintas" name="unidadTintas" readonly  />
                                            <label htmlFor="unidadTintas">c. Tinta</label>
                                        </div>


                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad1" name="cantidad1" readonly  />
                                            <label htmlFor="cantidad1">Cantidad 1</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad2" name="cantidad2" readonly  />
                                            <label htmlFor="cantidad2">Cantidad 2</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad3" name="cantidad3" readonly />
                                            <label htmlFor="cantidad3">Cantidad 3</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad4" name="cantidad4" readonly  />
                                            <label htmlFor="cantidad4">Cantidad 4</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad5" name="cantidad5" readonly  />
                                            <label htmlFor="cantidad5">Cantidad 5</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad6" name="cantidad6" readonly  />
                                            <label htmlFor="cantidad6">Cantidad 6</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad7" name="v" readonly  />
                                            <label htmlFor="cantidad7">Cantidad 7</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="cantidad8" name="cantidad8" readonly  />
                                            <label htmlFor="cantidad8">Cantidad 8</label>
                                        </div>
                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega1" name="entrega1" readonly  />
                                            <label htmlFor="entrega1">Entrega 1</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega2" name="entrega2" readonly  />
                                            <label htmlFor="entrega2">Entrega 2</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega3" name="entrega3" readonly  />
                                            <label htmlFor="entrega3">Entrega 3</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega4" name="entrega4" readonly  />
                                            <label htmlFor="entrega4">Entrega 4</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega5" name="entrega5" readonly  />
                                            <label htmlFor="entrega5">Entrega 5</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega6" name="entrega6" readonly  />
                                            <label htmlFor="entrega6">Entrega 6</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega7" name="v" readonly  />
                                            <label htmlFor="entrega7">Entrega 7</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                            <input type="text" className="form-control" id="entrega8" name="entrega8" readonly  />
                                            <label htmlFor="entrega8">Entregas 8</label>
                                        </div>
                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="supAplica" name="supAplica" readonly  />
                                            <label htmlFor="supAplica">Sup. Aplica</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="usoFinal" name="usoFinal" readonly  />
                                            <label htmlFor="usoFinal">Uso final</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="troquel" name="troquel" readonly  />
                                            <label htmlFor="troquel">Troquel</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="par" name="par" readonly  />
                                            <label htmlFor="par">P.A.R</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 col-2">
                                            <input type="text" className="form-control" id="material" name="material" readonly  />
                                            <label htmlFor="material">Sustrato</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="adhesivo" name="adhesivo" readonly  />
                                            <label htmlFor="adhesivo">Adhesivo</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="Cubrimiento" name="Cubrimiento" readonly  />
                                            <label htmlFor="Cubrimiento">Cubrimiento</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="t1" name="t1" readonly  />
                                            <label htmlFor="t1">Tinta 1</label>
                                        </div>
                                        <b className="my-auto" style={{fontSize: "18px", color: "#ffffff"}}>X</b>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="t2" name="t2" readonly  />
                                            <label htmlFor="t2">Tinta 2</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="acabado" name="acabado" readonly  />
                                            <label htmlFor="acabado">Acabado</label>
                                        </div>
                                    </div>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="rollos_por" name="rollos_por" readonly  />
                                            <label htmlFor="rollos_por">Rollas por.</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="EtiqAncho" name="EtiqAncho" readonly  />
                                            <label htmlFor="EtiqAncho">Etiq. ancho</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="Core" name="Core" readonly  />
                                            <label htmlFor="Core">Core</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="posi" name="posi" readonly  />
                                            <label htmlFor="posi">Posición</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1">
                                            <input type="text" className="form-control" id="EtiqHoja" name="EtiqHoja" readonly  />
                                            <label htmlFor="EtiqHoja">Etiq. Hoja</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="HojasPaq" name="HojasPaq" readonly  />
                                            <label htmlFor="HojasPaq">Hojas paq.</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="ciudades" name="ciudades" readonly  />
                                            <label htmlFor="ciudades">Ciudades</label>

                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="puntos_enttrega" name="puntos_enttrega" readonly  />
                                            <label htmlFor="puntos_enttrega">Puntos_entrega</label>
                                        </div>

                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="Vendedor" name="Vendedor" readonly  />
                                            <label htmlFor="Vendedor">Vendedor</label>
                                        </div>
                                        <div className="form-floating  mx-auto p-1 ">
                                            <input type="text" className="form-control" id="comi" name="comi" readonly  />
                                            <label htmlFor="comi">Comis. (%)</label>
                                        </div>
                                    </div>
                                    <h4 className="col-12 text-black mt-3 bold " style={{textAlign: "center"}}>Planeación y costo troquel</h4>
                                    <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                    <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                        <div className="form-floating  mx-auto p-1 col-12 ">
                                            <div className="form-control mx-auto" id="costoTroquel" style={{display: "flex", flexDirection:"row", height: "80px !important"}}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="costoTroquelTipo" id="costoTroquelExistente" checked="" value="Existente"/>
                                                    <label className="form-check-label" htmlFor="costoTroquelExistente">
                                                        Existente
                                                    </label>
                                                </div>
                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input" type="radio" name="costoTroquelTipo" id="costoTroquelNuevo" value="Nuevo"/>
                                                    <label className="form-check-label" htmlFor="costoTroquelNuevo">
                                                        Nuevo
                                                    </label>
                                                </div>
                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input" type="radio" name="costoTroquelTipo" id="costoTroquelNinguno" value="Ninguno"/>
                                                    <label className="form-check-label" htmlFor="costoTroquelNinguno">
                                                        Ninguno
                                                    </label>
                                                </div>
                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input" type="radio" name="costoTroquelTipo" id="costoTroquelNuevoEspecial" value="Nuevo Especial"/>
                                                    <label className="form-check-label" htmlFor="costoTroquelNuevoEspecial">
                                                        Nuevo Especial
                                                    </label>
                                                </div>
                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input secondary" type="radio" name="costoTroquelTipo" id="costoTroquelOtro" value="Nuevo Especial"/>
                                                    <label className="form-check-label" htmlFor="costoTroquelOtro" style={{display: "flex", flexDirection:"row"}}>
                                                        Otro <input type="text" className="form-control ms-2" id="costoTroquelTipoOtro" name="costoTroquelTipoOtro" placeholder="Cual?"/>
                                                    </label>
                                                </div>

                                            </div>
                                            <label htmlFor="costoTroquel">Tipo de troquel</label>
                                        </div>



                                    </div>


                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1  " id="accordionRefTroquel" style={{width: "40% !important"}}>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button id="toggleButtonTroquel" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collaTroquel" aria-expanded="false" aria-controls="collaTroquel">
                                                    Ref. Troquel
                                                </button>
                                            </h2>
                                            <div id="collaTroquel"   className="accordion-collapse collapse displaynone">
                                                <div className="accordion-body">
                                                    <table id="TablaTroquel">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">id</th>
                                                            <th scope="col">Referencia</th>
                                                            <th scope="col">Unidad</th>
                                                            <th scope="col">Ancho</th>
                                                            <th scope="col">Around</th>
                                                            <th scope="col">Across</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr th:each="troquel : ${referenciaTroquels}" >
                                                            <td th:text="${troquel.getId()}"></td>
                                                            <td th:text="${troquel.getReferencia()}"></td>
                                                            <td th:text="${troquel.getUnidadTroquel()}"></td>
                                                            <td th:text="${troquel.getAnchoReal()}"></td>
                                                            <td th:text="${troquel.getAround()}"></td>
                                                            <td th:text="${troquel.getAcross()}"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating mx-auto p-1 " style={{width: "15% !important"}}>
                                        <select className="form-select" id="UnidadPAR" name="UnidadPAR" aria-label="UnidadPAR">
                                            <option value="">Seleccionar Troquel</option>
                                            <option value="Flexible Existente">FLEXIBLE EXISTENTE</option>
                                            <option value="Plano Existente">PLANO EXISTENTE</option>
                                            <option style={{color: "red"}} value="Troquel Nuevo Flexible">TROQUEL NUEVO
                                                FLEXIBLE</option>
                                            <option style={{color: "red"}} value="Troquel Nuevo Plano">TROQUEL NUEVO PLANO
                                            </option>
                                            <option value="PAR">PAR</option>
                                            <option value="No Aplica">No Aplica</option>

                                        </select>
                                        <label htmlFor="UnidadPAR">Unidad P.A.R.</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% !important"}}>
                                        <input type="text" className="form-control" id="CUnidad" name="CUnidad" value="0"/>
                                        <label htmlFor="CUnidad">Unidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% !important"}}>
                                        <input type="text" className="form-control" id="around" name="around" value="0"/>
                                        <label htmlFor="around">Around</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% !important"}}>
                                        <input type="text" className="form-control" id="across" name="across" value="0" />
                                        <label htmlFor="across">Across</label>
                                    </div>


                                </div>
                                <hr style={{marginTop:" 8px", border: "#000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-6" >
                                        <div className="form-control" id="sustratotipodiv" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="sustratoTipo" id="sustratoTipoBasico" value="Básico"/>
                                                    <label className="form-check-label" htmlFor="sustratoTipoBasico">
                                                        Básico
                                                    </label>
                                                </div>

                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="sustratoTipo" id="sustratoTipoAlternativo" value="Alternativo"/>
                                                    <label className="form-check-label" htmlFor="sustratoTipoAlternativo">
                                                        Alternativo
                                                    </label>
                                                </div>

                                            </div>

                                        </div>
                                        <label htmlFor="sustratotipodiv">Sustrato</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="espacioexteriores" name="espacioexteriores" value="0" />
                                        <label htmlFor="espacioexteriores">Espacio en exterior</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="espacioentreetiquetas" name="espacioentreetiquetas" value="0" />
                                        <label htmlFor="espacioentreetiquetas">Espacio entre etiquetas</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1 " id="accordionMaterial" style={{width: "50% !important"}} >
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button id="toggleButtonMaterial" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collaMaterial" aria-expanded="false" aria-controls="collaMaterial">Material</button>
                                            </h2>
                                            <div id="collaMaterial"   className="accordion-collapse collapse displaynone">
                                                <div className="accordion-body">
                                                    <table id="TablaMaterial">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">id</th>
                                                            <th scope="col">Material</th>
                                                            <th scope="col">Id lista</th>
                                                            <th scope="col">Lista</th>
                                                            <th scope="col">Precio</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr th:each="material : ${materials}" >
                                                            <td th:text="${material.getId()}"></td>
                                                            <td th:text="${material.getMaterial()}"></td>
                                                            <td th:text="${material.getIdLista()}"></td>
                                                            <td th:text="${material.getLista()}"></td>
                                                            <td th:text="${material.getPrecio()}"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioMaterial" name="precioMaterial"  value="0"/>
                                        <label htmlFor="precioMaterial">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoMaterialC" name="anchoMaterialC" />
                                        <label htmlFor="anchoMaterialC">Ancho</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1" id="accordionAcabado" style={{width: "50% !important"}}>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button id="toggleButtonAcabado" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collaAcabado" aria-expanded="false" aria-controls="collaAcabado">Acabado</button>
                                            </h2>
                                            <div id="collaAcabado"   className="accordion-collapse collapse displaynone">
                                                <div className="accordion-body">
                                                    <table id="TablaAcabado">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">id</th>
                                                            <th scope="col">Acabado</th>
                                                            <th scope="col">Id lista</th>
                                                            <th scope="col">Lista</th>
                                                            <th scope="col">Precio</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr th:each="acabado : ${acabados}" >
                                                            <td th:text="${acabado.getId()}"></td>
                                                            <td th:text="${acabado.getAcabado()}"></td>
                                                            <td th:text="${acabado.getIdLista()}"></td>
                                                            <td th:text="${acabado.getLista()}"></td>
                                                            <td th:text="${acabado.getPrecio()}"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioAcabado" name="precioAcabado" value="0"/>
                                        <label htmlFor="precioAcabado">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoLaminacionC" name="anchoLaminacionC" />
                                        <label htmlFor="anchoLaminacionC">Ancho Laminacion</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1" id="accordionCold" style={{width: "50% !important"}}>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button id="toggleButtonCold" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collaCold" aria-expanded="false" aria-controls="collaCold">Cold Foild</button>
                                            </h2>
                                            <div id="collaCold"   className="accordion-collapse collapse displaynone">
                                                <div className="accordion-body">
                                                    <table id="TablaCold">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">id</th>
                                                            <th scope="col">Cold Folid</th>
                                                            <th scope="col">Id lista</th>
                                                            <th scope="col">Lista</th>
                                                            <th scope="col">Precio</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr th:each="coldFoild : ${coldFoilds}" >
                                                            <td th:text="${coldFoild.getId()}"></td>
                                                            <td th:text="${coldFoild.getColdFoild()}"></td>
                                                            <td th:text="${coldFoild.getIdLista()}"></td>
                                                            <td th:text="${coldFoild.getLista()}"></td>
                                                            <td th:text="${coldFoild.getPrecio()}"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="" className="form-control" id="precioCold" name="precioCold" value="0"/>
                                        <label htmlFor="precioCold">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoColdC" name="anchoColdC" />
                                        <label htmlFor="anchoColdC">Ancho Cold Foild</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti1" name="CubrimientoCoti1" value="100"/>
                                        <label htmlFor="CubrimientoCoti1">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta1" name="tipoTinta1" aria-label="tipoTinta1">
                                            <option value="0" selected="">Ninguno</option>
                                            <option onchange="tintas_select(this)" th:each="tinta : ${tintas}"   th:value="${tinta.getTinta()}" th:text="${tinta.getTinta()}" th:attr="attr-precio=${tinta.precioGramo}, attr-gramosM2=${tinta.gramosM2}"></option>

                                        </select>
                                        <label htmlFor="tipoTinta1">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta1" name="grTinta1" readonly value="0"/>
                                        <label htmlFor="grTinta1">$Gr. tinta (m &sup2)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta1" name="PlanchasTinta1" value="0"/>
                                        <label htmlFor="PlanchasTinta1">Planchas</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti2" name="CubrimientoCoti2" value="100"/>
                                        <label htmlFor="CubrimientoCoti2">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta2" name="tipoTinta2" aria-label="tipoTinta2">
                                            <option value="0" selected="">Ninguno</option>
                                            <option onchange="tintas_select(this)" th:each="tinta : ${tintas}"   th:value="${tinta.getTinta()}" th:text="${tinta.getTinta()}" th:attr="attr-precio=${tinta.precioGramo}, attr-gramosM2=${tinta.gramosM2}"></option>

                                        </select>
                                        <label htmlFor="tipoTinta2">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta2" name="grTinta2" readonly value="0"/>
                                        <label htmlFor="grTinta2">$Gr. tinta (m &sup2)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta2" name="PlanchasTinta2" value="0"/>
                                        <label htmlFor="PlanchasTinta2">Planchas</label>
                                    </div>

                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti3" name="CubrimientoCoti3" value="100"/>
                                        <label htmlFor="CubrimientoCoti3">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta3" name="tipoTinta3" aria-label="tipoTinta3">
                                            <option value="0" selected="">Ninguno</option>
                                            <option onchange="tintas_select(this)" th:each="tinta : ${tintas}"   th:value="${tinta.getTinta()}" th:text="${tinta.getTinta()}" th:attr="attr-precio=${tinta.precioGramo}, attr-gramosM2=${tinta.gramosM2}"></option>

                                        </select>
                                        <label htmlFor="tipoTinta3">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta3" name="grTinta3" readonly value="0"/>
                                        <label htmlFor="grTinta3">$Gr. tinta (m &sup2)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta3" name="PlanchasTinta3" value="0" />
                                        <label htmlFor="PlanchasTinta3">Planchas</label>
                                    </div>

                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoCoti4" name="CubrimientoCoti4" value="100"/>
                                        <label htmlFor="CubrimientoCoti4">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <select className="form-select" id="tipoTinta4" name="tipoTinta4" aria-label="tipoTinta4">
                                            <option value="0" selected="">Ninguno</option>
                                            <option onchange="tintas_select(this)" th:each="tinta : ${tintas}"   th:value="${tinta.getTinta()}" th:text="${tinta.getTinta()}" th:attr="attr-precio=${tinta.precioGramo}, attr-gramosM2=${tinta.gramosM2}"></option>

                                        </select>
                                        <label htmlFor="tipoTinta4">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTinta4" name="grTinta4" readonly value="0"/>
                                        <label htmlFor="grTinta4">$Gr. tinta (m&sup2)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTinta4" name="PlanchasTinta4" value="0"/>
                                        <label htmlFor="PlanchasTinta4">Planchas</label>
                                    </div>

                                </div>

                            <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CambPlanchas" name="CambPlanchas"  attr-precio="0"  value="0"/>
                                        <label htmlFor="CambPlanchas">Camb. planchas</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="diferirEnTinta1" name="diferirEnTinta1" />
                                        <label htmlFor="diferirEnTinta1">Diferir en (Etiq.)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="metros" name="metros" readonly/>
                                        <label htmlFor="metros" >Metros lineales</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="avanceReal" readonly/>
                                        <label htmlFor="avanceReal" >Avance</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Graduaciones</h4>

                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="GradPlanchas" name="GradPlanchas"  attr-precio="12000" value="0" />
                                        <label htmlFor="GradPlanchas">#Grad. Planchas</label>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="GradPAR" name="GradPAR"  attr-precio="20000" value="0"/>
                                        <label htmlFor="GradPAR">#Grad. P.A.R.</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="PrepTintas" name="PrepTintas"  attr-precio="8000" value="0"/>
                                        <label htmlFor="PrepTintas">#Prep. Tintas</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CambiosTintas" name="CambiosTintas"  attr-precio="5000" value="0"/>
                                        <label htmlFor="CambiosTintas">#Cambios Tinta</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg1" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="IRAdhesivo" id="opsiG1" value="Si"  attr-precio="12000" attr-tiempo="10"/>
                                                    <label className="form-check-label" htmlFor="opsiG1">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="IRAdhesivo" id="opnoG1" value="No"  attr-precio="0" checked/>
                                                    <label className="form-check-label" htmlFor="opnoG1">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label htmlFor="divg1">Imp. Rev. Adhesivo</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg2" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="IRLiner" id="opsiG2" value="Si"  attr-precio="5000" attr-tiempo="15"/>
                                                    <label className="form-check-label" htmlFor="opsiG2">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="IRLiner" id="opnoG2" value="No" attr-precio="0" checked/>
                                                    <label className="form-check-label" htmlFor="opnoG2">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label htmlFor="divg2">Imp. Rev. Liner</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg3" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="TroquelGraduacion" id="opsiG3" value="Si" attr-precio="10000" attr-tiempo="10"/>
                                                    <label className="form-check-label" htmlFor="opsiG3">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="TroquelGraduacion" id="opnoG3" value="No" attr-precio="0" checked/>
                                                    <label className="form-check-label" htmlFor="opnoG3">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label htmlFor="divg3">Troquel</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg4" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="ShokAir" id="opsiG4" value="Si" attr-precio="20000" attr-tiempo="25"/>
                                                    <label className="form-check-label" htmlFor="opsiG4">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="ShokAir" id="opnoG4" value="No" attr-precio="0" checked/>
                                                    <label className="form-check-label" htmlFor="opnoG4">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label htmlFor="divg4">Shok Air</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg5" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="ponchadoFc" id="opsiG5" value="Si" attr-precio="20000" attr-tiempo="15"/>
                                                    <label className="form-check-label" htmlFor="opsiG5">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="ponchadoFc" id="opnoG5" value="No" attr-precio="0" checked/>
                                                    <label className="form-check-label" htmlFor="opnoG5">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label htmlFor="divg5">Ponchado FC</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg6" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="MesaShetter" id="opsiG6" value="Si" attr-precio="10000" attr-tiempo="15"/>
                                                    <label className="form-check-label" htmlFor="opsiG6">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="MesaShetter" id="opnoG6" value="No" attr-precio="0" checked/>
                                                    <label className="form-check-label" htmlFor="opnoG6">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label htmlFor="divg6">Mesa Shetter</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Impresion</h4>
                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-6 ">
                                        <div className="form-control" id="impresionV" style={{display: "flex", flexDirection: "column", height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="velocidadImp" id="velocidadImp300" value="300" checked />
                                                    <label className="form-check-label" htmlFor="velocidadImp300">
                                                        Muy baja (300)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="velocidadImp" id="velocidadImp750" value="750" />
                                                    <label className="form-check-label" htmlFor="velocidadImp750">
                                                        Normal (750)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="velocidadImp" id="velocidadImp1000" value="1000" />
                                                    <label className="form-check-label" htmlFor="velocidadImp1000">
                                                        Alta (1000)
                                                    </label>
                                                </div>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="velocidadImp" id="velocidadImp500" value="500" />
                                                    <label className="form-check-label" htmlFor="velocidadImp500">
                                                        baja (500)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="velocidadImp" id="velocidadImp1300" value="1300" />
                                                    <label className="form-check-label" htmlFor="velocidadImp1300">
                                                        Muy Alta (1300)
                                                    </label>
                                                </div>

                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input secondary" type="radio" name="velocidadImp" id="velocidadImpotro" value="Otro"/>
                                                    <label className="form-check-label" htmlFor="velocidadImpotro" style={{display: "flex", flexDirection:"row"}}>
                                                        Otro <input type="text" className="form-control ms-2" id="velocidadImpvalor" name="velocidadImpvalor" placeholder="Cual?"/>
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label htmlFor="impresionV">Velocidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-6 ">
                                        <div className="form-control" id="maquinadiv" style={{display: "flex", flexDirection: "column",height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="maquina" id="maquinaTroq" value="Troq Bco" th:attr="attr-precio=${troqBco.getPrecio()}" checked/>
                                                    <label className="form-check-label" htmlFor="maquinaTroq">
                                                        Troq Bco
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="maquina" id="maquinaTroqAqv1" value="Aq4 UV1" th:attr="attr-precio=${Aq4UV1.getPrecio()}"/>
                                                    <label className="form-check-label" htmlFor="maquinaTroqAqv1">
                                                        Aq4 UV1
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="maquina" id="maquinaTroqUv5" value="AUV5 UV6" th:attr="attr-precio=${UV5UV6.getPrecio()}"/>
                                                    <label className="form-check-label" htmlFor="maquinaTroqUv5">
                                                        UV5 UV6
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="mt-3" style={{display: "flex", flexDirection:"row"}}>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>

                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="maquina" id="maquinaTroqAq6" value="Aq6 UV1" th:attr="attr-precio=${Aq6UV1.getPrecio()}"/>
                                                    <label className="form-check-label" htmlFor="maquinaTroqAq6">
                                                        Aq6 UV1
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="maquina" id="maquinaTroqAq7" value='Aq7 UV1 (13")' th:attr="attr-precio=${Aq7UV1.getPrecio()}"/>
                                                    <label className="form-check-label" htmlFor="maquinaTroqAq7">
                                                        Aq7 UV1 (13")
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="maquina" id="maquinaTroqTirama" value='Tirama' th:attr="attr-precio=${Tirama.getPrecio()}"/>
                                                    <label className="form-check-label" htmlFor="maquinaTroqTirama">
                                                        Tirama
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <label htmlFor="maquinadiv">Maquina</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Impresion variable en zebra</h4>
                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>


                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                        <input type="text" className="form-control" id="etiqAlAncho" name="etiqAlAncho"/>
                                        <label htmlFor="etiqAlAncho">#Etiq. al ancho</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                        <input type="text" className="form-control" id="avanceZebra" name="avanceZebra"/>
                                        <label htmlFor="avanceZebra">Avance (cms)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                        <input type="text" className="form-control" id="RefDistintasZebra" name="RefDistintasZebra" attr-precio="5000"/>
                                        <label htmlFor="RefDistintasZebra">Ref. Distintas</label>
                                    </div>
                                    <div className="form-floating mx-auto p-1 " style={{width: "25% !important"}}>
                                        <select className="form-select" id="CintaZebra" name="CintaZebra" aria-label="ciudad">
                                            <option value="Cera" attr-precio="1.00">Cera</option>
                                            <option value="Resina" attr-precio="2.00">Resina</option>
                                            <option value="Cera Resina" attr-precio="1.50">Cera Resina</option>
                                        </select>
                                        <label htmlFor="CintaZebra" attr-precio="1.50">Cinta</label>
                                    </div>

                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Terminacion y empaque</h4>
                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-12 ">
                                        <div className="form-control" id="" style={{display: "flex", flexDirection: "column", height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="terminacionEn" id="terminacionEnR" value="Rebobinado" />
                                                    <label className="form-check-label" htmlFor="terminacionEnR">
                                                    Rebobinado
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="terminacionEn" id="terminacionEnH" value="En hojas"/>
                                                    <label className="form-check-label" htmlFor="terminacionEnH">
                                                        En hojas
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="terminacionEn" id="terminacionEnD" value="Doblado"/>
                                                    <label className="form-check-label" htmlFor="terminacionEnD">
                                                        Doblado
                                                    </label>
                                                </div>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="EtiqXRollo" name="etiqAlAncho" attr-precio="0"/>
                                                    <label htmlFor="etiqAlAncho">#Etiq. X Rollo</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="EtiqXHoja1" name="etiqAlAncho" attr-precio="0"/>
                                                    <label htmlFor="etiqAlAncho">#Etiq. X Hoja</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="EtiqXHoja2" name="etiqAlAncho" attr-precio="0"/>
                                                    <label htmlFor="etiqAlAncho">#Etiq. X Hoja</label>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <h4 className="col-12 text-white mt-3" style={{textAlign: "center"}}>Recargo, transporte, mdel y comisión</h4>
                                <hr style={{marginTop:" -1px", border: "#ffffff 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-12 ">
                                        <div className="form-control" id="" style={{display: "flex", flexDirection: "column", height: "230px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" name="recargoTrnsporte" id="recargoTrnsporteCM" value="Corte Manual" />
                                                    <label className="form-check-label" htmlFor="terminacionEnR">
                                                        Corte Manual
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" name="recargoTrnsporte" id="recargoTrnsporteDM" value="Doblado Manual"/>
                                                    <label className="form-check-label" htmlFor="terminacionEnH">
                                                        Doblado Manual
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" name="recargoTrnsporte" id="recargoTrnsporteCR" value="Reproceso de Corte y Rebobinado"/>
                                                    <label className="form-check-label" htmlFor="terminacionEnD">
                                                        Reproceso de Corte y Rebobinado
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" name="recargoTrnsporte" id="recargoTrnsporteOtro" value="Reproceso de Corte y Rebobinado"/>
                                                    <label className="form-check-label" htmlFor="recargoTrnsporteOtro">
                                                        Otro recargo <input  type="text" placeholder="motivo" name="motivorecargo"/>
                                                    </label>
                                                </div>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteCMCosto" name="recargoTrnsporteCMCosto" />
                                                    <label htmlFor="recargoTrnsporteCMCosto">$ C/U</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteDMCosto" name="recargoTrnsporteDMCosto" />
                                                    <label htmlFor="recargoTrnsporteDMCosto">$ C/U</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteCRCosto" name="recargoTrnsporteCRCosto" />
                                                    <label htmlFor="recargoTrnsporteCRCosto">$ C/U</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% !important"}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteOtroCosto" name="recargoTrnsporteOtroCosto" />
                                                    <label htmlFor="recargoTrnsporteOtroCosto">$ C/U</label>
                                                </div>
                                            </div>
                                            <hr style={{width:"95%" ,marginTop: "-1px", border: "#ffffff 2px solid"}}/>
                                            <div style={{display: "flex", flexDirection:"row", marginTop: "5px"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="transporteCiudad" id="valleaburratrans" value="Valle de aburra" attr-precio="0" checked/>
                                                    <label className="form-check-label" htmlFor="valleaburratrans">
                                                        Valle de aburra
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="transporteCiudad" id="ciudad_principal_transporte_select" value="Ciudad principal" attr-precio="0"/>
                                                    <label className="form-check-label" htmlFor="ciudad_principal_transporte_select">
                                                        Ciudad principal <input  type="text" placeholder="Cual?" name="ciudad_principal_transporte"/>
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" name="transporteCiudad" id="otras_ciudades_transporte_select" value="Otras Ciudades/Municipios" attr-precio="0"/>
                                                    <label className="form-check-label" htmlFor="otras_ciudades_transporte_select">
                                                        Otras Ciudades/Municipios <input  type="text" placeholder="Cual?" name="otras_ciudades_transporte"/>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12" style={{display: "flex", flexDirection:"row"}}>
                                    <button id="cotizarB" type="button" className="btn btn-success mx-auto col-8 text-white mt-3 mb-2 p-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Cotizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Cotizaciones</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table id="TablaCotizaciones">
                                    <thead>
                                    <tr>
                                        <th scope="col">Cotización</th>
                                        <th scope="col">Cantidad Etiquetas</th>
                                        <th scope="col">Costo Material</th>
                                        <th scope="col">Costo Acabado</th>
                                        <th scope="col">Costo Cold foild</th>
                                        <th scope="col">Costo Maquina</th>
                                        <th scope="col">Horas Maquina</th>
                                        <th scope="col">Costo Graduación Planchas</th>
                                        <th scope="col">Costo Cambio de plancha</th>
                                        <th scope="col">Costo Graduación P.A.R</th>
                                        <th scope="col">Costo Cambio de tintas</th>
                                        <th scope="col">Costo Prep. tintas</th>
                                        <th scope="col">Costo Planchas</th>
                                        <th scope="col">Costo Tintas</th>
                                        <th scope="col">Costo Transporte</th>
                                        <th scope="col">Costo Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Guardar cotizaciones</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        
        </>);
}
export default Cotizacion;