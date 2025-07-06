import { useEffect } from "react";
import axios from "axios";

import {useDispatch, useSelector} from "react-redux";

import { addConnections } from "../utils/connectionSlice";

const Connections=()=>{

const connections=useSelector((store)=>store.connections);

const dispatch=useDispatch();
const fetchConnections=async()=>{
   try{
     const res=await axios.get("http://localhost:7777/user/connections",{withCredentials:true})
    //  console.log(res.data);
   dispatch(addConnections(res.data["connections are"]));
   }catch(err){
  console.error('Error fetching connections:', err);
}


}

useEffect(()=>{
    fetchConnections();
},[]);
if (!connections) return (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500"></div>
  </div>
);

if (connections.length === 0) return (
  <h1 className="text-center text-xl py-8 text-gray-600">No Connections Found!</h1>
);

console.log(connections);
 
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-12 flex items-center justify-center gap-3">
          <span>🔥</span> Your Connections
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {connections.map((conn) => (
            <div
              key={conn._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 w-full max-w-xs"
            >
              <img
                src={conn.photoUrl || 'https://www.w3schools.com/howto/img_avatar.png'}
                alt={conn.firstName}
                className="h-64 w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://www.w3schools.com/howto/img_avatar.png';
                }}
              />
              <div className="p-5 text-center">
                <h2 className="text-xl font-bold text-gray-800">{conn.firstName} {conn.lastName}</h2>
                <p className="text-gray-600 text-sm mt-2 italic">
                  {conn.about || 'No about info available.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;