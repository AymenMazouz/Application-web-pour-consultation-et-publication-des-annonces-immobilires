import {
    faEllipsisH,
    faReply,
    faTrashCan,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
  export default function EmailDetails(selectedEmail) {
  
    
    return (
      
      <div>

      
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
      </div>
      );
    }