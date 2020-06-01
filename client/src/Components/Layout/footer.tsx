import React from "react";
import styled from "@emotion/styled";

import MenuItem from "./menu-item";
import LogoutButton from "../logoutButton";
import { colors, unit } from "../../styles";

export default function Footer() {
  return (
    <Container>
      <InnerContainer>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/journals">Journals</MenuItem>
        <MenuItem to="/profile">Profile</MenuItem>
        <LogoutButton />
      </InnerContainer>
    </Container>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled("footer")({
  flexShrink: 0,
  marginTop: "auto",
  backgroundColor: "white",
  color: colors.textSecondary,
  position: "sticky",
  bottom: 0,
});

const InnerContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  maxWidth: 560,
  padding: unit * 2.5,
  margin: "0 auto",
});
