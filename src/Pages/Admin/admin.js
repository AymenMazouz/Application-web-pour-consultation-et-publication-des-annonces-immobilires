import axios from "axios";
import {  useState } from "react";
import Scrap from "../../Components/scrap/scrap";
import SideBar from '../../Components/SideBar2'
import NavBar from '../../Components/NavBar2'
import Affiche_user from "../../Components/Affiche_List_User/Affiche_user";


const Admin = () => {
    const [isOpen, setIsOpen]=useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return ( 
    <div>
        
      <SideBar isOpen={isOpen} toggle={toggle}/>
      <NavBar toggle={toggle}/>
      <div style={{height:"80px"}} ></div>


        <Scrap />
        <Affiche_user />
    </div> 
    );
}
 
export default Admin;