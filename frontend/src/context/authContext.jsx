import React, { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/verify", {
            headers: {
              "Authorization": `Bearer ${token}`  
            }
          }) 
          if(response.data.success) {
            setUser(response.data.user);
          }
      } catch (error) {
        if(error.response && !error.response.data.error) {
          setUser(null);
        }
      else { 
        setUser(null);
        setLoading(false);
      }
    } finally {
        setLoading(false);
    }
  }
}
    verifyUser();
}, []); 
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData?.token || "");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);

export default AuthProvider;
