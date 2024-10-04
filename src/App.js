import React, { useState } from 'react';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

function App() {
  const [messages, setMessages] = useState([
    {
      position: 'left',
      type: 'text',
      text: 'Hello! How can I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      position: 'right',
      type: 'text',
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Call the backend API
    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = {
        position: 'left',
        type: 'text',
        text: data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <MessageBox
            key={idx}
            position={msg.position}
            type={msg.type}
            text={msg.text}
          />
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: 10 }}>
        <input
          style={{ flex: 1, padding: 10 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;

