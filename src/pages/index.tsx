import React, { useContext } from "react";
import { IdentityContext } from "../utilities/identity-context.js";
import { Navbar } from "../components/Navbar";
import { Button } from "theme-ui";
import { dark } from "@theme-ui/presets";
import { Link } from "@reach/router";

export default function Home() {
  const { user, identity } = useContext(IdentityContext);
  return (
    <div>
      <Navbar />
      <div className="centered">
        <p
          style={{
            textAlign: "center",
            margin: "0 auto",
            fontSize: "50px",
            width: "50%",
          }}
        >
          Organize it all with todoist
        </p>
        {!user ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Button
              onClick={() => {
                identity.open();
              }}
              sx={{
                padding: "10px 30px",
                backgroundColor: dark.colors.secondary,
              }}
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Button
              as={Link}
              to="/bookmark/"
              sx={{
                padding: "10px 30px",
                backgroundColor: dark.colors.secondary,
              }}
            >
              Go To Dashboard
            </Button>
          </div>
        )}
      </div>
      {console.log(user)}
    </div>
  );
}
