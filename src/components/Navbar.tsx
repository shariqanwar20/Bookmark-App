import { Link } from "gatsby";
import React, { useContext } from "react";
import { Flex, NavLink, Button } from "theme-ui";
import { IdentityContext } from "../utilities/identity-context.js";
import logo from "../images/icon.png";

export const Navbar = () => {
  const { user, identity } = useContext(IdentityContext);

  return (
    <Flex as="nav">
      <NavLink as={Link} to="/" p={2}>
        <img src={logo} alt="logo" width="50px" />
      </NavLink>
      <div style={{ margin: "auto 0 auto auto" }}>
        <NavLink
          as={Link}
          to="/"
          p={2}
          sx={{ padding: "8px", margin: "auto 0" }}
        >
          Home
        </NavLink>
        <NavLink
          as={Link}
          to="/bookmark/"
          p={2}
          sx={{ padding: "8px", margin: "auto 0" }}
        >
          Dashboard
        </NavLink>
        <NavLink
          as={Button}
          onClick={() => {
            identity.open();
          }}
          p={2}
          sx={{ padding: "8px", backgroundColor: "transparent" }}
        >
          {user ? "Logout" : "Login/Signup"}
        </NavLink>
      </div>
    </Flex>
  );
};
