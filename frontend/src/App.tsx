import React from "react";
import { CommonRouter } from "./routers/common-router";
import { Box, Container } from "@material-ui/core";

function App() {
  return (
    <Box bgcolor="#e0e0e0" m={-1} height="100%" minHeight="100vh">
      <Container
        maxWidth="sm"
        style={{ backgroundColor: "white", height: "100%", minHeight: "100vh" }}
      >
        <CommonRouter />
      </Container>
    </Box>
  );
}

export default App;
