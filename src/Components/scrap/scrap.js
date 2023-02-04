// lyes
import axios from "axios";
import { useState } from "react";
import "./style.css";


// pour faire le scrapping
const Scrap = () => {
  const [nbscrap, setNbscrap] = useState(20);
  const [scrap_work, setScrap_work] = useState(false);
  // pour envoyer la requete au back-end pour faire le scrapping
  const handleSubmit = async () => {
    let send = { nbscrap };
    setScrap_work(false);

    axios
      .post("http://127.0.0.1:5000/scrap", send)
      .then(function(response) {
        setScrap_work(response.data.scrap);
      })
      .catch(() => alert("Il y a un problème"));
  };
  return (
    <div>
      <div className="div_scrap_cp">
        {/* pour demander le nombre d'annonce a scrapper */}
        <input
          className="nb_scrap"
          type="number"
          placeholder="nombre de scrap 20(par defaut)"
          onChange={(e) => setNbscrap(e.target.value)}
        />
        <button className="bt_sb_scrap" onClick={handleSubmit}>
          scrap
        </button>
      </div>
      {/* si le scrapping terminer par succes */}
      {scrap_work && (
        <p className="messg_scrap">
          operation du scrapping terminée avec succès !!
        </p>
      )}
    </div>
  );
};

export default Scrap;
