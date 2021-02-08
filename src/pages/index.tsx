import React, { useContext } from "react";
import { IdentityContext } from "../utilities/identity-context.js";
import { Navbar } from "../components/Navbar";
import { Button } from "theme-ui";
import { swiss } from "@theme-ui/presets";
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
            fontWeight: "bold",
            color: swiss.colors.primary,
          }}
        >
          Bookmarking Application
        </p>
        <p
          style={{
            textAlign: "center",
            margin: "0 auto",
            fontSize: "25px",
            width: "50%",
          }}
        >
          An App for saving your bookmarks for free
        </p>
        {!user ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Button
              onClick={() => {
                identity.open();
              }}
              sx={{
                padding: "10px 30px",
                backgroundColor: swiss.colors.secondary,
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
                backgroundColor: swiss.colors.secondary,
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
