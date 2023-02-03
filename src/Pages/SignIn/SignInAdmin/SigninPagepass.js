import React,{useState} from 'react'
import { NavBtn, NavBtnLink, Colum1, Colum2, InfoContainer, InfoRow, InfoWrapper, Heading, Subtitle, TextWrapper, TopLine ,ImgWrap,Img } from './SigninPassElements'

const SigninPagepass = () => {
  //ici declarer t3 l responsive

  const[password,setPaaword]= useState('')
  const [message, setMessage] = useState('')
  const [isAdmin,setIsAdmin] =useState(false);

  function handleChange (e) {
    setPaaword(e.target.value)
  }
  const handleValidation =(e) => {
    e.preventDefault();
        const Adminpass = '0000'
    if (password ===""){
      setMessage ("please enter password")
    } else if (password === Adminpass){
      setMessage("password is valid")
      setIsAdmin(true)
    } else if (!(password === Adminpass)) {
      setMessage("password is not  valid")
    }
  }

  return ( <>
    <InfoContainer>
    <InfoWrapper>
        <InfoRow>
        <Colum1>
            <TextWrapper>

              <TopLine>Password validation </TopLine>
              <Heading >Validation</Heading>
              <Subtitle >Entrer le mot de passe </Subtitle>
              </TextWrapper>
                    <form onSubmit={handleValidation}>
                    <label htmlFor="password" className='form-control-label'></label>
                    <input type="password" className='form-control' autoComplete="on"
                     onChange={handleChange}
                     value={password} />
                     <p>{message}</p>
                     <button className='btn btn-success'> Check </button>
             { isAdmin
           && <NavBtn>
                <NavBtnLink to='/Signin/SigninAdminPass/SigninAdmin'> Admin </NavBtnLink>
              </NavBtn>}
                    </form>
       </Colum1 >
        <Colum2>
            <ImgWrap>
              <Img src={require('../../../Images/Pass.png')} />
            </ImgWrap>
        </Colum2>


    </InfoRow>
      </InfoWrapper>
      </InfoContainer>



</>


  )
}

export default SigninPagepass


