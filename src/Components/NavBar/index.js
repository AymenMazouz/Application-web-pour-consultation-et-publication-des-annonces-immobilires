import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'

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
