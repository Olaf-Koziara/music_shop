import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import RootContext from "../context";
import Button from "./atoms/Button";
import cartIcon from "../assets/icons/cartIcon.svg";

import CartItem from "./CartItem";
import PayPalButton from "./PayPalButton";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    width: "580px",
    height: "80vh",
    fontFamily: "roboto",
  },
}));

const Cart = () => {
  const value = useContext(RootContext);
  const { cart, isCartOpen, handleCartClose, cartTotal } = value;
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isCartOpen}
        onClose={handleCartClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCartOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Your shopping cart</h2>
            {cart.map((product) => (
              <CartItem {...product} />
            ))}
            {cartTotal > 0 ? (
              <div style={{ display: "flex" }}>
                <div style={{ fontSize: "25px" }}>Total:</div>
                <div>
                  <h2>{Math.floor(cartTotal)}€</h2> <PayPalButton />
                </div>
              </div>
            ) : (
              <h2>Empty</h2>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default Cart;
