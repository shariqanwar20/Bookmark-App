import React, { useContext } from "react";
import { IdentityContext } from "../utilities/identity-context";

export default () => {
  const { user, identity } = useContext(IdentityContext);
  return (
    <div>
      <h2>Home Page</h2>
      <button
        onClick={() => {
          identity.open();
        }}
      >
        Login
      </button>
      {console.log(user)}
    </div>
  );
};
