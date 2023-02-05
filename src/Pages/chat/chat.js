import React,{useState,useEffect} from 'react';
import '../../App.css';
import MainLayout from '../../Components/chat/MainLayout'


const Chat = () => {

    
    

  const [data,setData]=useState(null)

useEffect(() => {
  fetch("http://127.0.0.1:5000/")
    .then(response => response.json())
    .then(data => {
      setData(data);
      console.log(data);
    });
    
}, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <MainLayout />
    </div>
  )
  }
  export default Chat;
