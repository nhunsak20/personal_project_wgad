import React from "react";
import cart_icon from "../../assets/cart-logo.png";

function Carts(props) {
  return (
    <div
      className="products-checkout-buttons"
      id="checkout-button"
      onClick={props.onClick}
    >
      <div className="products-checkout-button">
        <img src={cart_icon} alt="" />
        <div className="checkout-conuter">
          <span>{props.carts.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Carts;
