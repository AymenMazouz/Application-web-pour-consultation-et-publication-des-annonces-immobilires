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
                    <SideBarLink onClick={toggle} to='about'>About</SideBarLink>
                    <SideBarLink onClick={toggle} to='discover'>Discover</SideBarLink>
                    <SideBarLink onClick={toggle} to='services'>Services</SideBarLink>
                    <SideBarLink onClick={toggle} to='signup' >Sign Up</SideBarLink>
                </SideBarMenu>
                <SideBtnWrap>
                    <SideBarRoute to='/Signin'> Sign In</SideBarRoute>
                </SideBtnWrap> 
            </SideBarWrapper> 
        </SideBarContainer>
    )
}

export default SideBar;