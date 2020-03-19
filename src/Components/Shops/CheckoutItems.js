import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateCart, removeOneCart } from "../../Redux/cartReducer";

import trash_icon from "../../assets/delete-icon.png";

const style = {
  background:
    "linear-gradient(rgb(255, 255, 255),rgba(255, 255, 255, 0.8),rgba(193, 227, 255, 0.7))",
  boxSizing: "border-box",
  borderRadius: "5px",
  padding: "10px"
};

function CheckoutItems(props) {
  let [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(+props.quantity);
  }, [props]);

  const desClick = () => {
    quantity <= 1 ? setQuantity(1) : setQuantity((quantity -= 1));
  };

  const insClick = () => {
    setQuantity((quantity += 1));
  };

  const updateCarts = () => {
    props.updateCart(props.product_id, quantity);
  };

  const removeOneCart = () => {
    props.removeOneCart(props.product_id);
  };

  const mutl = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  return (
    <div className="checkout-box-item" style={style}>
      <div className="checkout-box-container">
        <div className="checkout-img-background">
          <img src={props.product_img} alt="" />
        </div>
        <div className="checkout-headers-title">
          <h2 className="checkout-title">{props.title}</h2>
          <h2 className="check-price">${mutl(props.price, quantity)}</h2>
        </div>
      </div>
      <div className="checkout-inputs">
        <div className="checkout-quantity-handle">
          <div className="button" onClick={desClick}>
            -
          </div>
          <div className="checkout-quantity-input">
            <input
              type="number"
              value={quantity}
              onChange={event => setQuantity(event.target.value)}
              min={1}
            />
          </div>

          <div className="button" onClick={insClick}>
            +
          </div>
        </div>
        <div className="checkout-box-buttons">
          <button
            className="checkout-box-button"
            disabled={+props.quantity === quantity}
            onClick={updateCarts}
          >
            update
          </button>
          <div className="checkout-box-img-button" onClick={removeOneCart}>
            <img src={trash_icon} alt="remove" />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = reduxState => {
  const { carts } = reduxState;
  return {
    carts
  };
};

export default connect(mapStateToProps, { updateCart, removeOneCart })(
  CheckoutItems
);
