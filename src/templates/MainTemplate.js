import React from "react";
import Navbar from "../navigation/Navbar";
import Cart from "../components/Cart";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Navbar />
      <Cart />
      {children}
    </>
  );
};

export default MainTemplate;
