import React from "react";
import Button from "./components/atoms/Button";
import styled from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";

const StyledAppWrapper = styled.div`
  display: ${({ display }) =>
    display === "flex" ? "flex" : display === "grid" ? "grid" : "inline-block"};
`;

const StyledButton = styled(Button)`
  color: red;
`;

function App() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <StyledAppWrapper>
          <Button secondColor> Add </Button>
          <Button bigFont> Add </Button>
          <StyledButton isHoverable isDark bigFont>
            ss
          </StyledButton>
        </StyledAppWrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
