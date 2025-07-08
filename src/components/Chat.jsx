import { useParams } from "react-router-dom";

const Chat = () => {
  // const { toUserId } = useParams();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold">Chat</h1>
        {/* Optional: show user id or back button */}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
       
        
      </div>

      {/* Input area */}
      <div className="flex items-center border-t p-3 bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition-all duration-300 cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
