import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { NavBtnLink, NavBtn } from "./SigninUserElements";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./stylelogin.css";
import SideBar from "../../../Components/SideBar2";
import NavBar from "../../../Components/NavBar2";

const SigninPageUser = () => {

  let navigate = useNavigate();
  let existe=true
  const[adresse,setAdresse]=useState("")
  const[numerpTlf,setNumerpTlf]=useState("")
  const [listPlace,setListPlace]=useState([]);
  const NOMINATIM_BASE_URL="https://nominatim.openstreetmap.org/search?"
  const params ={
  q:'',
  format:'json',
  addressdetails:'addressdetails',
  }
  const handleSubmit = async (userObject) => {
    let admin = false;
    // let adresse = "";
    // let numerpTlf = "";
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
    axios
      .post("http://127.0.0.1:5000/userManager", userinfo)
      .then(function(response) {  
        existe=response.data.existe
        if (existe==false) {
        document.getElementById("section_remplir_info").style.display="flex"
        document.getElementById("messg-selction-account").style.display="none"
       }
       else{
        navigate("/Signin/SigninUser/Main/lyes", { replace: false });
      }
        
      })
      .catch(() => alert("Il y a un problème"));
  };

  const [user, setUser] = useState({}); // dir b redux bch tkon global
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    localStorage.setItem("token", response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject.family_name);
    handleSubmit(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    existe=false;
    document.getElementById("section_remplir_info").style.display="none"

  }


  const complet_info = async (e) => {


              if (adresse == "" || isNaN(numerpTlf)) {
                document.getElementById("message_erreur").style.display="block"
                console.log(isNaN(numerpTlf));
              }
              else{
              let infouser=jwt_decode(localStorage.getItem("token"));
              let EmailUser=infouser.email;
              let userinfo={adresse,numerpTlf,EmailUser}
              console.log(userinfo.EmailUser);
              axios
                .post("http://127.0.0.1:5000/userinfo", userinfo)
                .then(function(response) {
                  console.log(response);
                  navigate("/Signin/SigninUser/Main/lyes", { replace: false });
                })
                .catch(() => alert("Il y a un problème"));
              }
              }
              window.onkeydown = evt => {
                console.log(evt.keyCode);
                if(evt.keyCode==evt.keyCode){
                  document.getElementById("div_sugg_adresse").style.display="none"
                }
              }
  
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "104974982135-4btj163efr6185d8nbuk96coplke6db5.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    //google.accounts.id.prompt();
  }, []);

  // si on a pas de user :sign in button
  // si on a un user : afficher log out button
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
    <SideBar isOpen={isOpen} toggle={toggle} />
      <NavBar toggle={toggle} />
      <div style={{ height: "80px" }}></div>
    <section className="section-login">
    <div className="S container-1-login">
    <h1 className="login-message">Bienvenue dans la page du login</h1>
      
     <div> 
     <p id="messg-selction-account">veuillez selection votre compte google </p>
      <div id="signInDiv"> 
      </div>
      </div>
      
      {/* {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}> Sign Out</button>
      )} */}
      {user && (
        <div>
          <img src={user.picture} alt="" />
          <h3> {user.name}</h3>
        </div>
      )}
      
      {/* {Object.keys(user).length !== 0 && (
        <NavBtn>
          <NavBtnLink to="/Signin/SigninUser/Main"> MAIN </NavBtnLink>
        </NavBtn>
      )} */}
      <section id="section_remplir_info" style={{display:"none"}}>
      <div className="div_address div_adress_tmp">
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
          <div className="div_sugg_adresse div_sugg_adresse_tmp"id="div_sugg_adresse">
          {
            listPlace.map((item)=>{
              return(
                <div className="sugg_adresse" key={item?.osm_id} onClick={()=>{
                    document.getElementById("address").value=item?.display_name
                    setAdresse(item?.display_name)
                    document.getElementById("div_sugg_adresse").style.display="none"
                    console.log(item?.display_name);
                    

                }}>
                    <img src={require("../../../Images/position.png")} alt="position icon" className="postion_icon"  />
                    <p>{item?.display_name}</p>
                  </div>
              )
            })
          }
          </div>
          </div>
          <div>
            <input className="nb_phone_input_login" type="text" maxlength = "10" placeholder="Numero de téléphone"onChange={(e) => {setNumerpTlf(e.target.value)}}/>
          </div>
          <p id="message_erreur"style={{display:"none", color:"rgb(252, 61, 61)"}}>veuillez remplir les champs correctement </p>
          <button  className="bt_sb_info_login" onClick={complet_info}>Submite</button>
      </section>
    </div>
    <div className="container-2-login">
      <img   className="imag-login-hide" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"  alt="image d'une maison"  />
    </div>

    </section>
    </div>
  );
};

export default SigninPageUser;
