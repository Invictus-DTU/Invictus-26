import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null)
  const [regError, setRegError] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // to avoid history flickering login pe redirect is avoided bcoz this default true meaning let react check if user is there or not until then no redirects

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setAuthLoading(false);//no need to set user as null because on reload automatically default state as null 
      return;
    }

    axios
      .get(`${backend_url}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.name);
        console.log(user);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");// if accesstoken not valid
        setUser(null);
      })
      .finally(() => {
        setAuthLoading(false);// very imp user pura checked and stored properly in localstorage then authloading stopped so initially if user == null and react has just rendered toh wont shift to login no flicker only shift to login page after this check is completed
      });
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

  const adminLogin = async (credentials) => {
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
        setUser({ ...res.data.admin, role: "admin" });
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Admin login failed",
      };
    } finally {
      setLoading(false);
    }
  };

   const getEvents = async () => {
    setEventsLoading(true);
    setEventsError(null);

    try {
      const res = await axios.get(`${backend_url}/events`);

      if (res.status === 200) {
        setEvents(res.data.events);
        return res.data.events;
      }
    } catch (error) {
      setEventsError(
        error.response?.data?.message || "Failed to fetch events"
      );
      return [];
    } finally {
      setEventsLoading(false);
    }
  };

  const getEventById = async (id) => {
    try {
      const res = await axios.get(`${backend_url}/events/${id}`);
      if (res.status === 200) return res.data.event;
    } catch {
      return null;
    }
  };

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
      // setIsAdmin(res.data.user.role === "admin");
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
  // localStorage.removeItem("adminToken");

  setUser(null);
  setIsAdmin(null);
};



  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        // refreshToken,
        loading,
        regError,
        getEvents,
        getEventById,
        logout,
        login,
        register,
        authLoading,
        adminLogin,
        handleGoogleCallback
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
