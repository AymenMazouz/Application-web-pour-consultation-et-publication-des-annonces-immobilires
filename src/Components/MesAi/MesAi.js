// lyes
import "./style.css";
import React, { useState, useEffect } from "react";
import Map, { NavigationControl, Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
// pour afficher les annonces de l'ulisateur (component)
const MesAI = (propAI) => {
  const [announces, SetAnnounces] = useState(propAI.myannounces);
// pour supprimer l'annonce
  const handledelete = async (id) => {
    axios
      .post("http://127.0.0.1:5000/delete/" + id)
      .then(function(response) {
        console.log(response);
        const newlisteannounces = announces.filter(
          (announce) => announce.id != id
        );
        SetAnnounces(newlisteannounces);
      })
      .catch(() => alert("Il y a un problème"));

    
  };
  
  return (
    // affichage de la map a droite de la page
    <dir className="my_ai_ContainerMap_Annonce">
      <div className="my_ai_map">
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
            ></Marker>
          ))}
        </Map>
      </div>
{/* container des annonces */}
      <div className="my_ai_Containerannonce">
        {announces.map((announce) => (
          <div className="my_ai_annonce" key={announce.id}>
            <div className="my_ai_divimg">
              <img
                className="my_ai_imgai"
                src={announce.images[0]}
                alt="AI IMAGE"
                width="100%"
              />
            </div>
            <p className="my_ai_prix">{announce.prix} DA</p>
            <p className="my_ai_adr">{announce.adresse}</p>
            <div className="my_ai_TypeSurface">
              <p className="my_ai_typeai">{announce.type}</p>
              <p className="my_ai_surface">{announce.surface} m²</p>
            </div>
            <button
              className="buttomdelete"
              onClick={() => handledelete(announce.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </dir>
  );
};

export default MesAI;
