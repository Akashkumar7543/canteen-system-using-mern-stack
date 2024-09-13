import React, { useState } from "react";
import Recommendations from "./Recommendations"; // Assuming you have a component for the chatbot UI
import "./index.css";
import Messenger from "./Messenger";
import ChatSuppot from "./ChatSuppot";
function Chatbot() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const toggleChatbot = () => {
    setShowChatbot((prevState) => !prevState);
  };
  const setComponent = (component) => {
    setActiveComponent(component);
  };
  return (
    <div className="chatbox-container">
      <div className="chatbox-footer">
        <button className="" onClick={toggleChatbot}>
          {/* {showChatbot ? 'Hide Chatbot' : 'Show Chatbot'} */}
          <img
            src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3199307/message-circle-icon-md.png"
            alt="Chatbot Icon"
            style={{ width: "70px", height: "70px" }}
          />
        </button>
      </div>
      {showChatbot && (
        <div className="chattt-container" style={{ animation: "fadeIn 0.9s" }}>
          <div className="chat-header">Nexus Messenger & Chat Suppot</div>

          <div className="chatbot-options">
            <button
              onClick={() => setComponent("ChatBot Support")}
              className="rounded-pill"
              style={{ animation: "fadeIn 0.9s" }}
            >
              Chat Support
            </button>
            <button
              onClick={() => setComponent("messenger")}
              className="rounded-pill"
              style={{ animation: "fadeIn 0.9s" }}
            >
              Messenger
            </button>
          </div>
          <div className="chatbot-content">
            {/* <div className="chat-header">Nexus Messenger</div> */}
            {activeComponent === "ChatBot Support" && <ChatSuppot />}
            {activeComponent === "messenger" && <Messenger />}
          </div>
      
        </div>
      )}{" "}
      {Recommendations}
    </div>
  );
}

export default Chatbot;
