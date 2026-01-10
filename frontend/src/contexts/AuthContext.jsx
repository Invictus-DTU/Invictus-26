import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
const backend_url = "http://localhost:3004";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);

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
        localStorage.setItem("accessToken", res.data.accessToken);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (error) {
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
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
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

  return (
    <AuthContext.Provider
      value={{
        user,
        // isAdmin,
        // refreshToken,
        loading,
        getEvents,
        getEventById,
        // logout,
        login,
        register,
        adminLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
