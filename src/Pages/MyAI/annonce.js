// lyes
import React,{useState,useEffect} from 'react'
import './style.css'
import MesAI from '../../Components/MesAi/MesAi';
import axios from "axios";
import jwt_decode from "jwt-decode";
import SideBar from '../../Components/SideBar2'
import NavBar from '../../Components/NavBar2'
const AnnoncePage = () => {
    const [myannounces,SetMyanounces]=useState(null);
    const [aiispending,setAiispending]=useState(true);
    
    useEffect(()=>{
        const handleSubmit = async () => {
            console.log("lyesssssssssssssssssss");
            let infouser=jwt_decode(localStorage.getItem("token"));
            let EmailUser=infouser.email;
            let tosend={EmailUser}
            axios
              .post("http://127.0.0.1:5000/getmyannonce",tosend )
              .then(function(response) {
                console.log(response);
                SetMyanounces(response.data.announces)
                setAiispending(false)
              })
              .catch(() => alert("Il y a un problème"));
        
            
          };

          handleSubmit();









        // fetch('http://localhost:8000/announces').then(res =>{
        //  return res.json();
        // }).then((data)=>{
        //  SetMyanounces(data)
        //  setAiispending(false)
        // })
       },[])
       const [isOpen, setIsOpen]=useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return ( 
        <div>
          <SideBar isOpen={isOpen} toggle={toggle}/>
          <NavBar toggle={toggle}/>
          <div style={{height:"80px"}} ></div>
        
        {aiispending && <div>Loading ...</div>}
        {myannounces &&<MesAI myannounces={myannounces}/>}
        </div>
     );
}
 

export default AnnoncePage;
