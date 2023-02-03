import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { NavBtnLink, NavBtn } from './SigninPassElements'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




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
            navigate("/Signin/SigninUser/Admin", { replace: false });
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
  return (
    <div className="S">
      <h1>SigninPageAdmin</h1>

      <div  className='btnsigin'  id="signInDiv"></div>
      {Object.keys(user).length !== 0 &&
        <button className='btnlogout' onClick={(e) => handleSignOut(e)}> Sign Out</button>
      }
      {user &&
        <div>
          <img src={user.picture} alt='' />
          <h3> {user.name}</h3>
        </div>
      }
      {Object.keys(user).length !== 0 &&
        <NavBtn>
          <NavBtnLink to='/Signin/SigninAdminPass/SigninAdmin/Admin'> Get Started   </NavBtnLink>
        </NavBtn>}
    </div>

  );
}

export default SignInAdminPage;
