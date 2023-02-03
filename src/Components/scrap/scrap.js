import axios from "axios";
import {useState } from "react";
import "./style.css";


const Scrap = () => {


    const [nbscrap,setNbscrap]=useState(20)
    const[scrap_work,setScrap_work]=useState(false)
    const handleSubmit = async () => {
        let send= {nbscrap}
        setScrap_work(false)
        
        axios
          .post("http://127.0.0.1:5000/scrap", send)
          .then(function(response) {
            console.log("lyes reponse",response);
            setScrap_work(response.data.scrap)
          })
          .catch(() => alert("Il y a un problème"));
      };
    return ( 
        <div >
        <div className="div_scrap_cp">
         <input className="nb_scrap" type="number" placeholder="nombre de scrap 20(par defaut)" onChange={(e) => setNbscrap(e.target.value)}/>
            <button className="bt_sb_scrap" onClick={handleSubmit}>scrap</button>
       
    </div> 
        {scrap_work &&<p className="messg_scrap">operation du scrapping terminée avec succès !!</p>}
    </div>
    );
}
 
export default Scrap;