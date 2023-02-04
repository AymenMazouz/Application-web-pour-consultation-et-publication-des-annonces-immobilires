import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { NavBtnLink, NavBtn } from './SigninPassElements'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from "../../../Components/SideBar2";
import NavBar from "../../../Components/NavBar2";




const SignInAdminPage = () => {

  
  let navigate = useNavigate();
    const handleSubmit = async (userObject) => {
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
      axios
        .post("http://127.0.0.1:5000/adminManager", userinfo)
        .then(function(response) {
          console.log(response);
          if (response.data.type) {

            console.log("lyesssssssssssss")
            navigate("/Signin/SigninUser/Admin", { replace: false });
            console.log("challllllllll")
          }else{
            alert("access denied !!! you are not an admin");
            setUser({});
            document.getElementById("signInDiv").hidden = false;
          }
        })
        .catch(() => alert("Il y a un problème"));
    };
  

  const [user, setUser] = useState({}) // dir b redux bch tkon global
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    localStorage.setItem("token", response.credential);
    var userObject = jwt_decode(response.credential);
    
    console.log(userObject);
    handleSubmit(userObject)
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;

  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;


  }
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "104974982135-4btj163efr6185d8nbuk96coplke6db5.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
   // google.accounts.id.prompt();
  }, []);

  // si on a pas de user :sign in button 
  // si on a un user : afficher log out button
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (

    <div >
      <SideBar isOpen={isOpen} toggle={toggle} />
      <NavBar toggle={toggle} />
      <div style={{ height: "80px" }}></div>
      <section className="section-login">
      <div className="S container-1-login">
      <h1 className="login-message" >Bienvenue dans la page du login du admin </h1>
      <div>
      <p id="messg-selction-account">veuillez selection votre compte google </p>
      <div  className='btnsigin'  id="signInDiv"></div>
      </div>
      {/* {Object.keys(user).length !== 0 &&
        <button className='btnlogout' onClick={(e) => handleSignOut(e)}> Sign Out</button>
      } */}
      {user &&
        <div>
          <img src={user.picture} alt='' />
          <h3> {user.name}</h3>
        </div>
      }
      </div>
      <div className="container-2-login">
      <img   className="imag-login-hide" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"  alt="image d'une maison"  />

    </div>
      {/* {Object.keys(user).length !== 0 &&
        <NavBtn>
          <NavBtnLink to='/Signin/SigninAdminPass/SigninAdmin/Admin'> Get Started   </NavBtnLink>
        </NavBtn>} */}
        </section>
    </div>

  );
}

export default SignInAdminPage;
