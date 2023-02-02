import { Style } from 'maplibre-gl';
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './styleDetailAI.css'
import Map,{NavigationControl,Marker} from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';
import { NavBtnLink, NavBtn } from '../../Pages/MainElements'
const Detailai = () => {

    const {id} =useParams();

    const [announcedetail,SetAnouncesdetail]=useState(null);
    
    const [aiispending,setAiispending]=useState(true);
    const[error,setError]=useState(null);
    const[mapAffiche,setMapAffiche]=useState(false);
    const[cptimg,setCptimg]=useState(0)
  useEffect(()=>{
    
  //  fetch('http://localhost:8000/announces/'+id).then(res =>{
  //   if (!res.ok) {
  //     throw Error('Could noy fetch the data for that resource ')
  //   }
  //   return res.json();
  //  }).then((data)=>{ 
  //   SetAnouncesdetail(data)
  //   setAiispending(false)
  //   setError(null)
  //  }).catch(err =>{
  //   setAiispending(false)
  //   setError(err.message)
  //  })
  async function fetchData() {
  // axios
  //     .post("http://127.0.0.1:5000/infoAI/"+id, annonceSearch)
  //     .then(() => alert("Envoyé avec success"))
  //     .catch(() => alert("Il y a un problème"));
  //     SetAnouncesdetail(data)
  //   setAiispending(false)
  //   setError(null)
    const res = await axios.get("http://127.0.0.1:5000/infoAI/"+id);
      console.log(res.data.announces[0]);
      SetAnouncesdetail(res.data.announces[0]);
      setAiispending(false);
      setError(null); // ...
  }
  fetchData()
  },[])
  
  
    return (
        <div>
            { aiispending && <div>Loading ...</div>}
                
            {announcedetail &&<section style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
              {/* div pour afficher les photo et la map */}
              <div className='div-1-detailAI'>
                {/* div de la photo principale ou map */}
                <div  className='div-img-4trucs-map' >
                  <div className='div-aff-img-map'>
                    {!mapAffiche &&announcedetail&&<img  src={announcedetail.images[cptimg]} height="100%"width="100%" style={{backgroundColor:"#f3f2f2"}}  />}
                    {mapAffiche && announcedetail && <Map mapLib={maplibregl} 
                    
                        initialViewState={{
                            longitude: announcedetail.longitude,
                            latitude: announcedetail.latitude,
                            zoom: 11
                        }}
                        // style={{ height: "220px"}}
                        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=ami5YZbLyI4lKlA0CpRx	"
                        >
                        <NavigationControl position="top-left" />
                        
                          <Marker longitude={announcedetail.longitude} latitude={announcedetail.latitude}></Marker>
                        
                        
                    </Map> }
                    {!mapAffiche &&<button className='bt-precedent-img'onClick={()=>{setCptimg((cptimg-1+announcedetail.images.length) % announcedetail.images.length )}}>&#8249;</button>}
                    {!mapAffiche &&<button className='bt-suivant-img'onClick={()=>{setCptimg((cptimg+1) % announcedetail.images.length )}}>&#8250;</button>}
                  </div>
                   {/* div pour afficher les 4 truc (photo -video -3d Tour- map) */}
                  <div className='div4-trucs'>

                      <div className='div4truc-div div1imgs' onClick={()=>{setMapAffiche(false)}}>
                      <img src={announcedetail.images[0]} height="100%"width="100%"  />
                      <p className='text-div'>Photos</p>
                      </div>
                      <div className='div4truc-div div1video'><p className='text-div'>Video</p></div>
                      <div className='div4truc-div div3dtour'><p className='text-div'>3D-Tour</p></div>
                      <div className='div4truc-div div1map'onClick={()=>{setMapAffiche(true)}}>
                      <p className='text-div'>Map</p>
                      {announcedetail && <Map className="map-di" mapLib={maplibregl} 
                        initialViewState={{
                            longitude: announcedetail.longitude,
                            latitude: announcedetail.latitude,
                            zoom: 8.5
                        }}
                        style={{ cursor: "pointer",height: "220px"}}
                        cursor={"pointer"}
                       
                        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=ami5YZbLyI4lKlA0CpRx	"
                        >
                          <Marker longitude={announcedetail.longitude} latitude={announcedetail.latitude}></Marker>
   
                    </Map> }
                    
                      </div>

                  </div>
                </div>
               {/* div a afficher a droite de la page */}
                <div className='div-info'>
                  <div className='div-info-1' >
                        <p className='div-info-title'>{announcedetail.title}</p>
                        <p className='div-info-adr '>{announcedetail.adresse}</p>
                        <p className='div-info-prix '>{announcedetail.prix} DA</p>
                        <div className='div-ligne'></div>
                        <div style={{display:"flex",justifyContent:"space-around"}}>
                        <div><svg class="info-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="0 0 20 20">
                          <path fill="#112a41" fill-rule="evenodd" d="M19.734 18.45L1.552.266A.91.91 0 0 0 0 .91v3.635h1.818v1.819H0v1.818h1.818V10H0v1.818h1.818v1.818H0v1.819h1.818v1.818H0v1.819c0 .502.407.909.91.909h18.18a.91.91 0 0 0 .644-1.552zm-7.916-2.086H4.545V9.092l7.273 7.273z"></path>
                        </svg>
                        <p className='p-surface-type' style={{position:"relative",right:"5px",top:"2px"}}>{announcedetail.surface} m²</p>
                        </div>
                        <div>
                        <img src={require("../../Images/type.png")} alt="TYPE"width="40px" height="40px"  />
                        <p className='p-surface-type'>{announcedetail.type}</p>
                        </div>
                        </div>
                        <div className='div-ligne'></div>
                        <div style={{display:"flex",justifyContent:"center"}}><NavBtnLink className='chat-seller-bt'to='/Signin/SigninUser/Main/chat' >Chat with seller</NavBtnLink></div>
                    </div>
                    <div className='div-info-2' >
                    <p className='div-info-title'>Seller Contact</p>
                    <div className='div-ligne'></div>
                        <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}><img src={require("../../Images/contact.png")} alt=""  />
                        <p>: unavailable</p>
                        </div>
                        
                        <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}><img src={require("../../Images/email.png")} alt="" height="25px" width="25px" />
                        <p>: unavailable</p>
                        </div>
                        
                        <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}><img src={require("../../Images/facebook.png")} alt="" height="25px" width="25px" />
                        <p>: unavailable</p>
                        </div>
                        {/* <div className='div-ligne3'></div> */}
                        <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}><img src={require("../../Images/position.png")} alt="" height="25px" width="25px" />
                        <p>: {announcedetail.adresse}</p>
                        </div>
                       
                        
                    </div>
                </div>

                


              </div>

              {/* div qui contient la description */}
              <h3 className='h3-desc'>Description :</h3>
              <div className='div-description' >
                  <div >
                    
                    <div className='div-ligne2'></div>
                    <p> {announcedetail.description}</p>
                  </div>
              </div>

              <p className='h3-desc'>Basic Details</p>
              <div className='div-ligne2'></div>
              <div className='Basic-Details div-description'>
                
                <ul className='Basic-d-1c'>
                  <li className='li-classe'>Square Feet :<p className='p-li'>{announcedetail.surface} m²</p></li>
                  <li className='li-classe'>Year Built :<p className='p-li'>/</p></li>
                  <li className='li-classe'>HOA monthly dues :<p className='p-li'>/</p></li>
                  <li className='li-classe'>Sewer :<p className='p-li'>/</p></li>
                  </ul>
                <ul>
                  <li className='li-classe'>Heating Fuel :<p className='p-li'>/</p></li>
                  <li className='li-classe'>Sewer :<p className='p-li'>/</p></li>
                  <li className='li-classe'>Parking Features :<p className='p-li'>/</p></li>
                </ul>
                <ul className='Basic-d-2c'>
                  
                </ul>
              </div>
            </section>}
        </div>
        
     );
}
 
export default Detailai;