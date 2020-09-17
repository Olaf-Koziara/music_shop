import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/atoms/Button";

import TextField from "@material-ui/core/TextField";
import searchIcon from "../assets/icons/001-loupe.svg";
import StyledImage from "../components/atoms/Image";
import RootContext from "../context";
import resetIcon from "../assets/icons/001-update-arrow.png";
import "./FilterMenu.css";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimatedButton = animated(Button);
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const FilterMenu = () => {
  const {
    handleSearchChange,
    search,
    min,
    max,
    price,
    handlePriceInputChange,
    setCategory,
    onDrop,
    clearFilters,
    categories,
  } = useContext(RootContext);
  const [rotateDeg, setRotateDeg] = React.useState(720);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const startReset = (e) => {
    clearFilters();

    e.target.style.webkitTransform = `rotate(${rotateDeg}deg)`;
    setRotateDeg(rotateDeg + 720);
  };
  console.log(categories);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "auto",
        width: "50%",
      }}
    >
      <AnimatedButton
        style={{ height: "61px", marginTop: "20px" }}
        onClick={startReset}
        icon
      >
        <img
          style={{ width: "32px", transition: "0.4s ease-in-out" }}
          src={resetIcon}
          alt="reset"
        />
      </AnimatedButton>
      <div style={{ marginTop: "20px" }}>
        <Button
          style={{ borderRadius: "5px" }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Categories
        </Button>
      </div>

      <div>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              setCategory("All");
              handleClose();
            }}
          >
            All
          </MenuItem>
          {categories
            ? categories.map((category) => (
                <MenuItem
                  onClick={() => {
                    setCategory(category);
                    handleClose();
                  }}
                >
                  {category}
                </MenuItem>
              ))
            : null}
        </StyledMenu>
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          id="standard-basic"
          label="Search"
          onChange={handleSearchChange}
          name="title"
          value={search}
        />
        <StyledImage isIcon src={searchIcon} />
      </div>

      <div style={{ padding: "10px" }}>
        <label htmlFor="priceInput">
          <p style={{ fontSize: "20px" }}>
            Product price: <span>{price}€</span>
          </p>
        </label>
        <input
          type="range"
          name="priceInput"
          id="priceInput"
          className="slider"
          min={min}
          max={max}
          value={price}
          onChange={handlePriceInputChange}
          step="1"
        />
      </div>
    </div>
  );
};

export default FilterMenu;
