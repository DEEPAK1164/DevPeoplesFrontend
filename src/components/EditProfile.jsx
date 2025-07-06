import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import axios from "axios";
const EditProfile = ({ obj }) => {
  const [firstName, setFirstName] = useState(obj?.data?.firstName);
  const [lastName, setLastName] = useState(obj?.data?.lastName);
  const [age, setAge] = useState(obj?.data?.age);
  const [gender, setGender] = useState(obj?.data?.gender);
  const [about, setAbout] = useState(obj?.data?.about);
  const [photoUrl, setPhotoUrl] = useState(obj?.data?.photoUrl);
    const [success, setSuccess] = useState(""); // ✅ Success state
  const [error, setError] = useState("");
  const dispatch=useDispatch();

   const saveProfile=async()=>{
       
    try{
      const res=await axios.patch("http://localhost:7777/profile/edit",{ firstName, lastName, photoUrl, age, gender, about },{withCredentials:true});
       dispatch(addUser(res.data.data))
        setSuccess("Profile updated successfully! ✅"); // ✅ Set success message
        setError("");
         // Auto-dismiss after 4 seconds
      setTimeout(() => setSuccess(""), 4000);
    }catch(err){
       setSuccess(""); // Clear success if there's an error
      setError(err?.response?.data || "Something went wrong!");
    }


   }




  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Edit Form */}
      <div className="bg-white rounded-xl shadow-md p-6 flex-1 max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
         {success && (
          <div className="mb-4 p-3 rounded-md bg-green-100 text-green-800 border border-green-300 text-sm">
            {success}
          </div>
        )}
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700">Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700">Age</span>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700">Gender</span>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700">About</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700">Photo URL</span>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button onClick={saveProfile}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* User Card Preview */}
      <div className="flex-1 max-w-xl">
        <UserCard
          user={{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
