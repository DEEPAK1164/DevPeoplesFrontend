let socket = null; // ✅ persistent socket
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { isToday, isYesterday, format } from "date-fns";

const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const loggedInUserId = user?.data?._id;
  const firstName= user?.data?.firstName;

const fetchChatMessages=async()=>{
   const chat=await axios.get("http://localhost:7777/chat/"+toUserId,{withCredentials:true})
   const chatMessages = chat?.data?.messages.map((msg) => ({
  firstName: msg?.firstName,
  lastName: msg?.lastName,
  text: msg.text,
  createdAt: msg.createdAt,
  senderId: msg.senderId,
}));

   setMessages(chatMessages);
}
useEffect(()=>{
  fetchChatMessages();
},[])


  useEffect(() => {
    if (!loggedInUserId) return;

    socket = createSocketConnection();
    socket.emit("joinChat", {firstName, loggedInUserId, toUserId });

    //client is receiving the message send by server
  socket.on("messageReceived", ({ firstName, lastName, text, createdAt, senderId }) => {
  console.log(firstName + " " + text + " at " + createdAt);
  setMessages((messages) => [
    ...messages,
    { firstName, lastName, text, createdAt, senderId }
  ]);
});



    return () => {
      socket.disconnect();
      socket = null;
    };
  }, [loggedInUserId, toUserId]);

  const sendMessage = () => {
    if (!socket) return;

    socket.emit("sendMessage", {
      firstName: user.data.firstName,
      lastName:user.data.lastName,
      loggedInUserId,
      toUserId,
      text: newMessage
    });

  setNewMessage("");
  };

  const getChatTimestamp = (dateStr) => {
  const date = new Date(dateStr);

  if (isToday(date)) {
    return format(date, "hh:mm a"); // e.g., "12:45 PM"
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  const diffInDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) {
    return format(date, "EEE"); // e.g., "Mon", "Tue"
  }

  return format(date, "dd MMM"); // e.g., "12 Jul"
};


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-blue-600 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold">Chat</h1>
      </header>

    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
  {messages.map((msg, index) => {
    const isSender = msg.senderId === loggedInUserId;
    return (
      <div
        key={index}
        className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}
      >
      <div className="text-xs text-gray-500 mb-1">
        {msg.firstName} {msg.lastName} • {getChatTimestamp(msg.createdAt)}
     </div>

        <div
          className={`max-w-xs px-4 py-2 rounded-2xl shadow 
            ${isSender ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
          `}
        >
          {msg.text}
        </div>
      </div>
    );
  })}
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
