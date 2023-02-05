import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EmailCard.css";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EmailCard(props) {
  const {
    image,
    from,
    date,
    subject,
    body,
    hasAttachment,
    isSelected,
  } = props;
  // console.log(props);
  return (
    <div
      className={`${
        isSelected
          ? "bg-blue-400 cursor-pointer rounded-3xl drop-shadow-2xl border border-dark-800"
          : " "
      } flex flex-row py-10 px-6 hover:bg-blue-400 cursor-pointer rounded-3xl drop-shadow-2xl border-b`}
    >
      
      <div className={` h-6 w-6 items-center mt-10`}>
      <FontAwesomeIcon 
          className={` h-6 `}
          icon={faEnvelope}
        />
      </div>
      <div className="flex flex-col w-full ml-3">
        <div className="flex items-center mt-2">
          <span className="text-xs text-dark-700 font-bold mr-auto">
            {from}
          </span>
          {hasAttachment ? (
            <FontAwesomeIcon
              icon={faPaperclip}
              className="text-dark-600 mr-2"
            />
          ) : null}
          <span className="text-light-700 bg-dark-400 text-xs font-medium px-3 py-1 rounded-xl">
            {date}
          </span>
        </div>
        <span className=" text-xm text-dark-800 font font-bold mt-2">
          {subject}
        </span>
        <span className="clamp text-xs font-normal text-dark-800 mt-4 w-full">
          {props.content}
        </span>
      </div>
    </div>
  );
}