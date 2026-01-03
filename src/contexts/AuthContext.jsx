import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
const backend_url = "http://localhost:3004"

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {
        console.log(credentials);
        try{
      const res = await axios.post(`${backend_url}/users/login`, credentials, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      if(res.status === 200){
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken);
      }

    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed"
      };
    }
    }

  return <AuthContext.Provider
    value={{
        // user
        // loading,
        login
        // logout,
        // register,
        // refreshToken
      }}>
    {children}
  </AuthContext.Provider>
}
