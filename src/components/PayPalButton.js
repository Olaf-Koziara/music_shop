import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import RootContext from "../context";
import { useContext } from "react";

const PayPalButton = () => {
  const { handleCartClose, clearCart, cartTotal } = useContext(RootContext);
  const onSuccessPayment = (payment) => {
    console.log("The payment was a succeeded ", payment);
    handleCartClose();
    clearCart();
  };
  const onCancelPayment = (reason) => {
    console.log("The payment was canceled ", reason);
  };
  const onErrorPayment = (error) => {
    console.error("Payment error ", error);
  };
  const env = "sandbox";
  const currency = "EUR";
  const client = {
    sandbox:
      "AY7qBjyiA1Ci3TgbWMOC9Vnh7UY9tYE_noZm-RaOw0Ki4go-tHYPMNWYz4XJ4pq_Bt9sySA7YbnSlQF3",
  };
  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={cartTotal}
      onError={onErrorPayment}
      onCancel={onCancelPayment}
      onSuccess={onSuccessPayment}
    />
  );
};

export default PayPalButton;
