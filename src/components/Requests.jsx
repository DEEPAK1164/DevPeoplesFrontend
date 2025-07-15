import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

const reviewRequests=async(status,_id)=>{
    
    try{
       const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
       dispatch(removeRequest(_id))
    }catch(err){
    }
}


  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL+"/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data || []));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return ;

  if (requests.length === 0)
    return (
      <h1 className="text-center text-xl py-8 text-gray-600">
        No Requests Found!
      </h1>
    );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-12 flex items-center justify-center gap-3">
          <span>📨</span> Received Requests
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {requests.map((req) => {
            const user = req.fromUserId;
            return (
              <div
                key={req._id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 w-full"
              >
                <img
                  src={user?.photoUrl || "https://www.w3schools.com/howto/img_avatar.png"}
                  alt={`${user?.firstName}`}
                  className="w-full aspect-square object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://www.w3schools.com/howto/img_avatar.png";
                  }}
                />
                <div className="p-5 text-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2 italic">
                    {user?.about || "No about info available."}
                  </p>
                  <div className="mt-4 flex justify-center gap-4 flex-wrap">
                      <button onClick={()=>reviewRequests("rejected",req._id)}
                      className="px-4 py-1 text-sm rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                    <button onClick={()=>reviewRequests("accepted",req._id)}
                      className="px-4 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                  
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
