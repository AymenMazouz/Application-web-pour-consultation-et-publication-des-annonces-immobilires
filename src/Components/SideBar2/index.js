import React from 'react'
import { SideBarContainer, Icon, CloseIcon, SideBarLink, SideBarMenu, SideBarRoute, SideBarWrapper, SideBtnWrap } from './SideBarElements'
import { useNavigate } from 'react-router-dom';

const SideBar = ({isOpen,toggle}) => {
    const navigate = useNavigate();
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
                    <SideBarLink onClick={toggle} to="/Signin/SigninUser/Main/recherche">Cherecher Annonce</SideBarLink>
                    <SideBarLink onClick={toggle} to='/Signin/SigninUser/Main/annonce'>Mes annonces</SideBarLink>
                    <SideBarLink onClick={toggle} to='/Signin/SigninUser/Main/chat_View'>Messagerie</SideBarLink>
                    <SideBarLink onClick={toggle} to='/Signin/SigninUser/Main/deposerai'>Deposer annonce</SideBarLink>
                </SideBarMenu>
                <SideBtnWrap>
                    <SideBarRoute onClick={()=>{logout()}}> Deconnecter</SideBarRoute>
                </SideBtnWrap> 
            </SideBarWrapper> 
        </SideBarContainer>
    )
}

export default SideBar;