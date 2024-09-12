
const logoOnly = "./img/JAT1.png";
const Home=()=> {
    return (
        <> 
            <div id="contenedorbody" className=" navegadorOpenBody" style={{height:"100vh"}}>
                    <div className="carousel-item active mx-auto"  style={{ padding: "1%", zoom: "80% !important",height:"100vh"}}>
                        <div className="card scroll-divs-card"  style={{  marginBottom: "20px",  background: "#011034 !important",height:"95vh" }}>
                            <div className="card-body d-flex " style={{flexDirection:"column",justifyContent:"center"}} >
                                <h1 className="mx-auto">Bienvenidos a la nueva app</h1>
                                <img className="mx-auto" src={logoOnly} style={{width:"50%"}}></img>
                            </div>
                        </div>
                    </div>
                            
            </div>
        </>)
                            
}

export default Home