import React from "react";
import styled from "@emotion/styled";
import { useApolloClient } from "@apollo/react-hooks";

import { menuItemClassName } from "./Layout/menu-item";

function LogoutButton() {
  const client = useApolloClient();
  return (
    <StyledButton
      onClick={() => {
        localStorage.clear();
        client.writeData({ data: { isLoggedIn: false } });
        client.resetStore();
        window.location.reload(false);
      }}
      style={{ cursor: "pointer" }}
    >
      Logout
    </StyledButton>
  );
}

export default LogoutButton;

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0,
});
