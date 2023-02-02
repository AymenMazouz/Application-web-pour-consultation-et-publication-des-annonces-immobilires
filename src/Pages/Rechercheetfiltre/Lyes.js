// lyes
import React, { useState, useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import Map_Annonce from "../../Components/Map_Annonce/map_annonce";
import img from "../../Images/img.png";
import Button from "../../Components/Footer/Button";
import DetailAI from "../DetailAI/detailAI";
import { Router, Route } from "react-router-dom";
import axios from "axios";


const LyesPage = () => {
  const [announces, SetAnounces] = useState(null);
  const [announcesall, SetAnnouncesall] = useState(null);
  const [aiispending, setAiispending] = useState(true);
  const [error, setError] = useState(null);
  const[page,setPage]=useState(1)
  // var page=1;
  const[suivant,setSuivant]=useState(false)
  const[precedent,setPrecedent]=useState(false)


  async function fetchData(nbpage) {
    // const res = await axios.get("http://127.0.0.1:5000/annonceget");
    // console.log("pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",page);
    const res = await axios.get("http://127.0.0.1:5000//annoncegetnew/"+nbpage);
    console.log(res.data);
    SetAnounces(res.data.announces);
    SetAnnouncesall(res.data.announces);
    setAiispending(false);
    setError(null); // ...
    setPrecedent(res.data.postspre)
    setSuivant(res.data.postssuiv)
    setPage(res.data.postspage)
  }

  useEffect(() => {
    async function fetchData() {
      // const res = await axios.get("http://127.0.0.1:5000/annonceget");
      console.log("pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",page);
      const res = await axios.get("http://127.0.0.1:5000//annoncegetnew/1");
      console.log(res.data);
      SetAnounces(res.data.announces);
      SetAnnouncesall(res.data.announces);
      setAiispending(false);
      setError(null); // ...
      setPrecedent(res.data.postspre)
      setSuivant(res.data.postssuiv)
      setPage(res.data.postspage)
    }
    fetchData();
    

    //  fetch('http://localhost:8000/announces').then(res =>{
    //   if (!res.ok) {
    //     throw Error('Could not fetch the data for that resource ')
    //   }
    //   return res.json();
    //  }).then((data)=>{
    //   SetAnounces(data)
    //   SetAnnouncesall(data)
    //   setAiispending(false)
    //   setError(null)
    //  }).catch(err =>{
    //   setAiispending(false)
    //   setError(err.message)
    //  })
  }, []);
  const handleFilter = async (annonceSearch) => {
    // let annoncetmp = [];
    // let tmpused = false;

    // if (annonceSearch.search != "") {
    //   annoncetmp = announcesall.filter(
    //     (announce) => announce.title === annonceSearch.search
    //   );
    //   tmpused = true;
    // }
    // if (annonceSearch.type != "" && tmpused) {
    //   annoncetmp = annoncetmp.filter(
    //     (announce) => announce.type === annonceSearch.type
    //   );
    // } else {
    //   if (annonceSearch.type != "" && !tmpused) {
    //     annoncetmp = announcesall.filter(
    //       (announce) => announce.type === annonceSearch.type
    //     );
    //     tmpused = true;
    //   }
    // }

    // if (annonceSearch.wilaya != "" && tmpused) {
    //   annoncetmp = annoncetmp.filter(
    //     (announce) => announce.wilaya === annonceSearch.wilaya
    //   );
    // } else {
    //   if (annonceSearch.wilaya != "" && !tmpused) {
    //     annoncetmp = announcesall.filter(
    //       (announce) => announce.wilaya === annonceSearch.wilaya
    //     );
    //     tmpused = true;
    //   }
    // }
    // if (annonceSearch.commune != "" && tmpused) {
    //   annoncetmp = annoncetmp.filter(
    //     (announce) => announce.commune === annonceSearch.commune
    //   );
    // } else {
    //   if (annonceSearch.commune != "" && !tmpused) {
    //     annoncetmp = announcesall.filter(
    //       (announce) => announce.commune === annonceSearch.commune
    //     );
    //     tmpused = true;
    //   }
    // }
    // if (annonceSearch.datedebut != "" && tmpused) {
    //   annoncetmp = annoncetmp.filter(
    //     (announce) =>
    //       new Date(announce.date) >= new Date(annonceSearch.datedebut)
    //   );
    // } else {
    //   if (annonceSearch.datedebut != "" && !tmpused) {
    //     annoncetmp = announcesall.filter(
    //       (announce) =>
    //         new Date(announce.date) >= new Date(annonceSearch.datedebut)
    //     );
    //     tmpused = true;
    //   }
    // }
    // if (annonceSearch.datefin != "" && tmpused) {
    //   annoncetmp = annoncetmp.filter(
    //     (announce) => new Date(announce.date) <= new Date(annonceSearch.datefin)
    //   );
    // } else {
    //   if (annonceSearch.datedebut != "" && !tmpused) {
    //     annoncetmp = announcesall.filter(
    //       (announce) =>
    //         new Date(announce.date) <= new Date(annonceSearch.datefin)
    //     );
    //     tmpused = true;
    //   }
    // }
    // if (
    //   annonceSearch.datefin == "" &&
    //   annonceSearch.datedebut == "" &&
    //   annonceSearch.commune == "" &&
    //   annonceSearch.wilaya == "" &&
    //   annonceSearch.type == "" &&
    //   annonceSearch.search == ""
    // ) {
    //   SetAnounces(announcesall);
    // }
    // supprime tout le contenue de cette fonction et remplace le par le fetch 

    await axios
      .post("http://127.0.0.1:5000/recherche", annonceSearch)
      .then(() => alert("Envoyé avec success"))
      .catch(() => alert("Il y a un problème"));
    const res = await axios.get("http://127.0.0.1:5000/rechercheget");
    console.log(res.data.announces);
    SetAnounces(res.data.announces);
    SetAnnouncesall(res.data.announces);  

    //SetAnounces(annoncetmp);
    //console.log(annoncetmp);


  };
  return (
    <div>
      {announcesall && <SearchBar handleFilter={handleFilter} />}
      {announcesall != announces && (
        <button
          onClick={() => {
            SetAnounces(announcesall);
          }}
        >
          annuler search
        </button>
      )}
      {error && <div> {error}</div>}
      {aiispending && <div>Loading ...</div>}
      {announcesall && <Map_Annonce announces={announces} />}
      {/* {announcesall && console.log(announces)} */}
      {announcesall && precedent && <button onClick={async()=>{
        // page=page-1;
        fetchData(page-1);
      }}>previos</button>}
      {announcesall && suivant &&<button onClick={async()=>{
        console.log("page f2irst",page);
        // page = page+1;
        console.log("page s2econd",page+1);
        fetchData(page+1);
      }}>next</button>} 
    </div>
  );
};

export default LyesPage;
