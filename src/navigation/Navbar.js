import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import RootContext from "../context";
import cartIcon from "../assets/icons/cartIcon.svg";
import logo from "../assets/logo.PNG";
import { useSpring, animated } from "react-spring";
import FilterMenu from "./FilterMenu";

const StyledNavList = styled(animated.nav)`
  display: flex;
  list-style: none;

  justify-content: space-between;
  padding: 10px 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.s};
  margin-top: 20px;
  background-color: ${({ theme }) => theme.champagnePink};
  padding: 15px;
  border-radius: 5px;
  height: 50px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #d4bcb3;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  gap: 20px;

  flex-wrap: wrap;
`;
const StyledCartCounter = styled.span`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Navbar = () => {
  const fade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });
  const value = useContext(RootContext);
  const left = useSpring({
    transform: "scale(1)",
    from: { transform: `scale(1.5)` },
    config: { duration: 500 },
  });
  const { handleCartOpen, cartCounter } = value;

  return (
    <StyledNavList style={left}>
      <div>
        <Link to="/">
          <img
            style={{ width: "150px", alignSelf: "flex-start" }}
            src={logo}
            alt="logo"
          />
        </Link>
      </div>
      <FilterMenu />

      <StyledUl>
        <StyledLink style={fade} to="/">
          Home
        </StyledLink>

        <StyledLink style={fade} to="/about">
          About
        </StyledLink>

        <StyledLink style={fade} to="/products">
          Products
        </StyledLink>

        <StyledLink style={fade} to="/contact">
          Contact
        </StyledLink>

        <Button cartIcon={cartIcon} onClick={handleCartOpen}>
          <StyledCartCounter>{cartCounter}</StyledCartCounter>
        </Button>
      </StyledUl>
    </StyledNavList>
  );
};

export default Navbar;
