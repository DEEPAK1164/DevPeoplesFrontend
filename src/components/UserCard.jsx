import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `http://localhost:7777/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-pink-300 rounded-3xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg">
      
      {/* Profile Picture */}
      <img
        src={
          photoUrl ||
          "https://via.placeholder.com/150?text=Photo"
        }
        alt={`${firstName} ${lastName}`}
        className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 mb-4"
      />

      {/* Name */}
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        {firstName} {lastName}
      </h2>

      {/* About / Placeholder */}
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        {about || "This is a default about of the user!"}
      </p>

      {/* Action Buttons */}
      <div className="flex w-full flex-col gap-3">
        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-full transition"
        >
          ❤️ Interested
        </button>
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-full transition"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default UserCard;
