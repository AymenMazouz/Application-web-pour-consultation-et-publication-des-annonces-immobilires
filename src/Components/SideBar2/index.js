import React from 'react'
import { SideBarContainer, Icon, CloseIcon, SideBarLink, SideBarMenu, SideBarRoute, SideBarWrapper, SideBtnWrap } from './SideBarElements'

const SideBar = ({isOpen,toggle}) => {
    return (
        <SideBarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle} >
                <CloseIcon />
            </Icon>
            <SideBarWrapper>
                <SideBarMenu>
                    <SideBarLink onClick={toggle} to="/Signin/SigninUser/Main/lyes">Cherecher Annonce</SideBarLink>
                    <SideBarLink onClick={toggle} to='/Signin/SigninUser/Main/annonce'>Mes annonces</SideBarLink>
                    <SideBarLink onClick={toggle} to='/Signin/SigninUser/Main/chat_View'>Messagerie</SideBarLink>
                </SideBarMenu>
                <SideBtnWrap>
                    <SideBarRoute to='/Signin/SigninUser/Main/deposerai'> Deposer annonce</SideBarRoute>
                </SideBtnWrap> 
            </SideBarWrapper> 
        </SideBarContainer>
    )
}

export default SideBar;