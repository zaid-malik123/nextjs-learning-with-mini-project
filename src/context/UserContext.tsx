"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type userType = {
  name: string;
  email: string;
  id: string;
  image?: string;
};

type userContextType = {
  user: userType | undefined;
  setUser: React.Dispatch<React.SetStateAction<userType | undefined>>;
};

export const userDataContext = React.createContext<userContextType | undefined>(undefined);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()  
  const [user, setUser] = useState<userType>();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [session]);

  return (
    <userDataContext.Provider value={{ user, setUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
