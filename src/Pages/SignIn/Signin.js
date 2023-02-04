import React from 'react'
import Video from '../../Videos/video2.mp4'
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper,NavBtnLink,NavBtn1,NavBtn2 } from './SigninElements'
import Footer from '../../Components/Footer/Footer';
const Signin = () => {

   return (
      <div>
      <HeroContainer>
         <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type='Video2/mp4' />
         </HeroBg>
         <HeroContent>
            <HeroH1> Are you a Simple User Or an Admin ? </HeroH1>
            <HeroP> Administrators have the highest level of access to an account. A general user will have limited access to the account as per the permissions given by the Admin.
             </HeroP>
            <HeroBtnWrapper>
                  <NavBtn1>
                     <NavBtnLink to='/Signin/SigninUser'>Utilisateur  </NavBtnLink>
                  </NavBtn1>
                  <NavBtn2>
                  <NavBtnLink to='/Signin/SigninAdminPass/SigninAdmin'> Administrateur    </NavBtnLink>
                  </NavBtn2>
            </HeroBtnWrapper>
         </HeroContent>
         
      </HeroContainer>
      <Footer />
      </div>
   );
};

export default Signin;

//=============================================================================================================================