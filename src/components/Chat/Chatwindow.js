import  { useState } from "react";
import * as React from 'react';
import {Howl, Howler} from 'howler';

import socket from "../../socket";
//import { format, render, cancel, register } from 'timeago.js';
import userpic from './user.jpg'
import TextField from "@material-ui/core/TextField"
import oudio from "../assets/2421_mobile-rington..mp3"
//-------------------------------

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

//----------------------------------------
const Chatwindow = (props) => {
  let selectedUser = {
    ...props.selectedUser,
    messages: [],
  };
//---------------------
//chat sound
const soundPlay=(src)=>{
  const sound = new Howl({
    src
  });
  
  // Play the sound.
  sound.play();
  
  // Change global volume.
  Howler.volume(0.5);
}

  const [messages, setMessages] = useState([]);
 
  let messageContent = "";
  let ref; 
  const getContent = (e) => {
    messageContent = e.target.value;
    ref = e;
  };

  const onMessage = (e, content) => {
    e.preventDefault();
   
    ref.target.value = "";
    if (props.selectedUser) {
      socket.emit("private message", {
        content,
        to: props.selectedUser.userID,
      });
      setMessages((messages) => [
        ...messages,
        { toUser: props.selectedUser.username, content, fromSelf: true },
      ]);
    }
   
  };

  const showMessages = messages.map((message, index) => {
    if (
      message.fromSelf === true &&
      message.toUser === props.selectedUser.username
    )
      return (
        <>
        
        <div 
          key={index}
          
          className="messageOwn"
        >
          
           
       
          
           <div className="messageOwn1" s
           
           >
          
          {message.content}
          <img
          className="messageImg"
          src= {userpic}
          alt=""
        />
        </div>
        
        </div>
        {/* <div className="messageBottom1">{format(message.createdAt)}</div> */}
          <br/>
        </>
      );
    if (
      message.fromSelf === false &&
      message.fromUser === props.selectedUser.username
    )
      return (
       <>
        <div
          key={index}
          
          className="message"
        >
          <div className="messageTop">
           <img
          className="messageImg"
          src= {userpic}
          alt=""
        />
          {message.content}
          </div>
        
        </div>
        {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
        <br/>
        </>
      );
  });

  socket.on("private message", ({ content, from }) => {
   
    let newMessages = {};
    for (let i = 0; i < props.connectedUsers.length; i++) {
      const user = props.connectedUsers[i];
      if (user.userID === from) {
       
        newMessages = {
          fromUser: props.connectedUsers[i].username,
          content,
          fromSelf: false,
        };
        const messagesList = [...messages, newMessages];
        setMessages(messagesList);
      }
    }
  });

 
  return (
    <span className= "chatBoxWrapper">
      <div className="chatBoxTop"
      >{showMessages}</div>
      <div className="chatBoxBottom"> 
         <form className="chatBoxBottom"
         onSubmit={(e) => {
          onMessage(e, messageContent);
          soundPlay(oudio);
         
         }}>
         <TextField
         style={{
          marginRight:"3px",
          marginTop:"2px"
         }}
              name="message"
              onChange={(e) => getContent(e)}
              
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
              
            />
       <Stack direction="row" spacing={2}>
      
      <Button type="submit" 
      className="chatSubmitButton"variant="contained" endIcon={<SendIcon />}>
        
      </Button>
    </Stack>
      </form>
      </div>
    
    </span>
  );
};

export default Chatwindow;
