import React, { useContext } from "react";
import { IdentityContext } from "../utilities/identity-context.js";
import { Navbar } from "../components/Navbar";
import { Button } from "theme-ui";
import { dark } from "@theme-ui/presets";

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
      </div>
      {console.log(user)}
      {console.log(user && user.user_metadata.full_name)}
      {/* <Link to="/todo">Todo</Link> */}
    </div>
  );
}
