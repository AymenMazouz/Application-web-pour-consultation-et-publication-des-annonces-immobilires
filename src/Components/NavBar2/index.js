import React from 'react';
import { FaBars } from 'react-icons/fa'
import { Outlet } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
Nav,
NavbarContainer,
NavLogo,
MobileIcon,
NavMenu,
NavItem,
NavLinks,
NavBtn,
NavBtnLink} from './NavBarElements';

const NavBar = ({ toggle }) => {
    const navigate = useNavigate();
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
                                <NavLinks to="/Signin/SigninUser/Main/recherche">Cherecher Annonce</NavLinks>
                          </NavItem>
                         <NavItem>
                             <NavLinks to='/Signin/SigninUser/Main/annonce'>Mes annonces</NavLinks>
                         </NavItem>
                         <NavItem>
                             <NavLinks to='/Signin/SigninUser/Main/chat_View'>Messagerie</NavLinks>
                         </NavItem>
                         <NavItem>
                             <NavLinks id='deposer_AI_bt_test' to='/Signin/SigninUser/Main/deposerai'>Deposer annonce</NavLinks>
                         </NavItem>
                         
                 </NavMenu>
                         <NavBtn>
                        <NavBtnLink onClick={()=>{logout()}}> Deconnecter </NavBtnLink>
                     </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default NavBar
