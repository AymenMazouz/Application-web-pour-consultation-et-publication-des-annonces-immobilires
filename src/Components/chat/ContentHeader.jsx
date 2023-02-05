
import { Link} from "react-router-dom"
export default function ContentHeader()
{
    return(
      <div className="max-w-fit h-6xl mx-auto">
        <div className= "flex justify-between">

          <Link to="/" className=" flex items-center space-x-20 space-y-2 mr-80">   
            <span className="text-light-700 text-2xl font-extrabold">
            Sakeni
          </span>
          </Link>

          <div className=" flex items-center space-x-10 space-y-2 mr-60">
      <div>
        <Link to="/Signin/SigninUser/Main/recherche" className="flex items-center py-3 px-3 text-light-700 hover:text-blue-400">
            Recherche</Link>
        </div>
      <div>        
        <Link to="/Signin/SigninUser/Main/annonce" className="flex items-center py-3 px-3 text-light-700 hover:text-blue-400">
        Mes annonces
        </Link>
        </div>
      <div>        
        <Link to="/Signin/SigninUser/Main/chat_View" className="flex items-center py- px-3 text-light-700 hover:text-blue-400">
        Messagerie
        </Link>
        </div>
      <div>        
        <Link to="/Signin/SigninUser/Main/deposerai" className="flex items-center py-5 px-3 text-light-700 hover:text-blue-400">
        Deposer annonce
        </Link>
        </div>
        {/* <div>
        <Link to="/" className="flex items-center py-3 px-3 text-light-700 hover:text-blue-400">
        Preferences
        </Link>
        </div> */}
        </div>
    </div>
    </div>
    )
}