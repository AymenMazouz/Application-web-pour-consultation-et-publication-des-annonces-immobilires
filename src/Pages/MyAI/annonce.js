// lyes
import React, { useState, useEffect } from "react";
import "./style.css";
import MesAI from "../../Components/MesAi/MesAi";
import axios from "axios";
import jwt_decode from "jwt-decode";
import SideBar from "../../Components/SideBar2";
import NavBar from "../../Components/NavBar2";

// page permet d'afficher les annonces de l'utilisateur 
const AnnoncePage = () => {
  const [myannounces, SetMyanounces] = useState(null);
  const [aiispending, setAiispending] = useState(true);


// utiliser useeffect pour obtenir les annonces de la base de donné des que l'user entre dans cette pagz
  useEffect(() => {
    const handleSubmit = async () => {
      let infouser = jwt_decode(localStorage.getItem("token"));
      let EmailUser = infouser.email;
      let tosend = { EmailUser };
      axios
        .post("http://127.0.0.1:5000/getmyannonce", tosend)
        .then(function(response) {
          console.log(response);
          SetMyanounces(response.data.announces);
          setAiispending(false);
        })
        .catch(() => alert("Il y a un problème"));
    };

    handleSubmit();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {/* NAV bar */}
      <SideBar isOpen={isOpen} toggle={toggle} />
      <NavBar toggle={toggle} />
      <div style={{ height: "80px" }}></div>

      {aiispending && <div>Loading ...</div>}
      {/* affichage des annonces et la map */}
      {myannounces && <MesAI myannounces={myannounces} />}
    </div>
  );
};

export default AnnoncePage;
