// lyes

import axios from "axios";
import { useState } from "react";
import "./style.css";


// permet d'afficher la liste des user pour l'admin
const Affiche_user = () => {
  const [page, setPage] = useState(1);
  const [hasnext, setHasnext] = useState(false);
  const [haspre, setHaspre] = useState(false);
  const [afficheliste, setAfficheliste] = useState(false);
  const [listUser, setListUser] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
//   pour obtenir la liste des user de la base de donné 
  async function fetchData(id) {
    const res = await axios.get("http://127.0.0.1:5000/liseruser/" + id);
    console.log(res.data);
    setHasnext(res.data.postssuiv);
    setHaspre(res.data.postspre);
    setListUser(res.data.users);
    setPage(res.data.postspage);
  }

  return (
    
    <div className="big-div-aff-user">
        {/* pour lancer la demande au back-end pour obtenir la liste des user 10 par page */}
      <button
        className="bt-nxt-prs"
        onClick={() => {
          setAfficheliste(true);
          setPage(1);
          fetchData(page);
        }}
      >
        afficher liste des utilisateur
      </button>
      {!afficheliste && (
        <div className="div-tab-user div-tab-user-tmp">
          <table className="tb_classe">
            <thead className="th_tab">
              <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Email</th>
                <th>Contact</th>
                <th className="adresse_user_tb">Adresse</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {listUser.map((user) => (
                <tr className="tr_cont">
                  <td className="column1"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="adresse_user_tb"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {afficheliste && (
        <div className="div-tab-user">
          <table className="tb_classe">
            <thead className="th_tab">
              <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Email</th>
                <th>Contact</th>
                <th className="adresse_user_tb">Adresse</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {listUser.map((user) => (
                <tr className="tr_cont">
                  <td className="column1">{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>{user.numerpTlf}</td>
                  <td className="adresse_user_tb">{user.adresse}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="div-bt-list-user">
            {haspre && (
              <button
                className="bt-nxt-prs"
                onClick={() => {
                  fetchData(page - 1);
                }}
              >
                previous
              </button>
            )}
            {hasnext && (
              <button
                className="bt-nxt-prs"
                onClick={() => {
                  fetchData(page + 1);
                }}
              >
                next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Affiche_user;
