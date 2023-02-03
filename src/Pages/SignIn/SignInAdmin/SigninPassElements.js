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

//========================================================================================================
export const Colum1 = styled.div`
margin-bottom: 15px;
padding: 0 15px;
margin-right: 100px;
grid-area: col1;
`
//========================================================================================================

//========================================================================================================
export const Colum2 = styled.div`
margin-bottom: 15px;
margin-left: 100px;
padding: 0 15px;
grid-area: col2;
`
//========================================================================================================
//========================================================================================================
export const InfoContainer = styled.div`
color: #fff;
background:#000;

@media screen and (max-width : 768px) {
    padding: 100px 0;  
}
`;
//========================================================================================================

//========================================================================================================
export const InfoWrapper = styled.div`
display: grid;
z-index: 1;
height: 580px;
width: 100%;
max-width: 1100px;
margin-right: auto;
margin-left: auto;
padding: 0 190px;
justify-content: center;
`
//========================================================================================================

//========================================================================================================
export const InfoRow = styled.div`
display: grid;
grid-auto-columns: minmax(auto,1fr);
align-items: center;

grid-template-areas: ${({ imgStart }) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};

@media screen and (max-width:768px) {
    grid-template-areas: ${({ imgStart }) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
    
};
`
//========================================================================================================
//========================================================================================================
export const TextWrapper = styled.div`
max-width: 540px;
padding-top: 0;
padding-bottom: 20px;

`;
//========================================================================================================

//========================================================================================================
export const TopLine = styled.p`
color: #0a58bf;
font-size: 16px;
line-height: 16px;
font-weight: 700;
letter-spacing: 1.4px;
text-transform: uppercase;
margin-bottom: 16px;
`
//========================================================================================================

//========================================================================================================
export const Heading = styled.h1`
margin-bottom: 15px;
font-size: 48px;
line-height: 1.1;
font-weight: 600;
color: ${({ lightText }) => (lightText ? '#000' : '#fff')};

@media screen  and (max-width:480px){
    font-size: 32px;
}
`
//========================================================================================================

//========================================================================================================
export const Subtitle = styled.p`
max-width: 440px;
margin-left: 10px;
font-size: 18px;
line-height: 24px;
color:${({ darkText }) => (darkText ? '#010606' : '#fff')} ;
`;

//========================================================================================================
//========================================================================================================
export const ImgWrap = styled.div`
max-width: 555px;
height: 100%;
`
//========================================================================================================

//========================================================================================================
export const Img = styled.img`
width: 100%;
margin: 0 0 10px 0;
padding-right: 0;
`;
//========================================================================================================