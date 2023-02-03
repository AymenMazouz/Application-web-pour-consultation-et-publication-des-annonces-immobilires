import axios from "axios";
import {  useState } from "react";


const Affiche_user = () => {
    let page=1
    const [hasnext,setHasnext]=useState(false)
    const [haspre,setHaspre]=useState(false)
    const [afficheliste,setAfficheliste]=useState(false)
    const [listUser,setListUser]=useState([])
    async function fetchData(id) {
        const res = await axios.get("http://127.0.0.1:5000/liseruser/"+id);
        console.log(res.data);
        setHasnext(res.data.postssuiv)
        setHaspre(res.data.postspre)
        setListUser(res.data.users)

    }   
    return ( 
    <div>
        <button onClick={()=>{setAfficheliste(true);page=1;fetchData(page)}}>afficher liste des utilisateur</button>
        {afficheliste &&<div>
        
                {listUser.map((user) => (
                    <p>{user.nom}</p>
                    
                  ))}


            
            <div>
                {haspre && <button onClick={()=>{
                    page=page-1;
                    fetchData(page)
                    }}>previos</button>}
                {hasnext && <button onClick={()=>{
                    page=page+1;
                    fetchData(page)
                    }}>next</button>}
            </div>
        </div>}
    </div>
    );
}
 
export default Affiche_user;