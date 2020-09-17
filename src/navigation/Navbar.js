import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import RootContext from "../context";
import cartIcon from "../assets/icons/cartIcon.svg";
import logo from "../assets/logo.PNG";
import { useSpring, animated } from "react-spring";
import FilterMenu from "./FilterMenu";
import HamburgerMenu from "react-hamburger-menu";
import "./Navbar.css";
import { useState } from "react";
const StyledNavList = styled(animated.nav)`
  display: none;
  list-style: none;

  justify-content: space-between;
  padding: 10px 20px;
  @media (min-width: 1050px) {
    display: flex;
  }
`;
const StyledBurgerMenu = styled(HamburgerMenu)`
  @media (min-width: 1050px) {
    display: none;
  }
  display: block;
  margin: 20px;
`;
const StyledBurgerMenuContentWrapper = styled.div``;

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
const StyledListItem = styled.li`
  padding: 10px;
  font-size: 20px;
  font-weight: bolder;
`;
const StyledList = styled.ul`
  list-style: none;
`;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const closeBurgerMenu = () => {
    setIsOpen(false);
  };
  return (
    <>
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
      <StyledBurgerMenu
        isOpen={isOpen}
        menuClicked={() => setIsOpen(!isOpen)}
        width={18}
        height={15}
        strokeWidth={1}
        rotate={0}
        color="black"
        borderRadius={0}
        animationDuration={0.5}
      >
        <a>Enis</a>
      </StyledBurgerMenu>
      {isOpen ? (
        <StyledBurgerMenuContentWrapper>
          <StyledList>
            <StyledListItem>
              <Link onClick={closeBurgerMenu} style={fade} to="/">
                Home
              </Link>
            </StyledListItem>

            <StyledListItem>
              <Link onClick={closeBurgerMenu} style={fade} to="/about">
                {" "}
                About
              </Link>
            </StyledListItem>

            <StyledListItem>
              <Link onClick={closeBurgerMenu} style={fade} to="/products">
                Products
              </Link>
            </StyledListItem>

            <StyledListItem>
              <Link onClick={closeBurgerMenu} style={fade} to="/contact">
                Contact
              </Link>
            </StyledListItem>
          </StyledList>
        </StyledBurgerMenuContentWrapper>
      ) : null}
    </>
  );
};

export default Navbar;
