import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import PlacesAutocomplete,{geocodeByAddress,getLatLng}from"react-places-autocomplete"


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


  
  const handleOpenwidget = () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dap2rzulg', 
      uploadPreset: 'xkbcejv4'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          // setImages((prev)=>[...prev,{url:result.info.url,public_id:result.info.public_id}])
          setImages((prev)=>[...prev,result.info.url])
          console.log('Done! Here is the image info: ', result.info.url); 
          // setImages(result.info.url)
          console.log(images); 
        }
      }
    )
    //open widget
    myWidget.open();
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let infouser=jwt_decode(localStorage.getItem("token"));
    let EmailUser=infouser.email;
    const diposerAI = { title, description, type, categorie ,wilaya,commune,adresse,prix,surface,longitude,latitude,images,EmailUser};

    console.log(diposerAI);

    axios
      .post("http://127.0.0.1:5000/annonce", diposerAI)
      .then(() => alert("Envoyé avec success"))
      .catch(() => alert("Il y a un problème"));

    // let headersList = {
    //   Accept: "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Content-Type": "application/json",

    // };:

    // let bodyContent = JSON.stringify({
    //   name: title,
    //   description: description,
    // });

    // let response = await fetch("http://127.0.0.1:5000/annonce", {
    //   method: "POST",
    //   body: bodyContent,
    //   headers: headersList,
    // });

    // let data = await response.text();
    // console.log(data);
  };
  const [address,setAddress]=useState("")
  const handleSelect =async (value)=>{}
  return (
    <section>
      <form className="Containersearch_filter" onSubmit={handleSubmit}>
        <div>
          <input
            className="seachinput"
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="seachinput"
            type="text"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="type selectcase"
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
            className="type selectcase"
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
          <input
            className="seachinput"
            type="text"
            placeholder="adresse"
            onChange={(e) => setAdresse(e.target.value)}
          />
          <input
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
          />
          <input
            className="seachinput"
            type="text"
            placeholder="prix"
            onChange={(e) => setPrix(e.target.value)}
          />
          <input
            className="seachinput"
            type="text"
            placeholder="surface"
            onChange={(e) => setSurface(e.target.value)}
          />
          {listewilaya &&
          <select className='commune selectcase' onChange={(e)=> setWilaya(e.target.value)}>
                    <option value=""  selected>Choose your wilaya</option>
                    {
                        listewilaya.map((lawilaya) =>( 
                                <option value={lawilaya.nom}>{lawilaya.nom}</option>
                        ))
                        
                    }
                    
                </select>}
          {listecommune &&listewilaya&&
          <select className='commune selectcase' onChange={(e)=> setCommune(e.target.value)}>
                    <option value=""  selected>Choose your commune</option>
                    {
                      // announcesall.filter(announce =>announce.title === annonceSearch.search )
                        listecommune.filter(com =>com.wilaya_name === wilaya ).map((lacommune) =>( 
                                <option value={lacommune.commune_name}>{lacommune.commune_name}</option>
                        ))
                        
                    }
                    
                </select>}

        </div>
        
        <div onClick={handleOpenwidget}>upload pictures</div>
        
        <button className="searchbutton">submit</button>



        {/* */}
        

        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>


        </PlacesAutocomplete>
        {/*  */}
      </form>
    </section>
  );
};

export default Deposerai;
