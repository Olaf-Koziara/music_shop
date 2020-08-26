import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/atoms/Button";

import TextField from "@material-ui/core/TextField";
import searchIcon from "../assets/icons/001-loupe.svg";
import StyledImage from "../components/atoms/Image";
import RootContext from "../context";
import "./FilterMenu.css";
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
  } = useContext(RootContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "50%",
      }}
    >
      <div style={{ marginTop: "30px" }}>
        <Button
          style={{ borderRadius: "5px" }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Categories
        </Button>
      </div>
      <div style={{ padding: "10px", marginTop: "10px" }}>
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
      <div>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setCategory("all")}>All</MenuItem>
          <MenuItem onClick={() => setCategory("Electric guitar")}>
            Guitar
          </MenuItem>
          <MenuItem onClick={() => setCategory("Guitar Amp")}>
            Guitar AMP
          </MenuItem>
          <MenuItem onClick={() => setCategory("Acoustic drums")}>
            Drums
          </MenuItem>
        </StyledMenu>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TextField
          id="standard-basic"
          label="Search"
          onChange={handleSearchChange}
          name="title"
          value={search}
        />
        <StyledImage isIcon src={searchIcon} />
      </div>
    </div>
  );
};

export default FilterMenu;
