// lyes
import React,{useState,useEffect} from 'react'
import './style.css'
import MesAI from '../../Components/MesAi/MesAi';
const AnnoncePage = () => {
    const [myannounces,SetMyanounces]=useState(null);
    const [aiispending,setAiispending]=useState(true);

    useEffect(()=>{
        fetch('http://localhost:8000/announces').then(res =>{
         return res.json();
        }).then((data)=>{
         SetMyanounces(data)
         setAiispending(false)
        })
       },[])

    return ( 
        <div>
        <h2 className='annoncesh2'>my annonces </h2>
        {aiispending && <div>Loading ...</div>}
        {myannounces &&<MesAI myannounces={myannounces}/>}
        </div>
     );
}
 

export default AnnoncePage;
