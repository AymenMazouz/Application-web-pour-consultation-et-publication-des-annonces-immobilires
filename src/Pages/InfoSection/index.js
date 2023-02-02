import React from 'react';
import{Button} from'../ButtonElement';
import{
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Colum1,
    Colum2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img
} from './InfoElements'

const InfoSection = ({
lightBg,
id,
imgStart,
topLine,
lightText,
headline,
darkText,
description,
buttonLabel,
img,
alt,
primary,
dark,
dark2}

) => {
  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
          <InfoWrapper>
            <InfoRow imgStart={imgStart}>
                <Colum1>
                <TextWrapper>

                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
                <BtnWrap>
                    <Button 
                    to='signin'
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    primary={primary ? 1 : 0}
                    dark={dark ? 1 : 0}
                    dark2={dark2 ? 1 : 0}>{buttonLabel}
                   </Button> 
                </BtnWrap>
                </TextWrapper>
                </Colum1>
                <Colum2>
                      <ImgWrap>
                            <Img src={img} alt={alt}/>
                      </ImgWrap>
                </Colum2>
            </InfoRow>
          </InfoWrapper>
        </InfoContainer>
    </>
  )
};

export default InfoSection;