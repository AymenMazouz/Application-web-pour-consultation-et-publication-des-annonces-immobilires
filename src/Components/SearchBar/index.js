// lyes
import React, { useState,useRef,useEffect } from 'react'
import './style.css'

const SearchBar = ({handleFilter}) => {
    const [listecommune, setListecommune] = useState(null);
  const [listewilaya, setListewilaya] = useState(null);

    useEffect(() => {
        fetch("http://localhost:9000/commune/" )
          .then((res) => {
            if (!res.ok) {
              throw Error("Could noy fetch the data for that resource ");
            }
            return res.json();
          })
          .then((data) => {
            setListecommune(data);
            
          })
          .catch((err) => {
            // setError(err.message);
            console.log("erreur")
          });
          fetch("http://localhost:9000/wilaya/" )
          .then((res) => {
            if (!res.ok) {
              throw Error("Could noy fetch the data for that resource ");
            }
            return res.json();
          })
          .then((data) => {
            setListewilaya(data);
            console.log(listewilaya);
            
          })
          .catch((err) => {
            // setError(err.message);
            console.log("erreur")
          });
      }, []);
    

    const ref1 = useRef();
    const ref = useRef();
    
    const [search,setSearch]=useState('');
    const [type,setType]=useState('');
    const [wilaya,setWilaya]=useState('');
    const [commune,setCommune]=useState('');
    const [datedebut,setDatedebut]=useState('');
    const [datefin,setDatefin]=useState('');
    const handleSubmit =(e)=>{
        e.preventDefault();
        const annonceSearch ={search,type,wilaya,commune,datedebut,datefin}
        console.log(annonceSearch);
        handleFilter(annonceSearch);
    }

    return ( 
        
        <form className="Containersearch_filter" onSubmit={handleSubmit}>
            <div className="ContainerSearch">
                <input className='seachinput'
                type="text"
                placeholder="Search AI"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                 />
            </div>
            <div className="ContainerFilter">
                <select className='type selectcase' 
                value={type}
                onChange={(e)=> setType(e.target.value)}
                >
                    <option value=""  selected>Select the Type</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Maison">Maison</option>
                    <option value="Appartement">Appartement</option>
                    <option value="Commercial">Commercial</option>
                </select>
                {/* <select className='wilaya selectcase'
                value={wilaya}
                onChange={(e)=> setWilaya(e.target.value)}
                >
                    <option value=""  selected>Choose your wilaya</option>
                    <option value="wilaya1">wilaya1</option>
                    <option value="wilaya2">wilaya2</option>
                </select>
                <select className='commune selectcase'
                value={commune}
                onChange={(e)=> setCommune(e.target.value)}
                >
                    <option value=""  selected>Choose your commune</option>
                    <option value="commune1">commune1</option>
                    <option value="commune2">commune2</option>
                </select> */}
                
                {/*  */}


                {listewilaya &&
                     <select className='commune selectcase' onChange={(e)=> setWilaya(e.target.value)}>
                    <option value=""  selected>Choose your wilaya</option>
                    {
                        listewilaya.map((lawilaya) =>( 
                                <option value={lawilaya.nom}>{lawilaya.nom}</option>
                        ))
                        
                    }
                    
                </select>}
          {listecommune &&listewilaya&&
          <select className='commune selectcase' onChange={(e)=> setCommune(e.target.value)}>
                    <option value=""  selected>Choose your commune</option>
                    {
                      // announcesall.filter(announce =>announce.title === annonceSearch.search )
                        listecommune.filter(com =>com.wilaya_name === wilaya ).map((lacommune) =>( 
                                <option value={lacommune.commune_name}>{lacommune.commune_name}</option>
                        ))
                        
                    }
                    
                </select>}
                {/*  */}
                <input
                    className='dateinput'
                    type="text"
                    placeholder="date du debut"
                    ref={ref1}
                    value={datedebut}
                    onChange={(e) => setDatedebut(e.target.value)}
                    onFocus={() => {(ref1.current.type = "date");}}
                    onBlur={() => (ref1.current.type = "text")}
                />
                <input
                    className='dateinput'
                    type="text"
                    placeholder="date du fin"
                    ref={ref}
                    value={datefin}
                    onChange={(e) => setDatefin(e.target.value)}
                    onFocus={() => {(ref.current.type = "date");}}
                    onBlur={() => (ref.current.type = "text")}
                />
                <button className='searchbutton'>Search</button>

            </div>
            
        </form>
        

     );
}
 
export default SearchBar;