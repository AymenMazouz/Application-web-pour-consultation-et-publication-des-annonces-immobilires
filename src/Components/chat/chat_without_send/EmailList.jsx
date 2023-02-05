
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import EmailCard from "../EmailCard";

import EmailDetails from "./EmailDetails";
import "./EmailList.css";
import axios from "axios";

import jwt_decode from "jwt-decode"
// eslint-disable-next-line react-hooks/rules-of-hooks
import React, { createContext} from "react";
export default function EmailList() {
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [emailsender,setEmailsender]=useState("")
  const [emailres,setEmailres]=useState("")
  const [annonceinfo,setAnnonceinfo]=useState(null)
  const[id_user_first,setId_user_first]=useState()
  const  handleEmailSelection = async (emailId) => {
  setSelectedEmailId(emailId);
  console.log(selectedEmail)
  axios
        .post("http://127.0.0.1:5000/getuserbyid/"+selectedEmail.Userid ).then(function(response) {
    
          setEmailsender(response.data.email)
        })
        .catch(() => alert("Il y a un problème"));
        axios.post("http://127.0.0.1:5000/getuserbyid/"+selectedEmail.deposid,{} ).then(function(response) {

          setEmailres(response.data.email)
        })
        .catch(() => alert("Il y a un problème"));
        const res = await axios.get("http://127.0.0.1:5000/infoAI/" + selectedEmail.annonceid);
        setAnnonceinfo(res.data.announces[0])
        
        


  };
  useEffect(() => {
    const handleSubmit = async () => {

      let infouser = jwt_decode(localStorage.getItem("token"));
      let EmailUser = infouser.email;
      let tosend = { EmailUser };
      
      await axios.post("http://127.0.0.1:5000//getuserby_emeail",tosend ).then(function(response) {
      setId_user_first(response.data.id)
      console.log(response.data.id)
      console.log(id_user_first)
      fetch('http://127.0.0.1:5000/emails/'+response.data.id)
      .then(response => response.json())
      .then(data => {setEmails(data.emails);console.log("lyessssssssssssssssss");}
      ).catch('erreurrsss')
    })
     
     
      
       
    }
    handleSubmit()
  }, []);
  const [selectedEmail, setSelectedEmail] = useState(null);


  const handleEmailSelection1 = (selectedEmail) => {
    setSelectedEmail(selectedEmail);

  };
 
  
  return (
    <div className="flex flex-row ml-20">
    <div className="ml-20 flex flex-col bg-blue-300 w-6/12 mr-1 px-0 h-full mt-1 mb-16">
      <div className="flex items-center py-6 px-10">
        <div className="flex flex-row h-6 w-6 itens-center">
        <FontAwesomeIcon 
          icon={faEnvelope}
          className="px-3 py-3 rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 text-dark-800 drop-shadow-3xl ml-auto w-7 h-7"
        />
        <span className="font-light text-3xl text-dark-800 font font-bold mt-2">MailBox</span>
        </div>
        <div className="flex items-center py-6 px-80">
         </div>
      </div>
      <div className="px-10 pb-5 mb-4">
      </div>
  <div className="flex flex-col rounded-3xl px-10 pb-10 overflow-scroll bg-blue-100 ml-5 border border-bottom border-dark-800 mb-8 ">
  <p>Double click pour afficher les details des Messages </p>
  {emails.length? emails.map((email) => (
  
  <div
  key={email.id}
  onClick={()=>{
    handleEmailSelection1(emails.find(email => email.id === selectedEmailId))
    handleEmailSelection(email.id);
    
    // console.log(selectedEmail);

  }}>
    
    <EmailCard 
    key={email.id} {...email} 
   
    isSelected={email.id === selectedEmailId}
  />
  </div>
  
))
:<p>aucun message trouver</p>}

</div>
</div>
     <div >
     <EmailDetails selectedEmail={selectedEmail}  emailres={emailres} emailsender={emailsender} annonceinfo={annonceinfo} />
   </div>
   </div>
  );
}  

