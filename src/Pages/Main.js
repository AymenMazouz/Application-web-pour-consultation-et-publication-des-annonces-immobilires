import React from 'react'
import { NavBtnLink, NavBtn } from '../Pages/MainElements'


const MainPage = () => {
  return (
    <div>
        <h1>MainPAGE </h1>
      <NavBtn>
        <NavBtnLink to='/Signin/SigninUser/Main/lyes'> lyes  </NavBtnLink>
      </NavBtn>
      <NavBtn>
        <NavBtnLink to='/Signin/SigninUser/Main/annonce'> annonce  </NavBtnLink>
      </NavBtn>
      <NavBtn>
        <NavBtnLink to='/Signin/SigninUser/Main/chat_View'> deposerAI  </NavBtnLink>
      </NavBtn>
    </div>
  )
}

export default MainPage