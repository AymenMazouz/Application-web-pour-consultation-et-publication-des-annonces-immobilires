// lyes
import './style.css'
import React,{useState,useEffect} from 'react'
import Map, { NavigationControl, Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
const MesAI = (propAI) => {
    const [announces,SetAnnounces]=useState(propAI.myannounces)
    
    const handledelete= async (id)=>{
        axios
              .post("http://127.0.0.1:5000/delete/"+id )
              .then(function(response) {
                console.log(response);
                const newlisteannounces= announces.filter(announce => announce.id != id);
                SetAnnounces(newlisteannounces);
              })
              .catch(() => alert("Il y a un problème"));




        // fetch('http://localhost:8000/announces/' + id,{
        //     method:'DELETE'
        // }).then(()=>{

        //     const newlisteannounces= announces.filter(announce => announce.id != id);
        //     SetAnnounces(newlisteannounces);
        // })
    }
    // useEffect(()=>{
    //     const ifamedata =document.getElementById("ifameId")
    //     const lat = 11.35;
    //     const lon =40.55;
    //     ifamedata.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    // })

    
    return ( 
        

        <dir className="my_ai_ContainerMap_Annonce">
            <div className="my_ai_map">
            {/* <iframe id='ifameId' width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0" ></iframe> */}
            <Map
          mapLib={maplibregl}
          initialViewState={{
            longitude: 3.05176,
            latitude: 36.77172,
            zoom: 4,
          }}
          style={{ width: "100%", height: " calc(95vh - 77px)" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=ami5YZbLyI4lKlA0CpRx	"
        >
          <NavigationControl position="top-left" />
          {announces.map((announce) => (
            <Marker
              longitude={announce.longitude}
              latitude={announce.latitude}
            //   anchor="bottom"
            //   color= "#0000"
            //   draggable= "true"
            ></Marker>
            
          ))}
        </Map>
            </div>
            <div className="my_ai_Containerannonce">
                {
                    
                    announces.map((announce) =>(
                        <div className="my_ai_annonce" key={announce.id}>
                            <div className="my_ai_divimg"><img className="my_ai_imgai" src={announce.images[0]} alt="AI IMAGE" width="100%"  /></div>
                            <p className="my_ai_prix">{announce.prix} DA</p>
                            <p className="my_ai_adr">{announce.adresse}</p>
                            <div className="my_ai_TypeSurface">
                                <p className="my_ai_typeai">{announce.type}</p>
                                <p className="my_ai_surface">{announce.surface} m²</p>
                            </div>
                            <button className='buttomdelete' onClick={()=>handledelete(announce.id)}>Delete</button>

                        </div>
                    ))
                }
            </div>
        </dir>

     );
}
 
export default MesAI;