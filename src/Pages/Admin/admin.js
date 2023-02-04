// lyes
import axios from "axios";
import { useEffect, useState } from "react";
import Scrap from "../../Components/scrap/scrap";
import SideBar from "../../Components/SideBar2";
import NavBar from "../../Components/NavBar2";
import Affiche_user from "../../Components/Affiche_List_User/Affiche_user";
import jwt_decode from "jwt-decode";

// la page des Admin pour faire le scrapping et affichage des utilisateur
const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // utilisation de useeffect pour tester si user qui a accedé a la page est un admin 
  useEffect(() => {
    async function checkifAdmin() {
      var token = localStorage.getItem("token");
      var userObject = jwt_decode(token);
      let admin = false;
      let adresse = "";
      let numerpTlf = "";
      let annonces = null;
      let messagesEnvoyer = null;
      let messagesRecu = null;
      let family_name = userObject.family_name;
      let given_name = userObject.given_name;
      let email = userObject.email;
      const userinfo = {
        admin,
        family_name,
        given_name,
        adresse,
        email,
        numerpTlf,
        annonces,
        messagesEnvoyer,
        messagesRecu,
      };
      await axios
        .post("http://127.0.0.1:5000/adminManager", userinfo)
        .then(function(response) {
          console.log(response.data.type);
          if (response.data.type == false) {
            localStorage.removeItem("token");
          }
        })
        .catch(() => alert("Il y a un problème"));
    }

    checkifAdmin();
  }, []);
  return (
    <div>
      {/* nav bar */}
      <SideBar isOpen={isOpen} toggle={toggle} />
      <NavBar toggle={toggle} />
      <div style={{ height: "80px" }}></div>
      {/* pour le crapping */}
      <Scrap />
      {/* pour afficher les utilisateur */}
      <Affiche_user />
    </div>
  );
};

export default Admin;
