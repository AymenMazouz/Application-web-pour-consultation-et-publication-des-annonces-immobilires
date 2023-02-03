import React from 'react';
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
NavBtnLink} from './NavBarElements';

const NavBar = ({ toggle }) => {
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
                                <NavLinks to="/Signin/SigninUser/Main/lyes">Cherecher Annonce</NavLinks>
                          </NavItem>
                         <NavItem>
                             <NavLinks to='/Signin/SigninUser/Main/annonce'>Mes annonces</NavLinks>
                         </NavItem>
                         <NavItem>
                             <NavLinks to='/Signin/SigninUser/Main/chat_View'>Messagerie</NavLinks>
                         </NavItem>
                         
                 </NavMenu>
                         <NavBtn>
                        <NavBtnLink to='/Signin/SigninUser/Main/deposerai'> Deposer annonce </NavBtnLink>
                     </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default NavBar
