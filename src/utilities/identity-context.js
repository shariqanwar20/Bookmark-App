import React, { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { navigate } from "gatsby";

export const IdentityContext = createContext();

export const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    netlifyIdentity.init({});
  }, []);
  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user);
    navigate("/todo");
  });
  netlifyIdentity.on("logout", () => {
    netlifyIdentity.close();
    setUser("");
  });
  return (
    <IdentityContext.Provider value={{ identity: netlifyIdentity, user: user }}>
      {children}
    </IdentityContext.Provider>
  );
};
