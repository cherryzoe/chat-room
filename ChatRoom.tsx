import React, { useState } from 'react';

function ChatRoom() {
  const [messages, setMessages] = useState({});
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState('general');

  const handleJoin = () => {
    setJoined(true);
    setMessages((prevMessages) => ({ ...prevMessages, [currentRoom]: [] }));
  };

  const handleLeave = () => {
    setJoined(false);
    setMessages({});
    setUsername('');
    setCurrentRoom('general');
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleRoomChange = (event) => {
    setCurrentRoom(event.target.value);
    // setMessages([]);
  };

  const handleSendMessage = (event) => {
    event.preventDefault(); //prevent page refresh
    setMessages((prevMessages) => ({
      ...prevMessages,
      [currentRoom]: [
        ...(prevMessages[currentRoom] || []),
        { username, message: currentMessage },
      ],
    }));
    // setMessages([...messages, { username, message: currentMessage }]);
    setCurrentMessage('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const chatRooms = [
    { name: 'General', id: 'general' },
    { name: 'Tech', id: 'tech' },
    { name: 'News', id: 'news' },
  ];

  return (
    <div className="chat-room-container">
      {!joined ? (
        <div className="join-container">
          <h1>Welcome to the Chat Room</h1>
          <label htmlFor="username">Enter your username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <button onClick={handleJoin}>Join Chat Room</button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="chat-rooms-container">
            <h2>Chat Rooms</h2>
            <ul>
              {chatRooms.map((room) => (
                <li
                  key={room.id}
                  className={room.id === currentRoom ? 'active' : ''}
                  onClick={() => setCurrentRoom(room.id)}
                >
                  {room.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-window-container">
            <h2>{currentRoom} Room</h2>
            <div className="chat-window">
              {messages[currentRoom]?.map((message, index) => (
                <div key={index}>
                  <strong>{message.username}: </strong>
                  {message.message}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage}>
              <label htmlFor="message">Enter a message:</label>
              <input
                // type="text"
                // id="message"
                value={currentMessage}
                onChange={handleMessageChange}
              />
              <button type="submit">Send</button>
            </form>
            <button className="leave-button" onClick={handleLeave}>
              Leave Chat Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
