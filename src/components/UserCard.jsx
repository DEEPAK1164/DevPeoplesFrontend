const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
      <img
        src={photoUrl || "https://via.placeholder.com/400x300?text=Photo"}
        alt={`${firstName} ${lastName}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-500 text-sm mb-1">
              {age} years old, {gender}
            </p>
          )}
          <p className="text-gray-600 mb-4">{about}</p>
        </div>

        <div className="flex justify-between mt-4">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition">
            Ignore
          </button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full transition">
            Interested ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
