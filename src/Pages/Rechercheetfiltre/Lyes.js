// lyes
import React, { useState, useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import Map_Annonce from "../../Components/Map_Annonce/map_annonce";
import axios from "axios";
import SideBar from "../../Components/SideBar2";
import NavBar from "../../Components/NavBar2";
import "./style.css";

// page pour la recherche des annonces et l'affichage des annonces
const LyesPage = () => {
  const [announces, SetAnounces] = useState(null);
  const [announcesall, SetAnnouncesall] = useState(null);
  const [aiispending, setAiispending] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [suivant, setSuivant] = useState(false);
  const [precedent, setPrecedent] = useState(false);
  const [search, setSearch] = useState(false);

  // cette fonction permet d'otenir les annonces de la base de donné 10 annonces par page
  async function fetchData(nbpage) {
    const res = await axios.get(
      "http://127.0.0.1:5000//annoncegetnew/" + nbpage
    );
    console.log(res.data);
    SetAnounces(res.data.announces);
    SetAnnouncesall(res.data.announces);
    setAiispending(false);
    setError(null); // ...
    setPrecedent(res.data.postspre);
    setSuivant(res.data.postssuiv);
    setPage(res.data.postspage);
  }

  // utliser useEffect pour obtenir  les annonces des que la page s'affiche
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://127.0.0.1:5000//annoncegetnew/1");
      console.log(res.data);
      SetAnounces(res.data.announces);
      SetAnnouncesall(res.data.announces);
      setAiispending(false);
      setError(null); // ...
      setPrecedent(res.data.postspre);
      setSuivant(res.data.postssuiv);
      setPage(res.data.postspage);
    }

    fetchData();
  }, []);

  // cette fonction permet d'enoyer les parametre de rechecher fait par l'ulisateur vers le back-ed
  const handleFilter = async (annonceSearch) => {
    await axios
      .post("http://127.0.0.1:5000/recherche", annonceSearch)
      .then(() => {
        alert("Envoyé avec success");
        setSearch(true);
      })
      .catch(() => alert("Il y a un problème"));
    const res = await axios.get("http://127.0.0.1:5000/rechercheget");
    console.log(res.data.announces);
    SetAnounces(res.data.announces);
    SetAnnouncesall(res.data.announces);
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // le code de la page de recherche et affichage des annonces
  return (
    <div>
      {/* affichage de nav bar */}
      <SideBar isOpen={isOpen} toggle={toggle} />
      <NavBar toggle={toggle} />
      <div style={{ height: "80px" }}></div>
      <div className="div__search_main">
        {/* recherche et filter */}
        {announcesall && <SearchBar handleFilter={handleFilter} />}
        {search && (
          <button
            className="bt_annuler"
            onClick={() => {
              fetchData(1);
              setSearch(false);
            }}
          >
            annuler search
          </button>
        )}
      </div>
      {error && <div> {error}</div>}
      {aiispending && <div>Loading ...</div>}
      {/* affichage des annonces et Map */}
      {announcesall && <Map_Annonce announces={announces} />}
      <div className="div-next-pre">
        {announcesall && precedent && (
          <button
            className="next_pre_bt"
            onClick={async () => {
              fetchData(page - 1);
            }}
          >
            previos
          </button>
        )}
        {announcesall && suivant && (
          <button
            className="next_pre_bt"
            onClick={async () => {
              fetchData(page + 1);
            }}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default LyesPage;
