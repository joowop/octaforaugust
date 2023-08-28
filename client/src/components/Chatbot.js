/* eslint-disable react/prop-types */
// src/App.js (React 앱 파일)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chatbot(props) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(props.option); // Flask 서버 주소로 변경
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (input.trim() !== '') {
      try {
        await axios.post('/send_message', { message: input }); // Flask 서버 주소로 변경
        setInput('');
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
