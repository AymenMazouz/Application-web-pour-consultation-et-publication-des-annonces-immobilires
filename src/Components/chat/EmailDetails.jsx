
import {
  faEllipsisH,
  faReply,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useParams } from 'react-router-dom';
  import jwt_decode from "jwt-decode";

export default function EmailDetails(selectedEmail) {



  
  // console.log(selectedEmail.annonceinfo.title)
  const[content,setContent]=useState("")
  const[subject,setSubject]=useState("")
  console.log( selectedEmail)
  const {id} =useParams();
    const handleSubmit = async () => {
      let infouser=jwt_decode(localStorage.getItem("token"));
      let emailsender=infouser.email;
      const sendmessage = { emailsender,content,subject};
  
      console.log(sendmessage);
  
      axios
        .post("http://127.0.0.1:5000/message/"+id, sendmessage)
        .then(() => {
          window.location.reload(false)
          // console.log(selectedEmail)
        })
        .catch(() => alert("Il y a un problème"));
  
    };
  return (
    <div className="flex flex-col bg-blue-300 w-2/3 mt-6 ml-14">
      {selectedEmail  && selectedEmail.selectedEmail && selectedEmail.annonceinfo  &&<div className="mt-32 w-full h-full outline-none border border-dark-800 border-2 hover:border-blue-400 focus:border-blue-400 rounded p-4 bg-light-200">
      <div className="flex items-center px-10">
        <div className="w-10 h-10 rounded-xl bg-red-200 mr-4 border border-xl border-dark-800"></div>
        <div >
        <span className="text-sm text-dark-800 font-bold">
          from : {selectedEmail.emailsender}
        </span><br />
        
        <span className="text-sm text-dark-800 font-bold">
          to : {selectedEmail.emailres}
        </span>
        </div>
        {/* <div className="flex relative ml-6">
          <div className="w-6 h-6 rounded-full bg-red-200 border border-2 border-dark-600"></div>
          <div className="w-6 h-6 rounded-full bg-blue-200 border border-2 border-dark-600 absolute ml-3"></div>
          <div className="w-6 h-6 rounded-full bg-green-200 border border-2 border-dark-600 absolute ml-6"></div>
          <div className="w-6 h-6 rounded-full bg-yellow-200 border border-2 border-dark-600 absolute ml-9"></div>
        </div> */}
        <div className="flex ml-20
mt-20">
          <div className="flex mr-5">
          <span className="text-xs text-center text-dark-800 font-bold"></span>
          </div>
          {/* <FontAwesomeIcon icon={faReply} className="mx-2 text-dark-700" /> */}
          {/* <FontAwesomeIcon icon={faTrashCan} className="mx-2 text-dark-700" />
          <FontAwesomeIcon icon={faEllipsisH} className="mx-2 text-dark-700" /> */}
        </div>
      </div>
      <div className="flex flex-col">
      
      <span className="px-10 text-lg text-dark-700 font-light mb-6">subject:{selectedEmail.selectedEmail.subject}</span>
      </div>
      <div className="px-10 text-xs text-dark-800 whitespace-pre"><p className="font font-bold text-lg text-dark-700 font-light ">content :</p><br /> {selectedEmail.selectedEmail.content}</div>


      <div className="ml-10">
            <h1 className="ml-20 text-XL text-dark-800 font-bold ">Info Annonce</h1>
            <div className="flex flex-row">
            <p className=" text-dark-800 font-bold text-xl">title : </p>
            <p className=" text-xs  text-xl">{selectedEmail.annonceinfo.title}</p>
            </div>
            <div className="flex flex-row">
              <p className=" text-dark-800 font-bold text-xl">prix :</p>
              <p className=" text-xs  text-xl">{selectedEmail.annonceinfo.prix}</p>
            </div>
            <div className="flex flex-row">
              <p className=" text-dark-800 font-bold text-xl">adresse :</p>
              <p className=" text-xs  text-xl">{selectedEmail.annonceinfo.adresse}</p>
            </div>
            {/* {selectedEmail.annonceinfo.images.lenght!=0 &&<div>
              <img src={selectedEmail.annonceinfo.images[0]}
                alt="AI IMAGE"
                width="100%"
                style={{ maxHeight: "300px", minHeight: "300px" }} />
            </div>} */}

            


      </div>
    </div>}
    {!selectedEmail &&<div>
      <div className="flex items-center px-10">
        <div className="w-10 h-10 rounded-xl bg-red-200 mr-4 border border-xl border-dark-800"></div>
        <span className="text-sm text-dark-800 font-bold">
          
        </span>
        <div className="flex relative ml-6">
          <div className="w-6 h-6 rounded-full bg-red-200 border border-2 border-dark-600"></div>
          <div className="w-6 h-6 rounded-full bg-blue-200 border border-2 border-dark-600 absolute ml-3"></div>
          <div className="w-6 h-6 rounded-full bg-green-200 border border-2 border-dark-600 absolute ml-6"></div>
          <div className="w-6 h-6 rounded-full bg-yellow-200 border border-2 border-dark-600 absolute ml-9"></div>
        </div>
        <div className="flex ml-20
mt-20">
          <div className="flex mr-5">
          <span className="text-xs text-center text-dark-800 font-bold"></span>
          </div>
          <FontAwesomeIcon icon={faReply} className="mx-2 text-dark-700" />
          <FontAwesomeIcon icon={faTrashCan} className="mx-2 text-dark-700" />
          <FontAwesomeIcon icon={faEllipsisH} className="mx-2 text-dark-700" />
        </div>
      </div>
      <div className="flex flex-col">
      
      <span className="px-10 text-lg text-dark-700 font-light mb-6"></span>
      </div>
      <div className="px-10 text-xs text-dark-800 whitespace-pre"></div>
      <div style={{height:"100px" }}></div>
    </div>}
      
   
    <div className="flex flex-col ">
    <div className=" ml-8 flex-none  p-4 mr-80 h-60 w-full ">
      <div className=" w-full h-full outline-none border border-dark-800 border-2 hover:border-blue-400 focus:border-blue-400 rounded p-4 bg-light-200">
      <div className="font font-small text-xs">E-mail</div>
      {/* <form action="/" method="post"> */}
      
      <input style={{borderBottom:"1px solid black"}} className="w-full h-1/2 outline-none placeholder-shown:border-gray-50 bg-light-200 text-xs text-justify"placeholder="Write your Subject..."onChange={(e) => setSubject(e.target.value)}></input>
      <input className="w-full h-1/2 outline-none placeholder-shown:border-gray-50 bg-light-200 text-xs text-justify"placeholder="Write your email..."onChange={(e) => setContent(e.target.value)}></input>
      
      {/* </form> */}
      </div>
      <div className="ml-96 w-20 h-10 flex mt-3 bg-blue-400 items-center rounded text-center">

        <button className="ml-4bg-blue-400"type="submit">
        <h2 className=" ml-5 text-3xs font font-small text-center"type="submit"onClick={handleSubmit}>Send</h2>
        </button>
        </div>

      </div>
      </div>

      </div>
    );
  }
