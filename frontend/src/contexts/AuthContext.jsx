import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { log } from "three";

export const AuthContext = createContext();
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [regError, setRegError] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // to avoid history flickering login pe redirect is avoided bcoz this default true meaning let react check if user is there or not until then no redirects

  useEffect(() => {
  const restoreSession = async () => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("accessToken");

    if (adminToken) {
      const ok = await fetchMeAdmin(adminToken);
      if (ok) {
        localStorage.removeItem("accessToken");
        setAuthLoading(false);
        return;
      }
      localStorage.removeItem("adminToken");
    }

    //  Try user
    if (userToken) {
      const ok = await fetchMe(userToken);
      if (ok) {
        localStorage.removeItem("adminToken");
        setAuthLoading(false);
        return;
      }
      localStorage.removeItem("accessToken");
    }

    //  No valid session
    setUser(null);
    setIsAdmin(false);
    setAuthLoading(false);
  };

  restoreSession();
}, []);


  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/users/login`,
        credentials,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        // console.log(res);
        
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        const Name = await fetchMe(res.data.accessToken);
        // console.log(Name);
        setRegError(null);
        return { success: true };
      }
    } catch (error) {
      setRegError(error.response.data.error || "Registration failed")
      console.log(error);
      
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
  setLoading(true);
  try {
    const res = await axios.post(
      `${backend_url}/users`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.status === 201 || res.status === 200) {
      setRegError(null);
      return {
        success: true,
        data: res.data,
      };
    }
  } catch (error) {
    setRegError(error.response?.data?.error || "Registration failed");

    return {
      success: false,
      message: error.response?.data?.error || "Registration failed",
    };
  } finally {
    setLoading(false);
  }
};

  const Adminlogin = async (credentials) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/admin/login`,
        credentials,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
        
      );

      if (res.status === 200) {
        
        localStorage.setItem("adminToken", res.data.accessToken);
        const admin = await fetchMeAdmin(res.data.accessToken);
        setRegError(null);
        return { success: true };
      }
    } catch (error) {
      setRegError(error.response?.data?.error || "Registration failed");
      console.log(error);
      
      return {
        success: false,
        message: error.response?.data?.message || "Admin login failed",
      };
    } finally {
      setLoading(false);
    }
  };

   const getAdminEvents = async () => {
    setEventsLoading(true);
    setEventsError(null);

    try {
      const res = await axios.get(`${backend_url}/admin/events`,{
        headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      });

      if (res.status === 200) {
        console.log(res);
        setEvents(res.data);
        return res.data;
      }
    } catch (error) {
      console.log(error);
      setEventsError(
        error.response?.data?.message || "Failed to fetch events"
      );
      return [];
    } finally {
      setEventsLoading(false);
    }
  };

  // const getEventById = async (id) => {
  //   try {
  //     const res = await axios.get(`${backend_url}/events/${id}`);
  //     if (res.status === 200) return res.data.event;
  //   } catch {
  //     return null;
  //   }
  // };

  const fetchMe = async (token) => {
  try {
    const res = await axios.get(`${backend_url}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res);
    if (res.status === 200) {
      setUser(res.data.name);
      setIsAdmin(false);
      // setIsAdmin(res.data.user.role === "admin");
      return true;
    }
  } catch {
    return false;
  }
};

  const fetchMeAdmin = async (token) => {
  try {
    const res = await axios.get(`${backend_url}/admin/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setUser(null);
      setIsAdmin(true);
      return true;
    }
  } catch {
    return false;
  }
};


  const handleGoogleCallback = async (accessToken, refreshToken) => {
  if (!accessToken) return { success: false };

  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  const success = await fetchMe(accessToken);

  return { success };
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("adminToken");

  setUser(null);
  setIsAdmin(null);
};



  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        // refreshToken,
        events,
        eventsLoading,
        eventsError,
        getAdminEvents,
        loading,
        regError,
        logout,
        login,
        register,
        authLoading,
        Adminlogin,
        handleGoogleCallback
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
