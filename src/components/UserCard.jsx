const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105">
      <img
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        className="w-full h-80 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-gray-500 text-sm mb-1">
            {age} years old, {gender}
          </p>
        )}
        <p className="text-gray-600 mb-4">{about}</p>

        <div className="flex justify-between">
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
