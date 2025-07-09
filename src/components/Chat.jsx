let socket = null; // ✅ persistent socket

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([{ text: "Hello Bro" }]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const loggedInUserId = user?.data?._id;

  useEffect(() => {
    if (!loggedInUserId) return;

    socket = createSocketConnection();
    socket.emit("joinChat", { loggedInUserId, toUserId });

    return () => {
      socket.disconnect();
      socket = null;
    };
  }, [loggedInUserId, toUserId]);

  const sendMessage = () => {
    if (!socket) return;

    socket.emit("sendMessage", {
      firstName: user.data.firstName,
      loggedInUserId,
      toUserId,
      text: newMessage
    });


  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-blue-600 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold">Chat</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {messages.map((ele, ind) => (
          <h1 key={ind}>{ele.text}</h1>
        ))}
      </div>

      <div className="flex items-center border-t p-3 bg-white">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition-all duration-300 cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
