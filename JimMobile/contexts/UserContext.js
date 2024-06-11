import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    userId:"",
    email: "",
    password: "",
    phoneNumber: "",
    userSex: "",
    bodyHeight: 0,
    userBirthDate: "",
    userXp: 0,
    userLevel: 0,
    userBody: [],
    healthIssue: [],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;