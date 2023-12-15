
import './App.css';
import { io } from 'socket.io-client';
import {useEffect} from 'react'
import Chat from './Chat';


function App() {


  return (
    <div className="App"> 
      <Chat />
    </div>
  );
}

export default App;
