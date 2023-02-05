import React, { useEffect } from 'react';
import { SideBarContainer, Icon, CloseIcon, SideBarLink, SideBarMenu, SideBarRoute, SideBarWrapper, SideBtnWrap,SideBarLink_tmp } from './SideBarElements'
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SideBar = ({isOpen,toggle}) => {
    const navigate = useNavigate();
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
        <SideBarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle} >
                <CloseIcon />
            </Icon>
            <SideBarWrapper>
                <SideBarMenu>
                    <SideBarLink onClick={toggle} to='about'>About</SideBarLink>
                    <SideBarLink onClick={toggle} to='discover'>Discover</SideBarLink>
                    <SideBarLink onClick={toggle} to='services'>Services</SideBarLink>
                    <SideBarLink_tmp onClick={toggle} to='/Signin/SigninUser/Main/lyes' >Get Started</SideBarLink_tmp>
                    {admin && <SideBarLink_tmp onClick={toggle} to='/Signin/SigninUser/Admin' >Admin</SideBarLink_tmp>}
                </SideBarMenu>
                {!connexion &&<SideBtnWrap>
                    <SideBarRoute to='/Signin'> Sign In</SideBarRoute>
                </SideBtnWrap>} 
                {connexion &&<SideBtnWrap>
                    <SideBarRoute onClick={()=>{logout()}}> Deconnexion</SideBarRoute>
                </SideBtnWrap>} 
            </SideBarWrapper> 
        </SideBarContainer>
    )
}

export default SideBar;