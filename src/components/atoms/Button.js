import styled, { css } from "styled-components";

const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  margin: 5px;
  color: ${({ color }) => (color ? color : "black")};
  padding: 7px 14px;
  background-color: ${({ theme }) => theme.yellowRed};
  transition: box-shadow 0.2s;
  &:focus {
    background-color: "black";
  }
  font-size: ${({ bigFont }) => (bigFont ? "40px" : "20px")};
  ${({ cartIcon }) =>
    cartIcon &&
    css`
      background-image: url(${({ cartIcon }) => cartIcon});
      background-repeat: no-repeat;
      background-size: 60%;
      background-position: 50%;
      border-radius: 50%;
      width: 65px;
      height: 65px;
      position: relative;
    `}

  ${({ isDark }) =>
    isDark &&
    css`
      background-color: ${({ theme }) => theme.darkGray};
    `};

  ${({ isHoverable }) =>
    isHoverable &&
    css`
      &:hover {
        box-shadow: 0px 0px 2px ${({ theme }) => theme.darkGray};
      }
    `};
  ${({ cartButton }) =>
    cartButton &&
    css`
      width: 35px;
      height: 35px;
      border-radius: 50%;
      text-align: center;
    `};

  ${({ icon }) =>
    icon &&
    css`
      background-color: transparent;
      margin: 0;
      padding: 0;
    `};
`;
export default Button;
