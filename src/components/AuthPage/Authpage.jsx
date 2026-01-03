import React, { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Authpage() {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const SubmitFunc = async (e) => {
    e.preventDefault();
    await login({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div>
      <form onSubmit={SubmitFunc}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>

      {/* Google login */}
      <button
        type="button"
        onClick={() => {
          window.location.href = "http://localhost:3004/auth/google";
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}
