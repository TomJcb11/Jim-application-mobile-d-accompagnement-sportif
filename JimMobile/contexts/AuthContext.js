import React, { useState } from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const guestUser = {
    bodyHeight: 0, // Valeur par défaut ou appropriée
    email: "guest@example.com", // Email par défaut pour l'utilisateur invité
    healthIssue: null,
    name: "Guest",
    phoneNumber: "",
    userBirthDate: "",
    userBody: null,
    userId: "0", // Identifiant unique pour l'utilisateur invité
    userInscriptionDate: "",
    userLevel: 0,
    userSex: "",
    userWeekPlans: null,
    userXp: 0,
  };
  const [user, setUser] = useState(guestUser); // Renommage de authuser en user
  const updateUserHealthIssues = (healthIssues) => {
    setUser((currentUser) => ({
      ...currentUser,
      healthIssue: healthIssues,
    }));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, updateUserHealthIssues }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;