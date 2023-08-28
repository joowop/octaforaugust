/* eslint-disable react/prop-types */
// src/App.js (React 앱 파일)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, TextInput, Button } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai'
function Chatbot(props) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [classes, setClasses] = useState('') 
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    scrollToBottom();
    first_infor()
  }, []);

  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const first_infor = () =>{
    if(props.option == '/librarian/qa_chatbot'){
      setMessages([...messages, {text: "도서관에 대해 물어보실 것이 있나요?", isUser: false}])
      setClasses('absolute -bottom-[52rem] right-4')
    }else{
      setMessages([...messages, {text: "도서 추천을 받고 싶으시다면 키워드를 입력해주세요", isUser: false}])
    }
  }

  const sendMessage = async () => {
    if (input.trim() !== '') {
      try {
        setUploading(true);
        const formData = new FormData
        formData.append("question", input)
        await axios.post(props.option, formData).then(response => {
          setMessages([...messages, {text: input, isUser: true}, {text: response.data["result"], isUser: false}]);
        });
        setInput('');
        setUploading(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setUploading(false);
      }
    }
  };

  return (
    <>
      <div className={classes}>
      <Card className="max-w-sm">
        <div id="chat-container" className="overflow-auto max-h-96 ">
        {messages.map((message, index) => {
          if(message.isUser){
            return <div key={index} className='bg-yellow-100 m-1 mb-3 rounded' >
            {message.text} 
          </div>   
          }else{
            return <div key={index} className='bg-blue-100 m-1 mb-3 rounded'>
            {message.text}
          </div>
          }
          
          })}
        </div>
      <div className='flex'>
        <TextInput
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        
          <Button isProcessing={uploading} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />} onClick={sendMessage}>Send</Button>
          </div>
    </Card>
        
      </div>
    </>
  );
}

export default Chatbot;
