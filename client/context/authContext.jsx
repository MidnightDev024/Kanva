import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client"


const backendURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendURL;

export const authContext = createContext();

export const authProvider = ({ Children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    // check if user is authentcated and if so,set the user data and connect the socket 
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");
            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            Toaster.error(error.response.data.message);
        }
    }

    // Login function to handle user authentication and socket connection

    

    // connect socket function to handle socket connection and online users update
    const connectSocket = (userData) => {
        if(!userData || socket?.connected) return;
        const newSocket = io(backendURL, {
            query: { 
                userId: userData._id 
            }
        });
        newSocket.connect();
        setSocket(newSocket);
        
        newSocket.on("online-users", (userIds) => {
            setOnlineUsers(userIds);
        });
    }

    useEffect(() => {
        if (token){
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    }, []);

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket
    }

    return(
        <authContext.Provider value={value}>
            {Children}
        </authContext.Provider>
    )
}