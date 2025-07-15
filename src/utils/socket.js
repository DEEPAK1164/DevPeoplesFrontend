import {io} from "socket.io-client";
import { BASE_URL } from "./constant";

export const createSocketConnection=()=>{

    // it is telling client to connect with backend web socket
return io(BASE_URL);


}
