import React, { useReducer, useState, useRef } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const chatMessages = useRef([]);
  // const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getResponse = async (message) => {
    const sendData = {
      message: message
    };
    const { data } = await axios.post('http://localhost:8000/chatter', sendData);

    const { response } = data;
    return messageDialog(response);
  };

  const messageDialog = (message) => {
    let id = 0;
    if (chatMessages.current[chatMessages.current.length - 1])
    {
      id = chatMessages.current[chatMessages.current.length - 1].id + 1;
    }
    chatMessages.current.push({
      id: id,
      message: message
    });
    setMessage('');
    forceUpdate();
  };

  const handleInput = (event) => {
    const userMessage = event.target.value;
    console.log(event.target.value);
    setMessage(userMessage);
  };

  const handleSendMessage = () => {
    if (message === '') return;
    messageDialog(message);
    getResponse(message);
  };

  return (
    <div className="App">
      <div className='chat-box'>
        <div className='header'>
          <h4>I am your AI Chatter</h4>
        </div>
        <div className='body'>
          <div className='messages'>
            {
              chatMessages.current.map(message => (
                <div key={`message_${message.id}`} className={`message-row ${message.id % 2 === 0 ? 'user' : 'bot'}`}>
                  <div className={`message ${message.id % 2 === 0 ? 'user' : 'bot'}`}>
                    <p>{message.message}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='footer'>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type='text' name={message} value={message} onChange={handleInput} />
            <button onClick={handleSendMessage}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
