import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client'
import './index.css';



const socket = socketIO.connect('http://localhost:4000');
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home socket={socket} />}></Route>
      <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
    </Routes>
  </BrowserRouter>
);