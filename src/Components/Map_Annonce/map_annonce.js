/*********lyes */
import "./style.css";
import { Link as LinkR } from "react-router-dom";
import Map, { NavigationControl, Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";


// pour afficher le contenaire de la map et les annonces dans la page de recherche
const Map_Annonce = (prop) => {
  const announces = prop.announces;

  return (
    <dir className="ContainerMap_Annonce">
      <div className="map">
        {/* affichage de la map  */}
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
      {/* affichage des annonces */}
      <div className="Containerannonce">
        {announces.map((announce) => (
          <LinkR
            className="annonce"
            key={announce.id}
            to={`/Signin/SigninUser/Main/lyes/detaiAI/${announce.id}`}
          >
            <div className="divimg">
              <img
                className="imgai"
                src={announce.images[0]}
                alt="AI IMAGE"
                width="100%"
                style={{ maxHeight: "300px", minHeight: "300px" }}
              />
            </div>

            <p className="prix">{announce.prix} DA</p>
            <p className="adr">{announce.adresse}</p>
            <div className="TypeSurface">
              <p className="typeai">{announce.type}</p>
              <p className="surface">{announce.surface} m²</p>
            </div>
          </LinkR>
        ))}
      </div>
      
    </dir>
  );
};

export default Map_Annonce;
