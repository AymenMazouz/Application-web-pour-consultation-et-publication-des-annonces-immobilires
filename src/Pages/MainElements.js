import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom'
//========================================================================================================
export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-top: 70px;
@media screen and (max-width : 768px) {
//display:none ;
}
`
//========================================================================================================

//========================================================================================================

export const NavBtnLink = styled(LinkR)`
border-radius: 50px;
background: #0a58bf;
white-space: nowrap;
padding: 10px 22px;
color: #fff;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
&:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
}
`;//========================================================================================================