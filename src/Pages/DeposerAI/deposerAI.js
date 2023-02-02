import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./style.css";
import Map, { NavigationControl, Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const NOMINATIM_BASE_URL="https://nominatim.openstreetmap.org/search?"
const params ={
  q:'',
  format:'json',
  addressdetails:'addressdetails',
}



const Deposerai = () => {
  useEffect(() => {
    fetch("http://localhost:9000/commune/" )
      .then((res) => {
        if (!res.ok) {
          throw Error("Could noy fetch the data for that resource ");
        }
        return res.json();
      })
      .then((data) => {
        setListecommune(data);
        
      })
      .catch((err) => {
        setError(err.message);
      });
      fetch("http://localhost:9000/wilaya/" )
      .then((res) => {
        if (!res.ok) {
          throw Error("Could noy fetch the data for that resource ");
        }
        return res.json();
      })
      .then((data) => {
        setListewilaya(data);
        console.log(listewilaya);
        
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [categorie, setCategorie] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [adresse, setAdresse] = useState("");
  const [prix, setPrix] = useState("");
  const [surface, setSurface] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [listecommune, setListecommune] = useState(null);
  const [listewilaya, setListewilaya] = useState(null);
  const [images,setImages]=useState([]);
  const [listPlace,setListPlace]=useState([]);
  const [zoom,setZoom]=useState(1);
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 3.5,
  });


  
  const handleOpenwidget = () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dap2rzulg', 
      uploadPreset: 'xkbcejv4'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          setImages((prev)=>[...prev,result.info.url])
          console.log('Done! Here is the image info: ', result.info.url); 
          console.log(images); 
        }
      }
    )
    //open widget
    myWidget.open();
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(title==""||description==""||type==""||categorie==""||wilaya==""||commune==""||prix==""||surface==""||longitude==""||latitude==""||images==[]){
      document.getElementById("erreur_message").style.display="block"
      console.log("iffffffffffffffffffffffffffffffffffffffff");
      // scrollTo(0,0)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    else{
    let infouser=jwt_decode(localStorage.getItem("token"));
    let EmailUser=infouser.email;
    const diposerAI = { title, description, type, categorie ,wilaya,commune,adresse,prix,surface,longitude,latitude,images,EmailUser};

    console.log(diposerAI);

    axios
      .post("http://127.0.0.1:5000/annonce", diposerAI)
      .then(() => alert("Envoyé avec success"))
      .catch(() => alert("Il y a un problème"));

    }
  };
  // const API_endpoint=`https://api.openweathermap.org/data/3.0/onecall?`
  // const API_key=`119a1e4c51756f05fc4257b6637df71e`
  // async function getaddress(lon,lat){
  //   let endpoint =`${API_endpoint}lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${API_key}`
  //   console.log(endpoint);
  //   await axios.get(endpoint).then(
  //    (response) =>{
  //     console.log(response.data);
  //    }
  //   )
  // }
  
  return (
    <section>
      <div className="Container_input_deposer" >
        <p id="erreur_message">veuillez remplir tout les champs</p>
        <div className="Container_input_info">
          <input
            className="seachinput_deposer"
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="seachinput_deposer description"
            type="text"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="div-type-cat">
          <select
            className="selectcase_deposer"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled selected>
              Select the Type
            </option>
            <option value="Bungalow">Bungalow</option>
            <option value="Maison">Maison</option>
            <option value="Appartement">Appartement</option>
            <option value="Commercial">Commercial</option>
          </select>
          <select
            className="type selectcase_deposer"
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="" disabled selected>
              Select the Categorie
            </option>
            <option value="vente">vente</option>
            <option value="Location">Location</option>
            <option value="Location pour vacances">
              Location pour vacances
            </option>
          </select>
          </div>
          <input
            className="seachinput_deposer"
            type="text"
            placeholder="prix"
            onChange={(e) => setPrix(e.target.value)}
          />
          <input
            className="seachinput_deposer"
            type="text"
            placeholder="surface"
            onChange={(e) => setSurface(e.target.value)}
          />
          {/* adresse */}
          <div className="div_address">
          <input
            className="seachinput_deposer"
            id="address"
            type="text"
            placeholder="adresse"
            onChange={(e) => {setAdresse(e.target.value)
              const params={
                q:adresse,
                format:'json',
                addressdatails:1,
                polygon_geojson:0
              };
              const queryString =new URLSearchParams(params).toString();
              const requestOptions={
                method:"GET",
                redirect:"follow"
              };
              fetch(`${NOMINATIM_BASE_URL}${queryString}`,requestOptions)
              .then((response)=>response.text())
              .then((result)=>{console.log(JSON.parse(result));
                setListPlace(JSON.parse(result))
                document.getElementById("div_sugg_adresse").style.display="block"
              })
              .catch((err)=>console.log("err:",err));
            
            }}
          />
          <div className="div_sugg_adresse"id="div_sugg_adresse">
          {
            listPlace.map((item)=>{
              return(
                <div className="sugg_adresse" key={item?.osm_id} onClick={()=>{
                    document.getElementById("address").value=item?.display_name
                    setAdresse(item?.display_name)
                    document.getElementById("div_sugg_adresse").style.display="none"
                    setLongitude(item?.lon)
                    setLatitude(item?.lat)
                    console.log(item?.display_name);
                    setViewState({
                      longitude: item?.lon,
                      latitude:item?.lat,
                      zoom: 10,
                    })

                }}>
                    <img src={require("../../Images/position.png")} alt="position icon" className="postion_icon"  />
                    <p>{item?.display_name}</p>
                  </div>
              )
            })
          }
          </div>

          </div>
          {/* <input
            className="seachinput"
            type="number"
            placeholder="longitude"
            onChange={(e) => setLongitude(e.target.value)}
          />
          <input
            className="seachinput"
            type="number"
            placeholder="latitude"
            onChange={(e) => setLatitude(e.target.value)}
          /> */}
          <div className="div-type-cat">
          {listewilaya &&
          <select className='commune selectcase_deposer' onChange={(e)=> setWilaya(e.target.value)}>
                    <option value=""  selected>Choose your wilaya</option>
                    {
                        listewilaya.map((lawilaya) =>( 
                                <option value={lawilaya.nom}>{lawilaya.nom}</option>
                        ))
                        
                    }
                    
          </select>}
          {listecommune &&listewilaya&&
          <select className='commune selectcase_deposer' onChange={(e)=> setCommune(e.target.value)}>
                    <option value=""  selected>Choose your commune</option>
                    {
                      // announcesall.filter(announce =>announce.title === annonceSearch.search )
                        listecommune.filter(com =>com.wilaya_name === wilaya ).map((lacommune) =>( 
                                <option value={lacommune.commune_name}>{lacommune.commune_name}</option>
                        ))
                        
                    }
                    
          </select>}
          </div>

                
        </div>
        
        
        
        



        {/* */}
        

        {/* <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                    {({getInputProps,suggestions,getSuggestionItemProps,loading})=>(<div>
                      <input {...getInputProps({placeholder:"adresse"})} />
                      <div>
                      {loading? <div>...loading</div>:null}
                      
                      {suggestions.map((suggestion) =>{
                        const style ={
                          backgroundColor : suggestion.active ? "#41b6e6" :"#fff"
                        };
                        console.log(suggestion.description);
                        return <div {...getSuggestionItemProps(suggestion,{style})}>{suggestion.description}</div>
                      })}
                      </div>
                    </div>)}

        </PlacesAutocomplete> */}
        
        
        {/*  */}
      </div>
      <button onClick={handleOpenwidget}>upload pictures</button>
      <div className="div-map"><Map className="map"
          mapLib={maplibregl}
          // initialViewState={{
          //   longitude: longitude,
          //   latitude: latitude,
          //   zoom: zoom,
          // }}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          
          style={{ width: "80%", height: " calc(95vh - 77px)" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=ami5YZbLyI4lKlA0CpRx	"
          
        >
          <NavigationControl position="top-left" />
         
            <Marker
              longitude={longitude}
              latitude={latitude}
              draggable= "true"
              onDrag= {evt=>{
                setLatitude(evt.lngLat.lat)
                setLongitude(evt.lngLat.lng)

              }}
            ></Marker>
        </Map>
        </div>
        <button className="searchbutton"type="submit" value="Submit"onClick={handleSubmit}>submit</button>
        
    </section>
  );
};

export default Deposerai;
