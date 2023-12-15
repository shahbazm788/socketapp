import React ,{useEffect,useState} from 'react'
import { io } from 'socket.io-client';


const Chat = () => {

    const [message,setMessage] = useState('');
    const [room,setRoom] = useState('');
    const [name,setName] = useState('');
    const [joiendRoom,setJoinedRoom] = useState('');
    const [joinedUser,setJoinedUser] = useState('');
    const [incomingMessage,setIncomingMessage] = useState([]);
    const [sendr_class,setSenderClass] = useState("")
    const socket = io("http://localhost:5000",{
        // autoConnect: false
      });
const sendMessage =  () => {

   socket.emit("send_message", {
      message:message,
      joinedUser,
      joiendRoom
    });
    setMessage("")
    
  }


  const join = () => {
    let someData = {
        name,
        room
    }
        socket.emit("join_room", someData);
  }
  
  useEffect(() => {
    socket.on("recive_message",(data) => {
      setIncomingMessage((incomingMessage) => {
        return [...incomingMessage,data]
      });
    
      console.log(data)
      
     
    });
    socket.on("send_room_info",data => {
      setJoinedRoom(data.room);
      setJoinedUser(data.name)
    })
  }, [socket,incomingMessage]);
  
  return (
    <div className='chat_outer'>
        {/* <input type='text' placeholder='room....' onChange={(e) => {setRoom(e.target.value)}} />
        <input  type="text" placeholder='your message....' onChange={(e) => {setMessage(e.target.value)}} /> 
      <button onClick={sendMessage}>Send</button>  */}
{!joiendRoom ? 
<>
  <div className='room_div'>
  <input className='input' type='text' placeholder='room....' onChange={(e) => {setRoom(e.target.value)}} />
        <input className='input' type="text" placeholder='your name....' onChange={(e) => {setName(e.target.value)}}/> 
      <button className='btn' onClick={join}>Send</button>
  </div>
</>
 :
     <>
     <div className='chat_box'>
      <div className='chat_head'>
      {joinedUser?joinedUser:"No Name"}
      </div>
      <div className='chat_messages'>
        {incomingMessage.map((item,i) => {
        //   if(item.joinedUser == joinedUser){
        //     return <>
        //     <div className='incoming_message_data_div'>
        //       <div className='i_m_div'>{item.message}</div>
        //       <div className='message_from_me'>{item.joinedUser}</div>
        //     </div>
        // </>
        //   }
        //   else{
        //     <div className='incoming_message_data_div'>
        //     <div className='i_m_div'>{item.message}</div>
        //     <div className='message_from_other'>{item.joinedUser}</div>
        //   </div>
        //   }
        return <>
        <div className={`incoming_message_data_div ${item.joinedUser == name ? "message_from_other" : "message_from_me" }`}>
          <div className='i_m_div'><p>{item.message}</p></div>
          <div className={'message_from'}><small>From: {item.joinedUser}</small></div>
        </div>
    </>
        })}
      </div>
      <div className='chat_footer'>
      <input className={"message_input"} type="text" placeholder='type your message....'  onChange={(e) => {setMessage(e.target.value)}}  value={message} /> 
    <button className="send_message_btn" onClick={sendMessage}>Send</button>
      </div>
     </div>
     </>}
    </div>
  )
}

export default Chat
