import React, { useEffect } from 'react';
import { SideBarContainer, Icon, CloseIcon, SideBarLink, SideBarMenu, SideBarRoute, SideBarWrapper, SideBtnWrap } from './SideBarElements'
import { useState } from 'react';
const SideBar = ({isOpen,toggle}) => {
    const [connexion,setConnexion]=useState(false)
    useEffect(()=>{
        if (localStorage.getItem("token")) {
            setConnexion(true)
          }
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
                    <SideBarLink onClick={toggle} to='signup' >Sign Up</SideBarLink>
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