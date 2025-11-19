import axios from "axios";
import React, { useEffect, useState } from "react";

type userType = {
  name: string;
  email: string;
  id: string;
  image?: string;
};

type userContextType = {
  user: userType | undefined;
  setUser: (user: userType) => void;
};

const userDataContext = React.createContext<userContextType | undefined>(undefined);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType>();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.post("/api/user");
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  return (
    <userDataContext.Provider value={{ user, setUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
