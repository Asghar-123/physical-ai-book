// import React, { useState } from 'react';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import styles from './ChatbotWidget.module.css';

// interface ChatMessage {
//   text: string;
//   sender: 'user' | 'bot';
// }

// const ChatbotWidget: React.FC = () => {
//   const { siteConfig } = useDocusaurusContext();
//   const backendApiUrl = (siteConfig.customFields.backendApiUrl as string).replace(/\/$/, '');
//   console.log('Backend API URL:', backendApiUrl); // For debugging

//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState('');

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };
// const handleSendMessage = async () => {
//   if (input.trim() === '') return;

//   const userMessage: ChatMessage = { text: input, sender: 'user' };
//   setMessages((prevMessages) => [...prevMessages, userMessage]);
//   setInput('');

//   if (!backendApiUrl) {
//     const errorMessage: ChatMessage = {
//       text: "Sorry, the backend API URL is not configured.",
//       sender: 'bot',
//     };
//     setMessages((prevMessages) => [...prevMessages, errorMessage]);
//     return;
//   }

//   try {
//     // Make sure we hit exactly '/chat'
//     const url = backendApiUrl.endsWith('/chat') ? backendApiUrl : `${backendApiUrl}/chat`;

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ question: input }),  // match FastAPI
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     const botMessage: ChatMessage = { text: data.answer, sender: 'bot' }; // match backend response
//     setMessages((prevMessages) => [...prevMessages, botMessage]);

//   } catch (error) {
//     console.error("Error sending message to chatbot:", error);
//     const errorMessage: ChatMessage = { text: "Sorry, I couldn't connect to the chatbot.", sender: 'bot' };
//     setMessages((prevMessages) => [...prevMessages, errorMessage]);
//   }
// };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(event.target.value);
//   };

//   const handleSendMessage = async () => {
//     if (input.trim() === '') return;

//     const userMessage: ChatMessage = { text: input, sender: 'user' };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput('');

//     if (!backendApiUrl) {
//       const errorMessage: ChatMessage = {
//         text: "Sorry, the backend API URL is not configured.",
//         sender: 'bot',
//       };
//       setMessages((prevMessages) => [...prevMessages, errorMessage]);
//       return;
//     }

//     try {
//       const response = await fetch(`${backendApiUrl}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: input, user_id: 'docusaurus_user' }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const botMessage: ChatMessage = { text: data.response, sender: 'bot' };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);

//     } catch (error) {
//       console.error("Error sending message to chatbot:", error);
//       const errorMessage: ChatMessage = { text: "Sorry, I couldn't connect to the chatbot.", sender: 'bot' };
//       setMessages((prevMessages) => [...prevMessages, errorMessage]);
//     }
//   };

//   const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(event.target.value);
//   };
//   return (
//     <div className={styles.chatbotContainer}>
//       <button className={styles.chatbotToggleButton} onClick={toggleChatbot}>
//         {isOpen ? 'Close Chat' : 'Open Chat'}
//       </button>

//       {isOpen && (
//         <div className={styles.chatbotWindow}>
//           <div className={styles.chatbotHeader}>
//             <h3>AI Assistant</h3>
//             <button className={styles.closeButton} onClick={toggleChatbot}>X</button>
//           </div>
//           <div className={styles.chatbotMessages}>
//             {messages.map((message, index) => (
//               <div key={index} className={`${styles.chatMessage} ${styles[message.sender]}`}>
//                 {message.text}
//               </div>
//             ))}
//           </div>
//           <div className={styles.chatbotInput}>
//             <input
//               type="text"
//               value={input}
//               onChange={handleInputChange}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me about the book..."
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotWidget;
import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ChatbotWidget.module.css';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotWidget: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const backendApiUrl = (siteConfig.customFields.backendApiUrl as string).replace(/\/$/, '');
  console.log('Backend API URL:', backendApiUrl); // For debugging

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    if (!backendApiUrl) {
      const errorMessage: ChatMessage = {
        text: "Sorry, the backend API URL is not configured.",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    try {
      // Ensure the URL ends with /chat
      const url = backendApiUrl.endsWith('/chat') ? backendApiUrl : `${backendApiUrl}/chat`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }), // Match FastAPI schema
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = { text: data.answer, sender: 'bot' }; // Match FastAPI response
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      const errorMessage: ChatMessage = { text: "Sorry, I couldn't connect to the chatbot.", sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <button className={styles.chatbotToggleButton} onClick={toggleChatbot}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isOpen && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <h3>AI Assistant</h3>
            <button className={styles.closeButton} onClick={toggleChatbot}>X</button>
          </div>
          <div className={styles.chatbotMessages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.chatMessage} ${styles[message.sender]}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className={styles.chatbotInput}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the book..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
