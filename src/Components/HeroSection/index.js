import React, {useState} from 'react'
import Video from '../../Videos/video.mp4'
import { HeroContainer , HeroBg, VideoBg ,HeroContent,HeroH1,HeroP,HeroBtnWrapper,ArrowForward,ArrowRight} from './HeroElements'
import { Button } from '../ButtonElement';

const HeroSection = () => {
    const[hover,setHover] = useState(false)
    const onHover = ()=>{
        setHover(!hover)

    }
  return (

        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='Video/mp4' />
            </HeroBg>
            <HeroContent>
              <HeroH1> Find it. Tour it. Own it. </HeroH1>
              <HeroP>Save thousands. Use our innovative technology
                  to walk you step-by-step through the
                  home buying and selling process</HeroP>
                <HeroBtnWrapper>
                    <Button
                      to='/Signin/SigninUser/Main/lyes'
                      // onClick={()=>{navigate("/Signin/SigninUser/Main/lyes", { replace: false });}}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary='true'
                    dark='true'>
                      Get Started {hover ? <ArrowForward /> :<ArrowRight />}
                     </Button> 
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>

    );
};

export default HeroSection;