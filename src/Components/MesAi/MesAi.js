// lyes
import './style.css'
import React,{useState,useEffect} from 'react'
const MesAI = (propAI) => {
    const [announces,SetAnnounces]=useState(propAI.myannounces)
    
    const handledelete=(id)=>{
        fetch('http://localhost:8000/announces/' + id,{
            method:'DELETE'
        }).then(()=>{

            const newlisteannounces= announces.filter(announce => announce.id != id);
            SetAnnounces(newlisteannounces);
        })
    }
    // useEffect(()=>{
    //     const ifamedata =document.getElementById("ifameId")
    //     const lat = 11.35;
    //     const lon =40.55;
    //     ifamedata.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    // })

    
    return ( 
        

        <dir className="my_ai_ContainerMap_Annonce">
            <div className="my_ai_map">
            {/* <iframe id='ifameId' width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0" ></iframe> */}
            </div>
            <div className="my_ai_Containerannonce">
                {
                    
                    announces.map((announce) =>(
                        <div className="my_ai_annonce" key={announce.id}>
                            <div className="my_ai_divimg"><img className="my_ai_imgai" src={announce.imglink} alt="AI IMAGE" width="100%"  /></div>
                            <p className="my_ai_prix">{announce.prix} DA</p>
                            <p className="my_ai_adr">{announce.adr}</p>
                            <div className="my_ai_TypeSurface">
                                <p className="my_ai_typeai">{announce.type}</p>
                                <p className="my_ai_surface">{announce.surface} m²</p>
                            </div>
                            <button className='buttomdelete' onClick={()=>handledelete(announce.id)}>Delete</button>

                        </div>
                    ))
                }
            </div>
        </dir>

     );
}
 
export default MesAI;