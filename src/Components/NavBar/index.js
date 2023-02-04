import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'
import axios from 'axios';
import jwt_decode from "jwt-decode";

import { 
Nav,
NavbarContainer,
NavLogo,
MobileIcon,
NavMenu,
NavItem,
NavLinks,
NavBtn,
NavBtnLink,
NavLinks_tmp} from './NavBarElements';

const NavBar = ({ toggle }) => {
    const [connexion,setConnexion]=useState(false)
    const [admin,setAdmine]=useState(false)
    useEffect(()=>{
        if (localStorage.getItem("token")) {
            setConnexion(true)
          }


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
            console.log(userObject)
            await axios
              .post("http://127.0.0.1:5000/adminManager", userinfo)
              .then(function(response) {
                console.log(response.data.type);
                if (response.data.type == true) {
                  setAdmine(true)
                }
              })
              .catch(() => alert("Il y a un problème"));
          }
      
          checkifAdmin();
    },[])
    function logout(){
        localStorage.removeItem("token");
        navigate("/", { replace: false });
    }
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/'>
                        {/*<image src={logo} type='Image/png' />*/} Sakeni
                  </NavLogo>
                    <MobileIcon onClick={toggle}>
                       <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                         <NavItem>
                                <NavLinks to="about">About</NavLinks>
                          </NavItem>
                         <NavItem>
                             <NavLinks to='discover'>Discover</NavLinks>
                         </NavItem>
                         <NavItem>
                             <NavLinks to='services'>Services</NavLinks>
                         </NavItem>
                         <NavItem>
                             <NavLinks_tmp to='/Signin/SigninUser/Main/lyes'>Get Started </NavLinks_tmp>
                         </NavItem>
                         {admin && <NavItem>
                             <NavLinks_tmp to='/Signin/SigninUser/Admin'>Admin </NavLinks_tmp>
                         </NavItem>}
                 </NavMenu>
                     
                     {!connexion &&<NavBtn>
                        <NavBtnLink to='/Signin'> Sign In  </NavBtnLink>
                     </NavBtn>}
                     {connexion &&<NavBtn>
                        <NavBtnLink onClick={()=>{logout()}}> Deconnexion  </NavBtnLink>
                     </NavBtn> }
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default NavBar
