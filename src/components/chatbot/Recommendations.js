import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
function Recommendations() {
  const [inputText, setInputText] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleRecommendation = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/recommend/${inputText}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };
  const toggleChatbot = () => {
    setShowChatbot(prevState => !prevState);
  };

  return (
    <div>
    <button onClick={toggleChatbot}>
        {/* {showChatbot ? 'Hide Chatbot' : 'Show Chatbot'} */}
      </button>
      {showChatbot && <Recommendations />} {/* Render chatbot UI if showChatbot is true */
     
    <div className="chat-container">
      <div className="chat-header">Nexus Messenger</div>
      <a href='/Messger'>Messenger</a>
      <div className="chat-messages">
        <div className="message-container">
          <div className="message-sender">Chatbot Support</div>

          
          <div className="message-text">Hi there! How can I help you?</div>
        </div>
        <div className="message-container">
          {/* <div className="message-sender">Chatbot</div>
          <div className="message-text">Hi there! How can I help you?</div> */}
          <ul className="recommendations-list">
        {recommendations.map((product, index) => (
          <li className="recommendations-item" key={index}>{product}</li>
        ))}
      </ul>
        </div>
      </div>
      <div className="chat-input">
      <div>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      </div>
      <button className="" onClick={handleRecommendation}>
      <img src="https://cdn-icons-png.freepik.com/512/1477/1477051.png" alt="Chatbot Icon" style={{ width: '40px', height: '40px', marginLeft: '120px'}} />
      </button>
      {/* <ul className="recommendations-list">
        {recommendations.map((product, index) => (
          <li className="recommendations-item" key={index}>{product}</li>
        ))}
      </ul> */}
    </div> 
    </div>
    
}
      </div>  
  );
}

export default Recommendations;