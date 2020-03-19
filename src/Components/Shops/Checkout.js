import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCarts, removeCarts, clearCarts } from "../../Redux/cartReducer";
// import StripeCheckout from 'stripe'
import StripeCheckout from "react-stripe-checkout";
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
import axios from "axios";

import CheckoutItems from "./CheckoutItems";

import "./Checkout.scss";

const stripeKey = "pk_test_Huv53DHV91vgimAjUtv6SOKj00AKivQfyF";

function Checkout(props) {
  const [products, setProducts] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [cartProduct, setCartProduct] = useState({});

  const cancelClicked = () => {
    props.history.goBack();
  };

  useEffect(() => {
    getCarts();
  }, []);

  const getCarts = () => {
    axios.get("/api/products").then(res => {
      setProducts(res.data);
    });
    props.getCarts();
  };

  const productFilters = product_id => {
    if (products) {
      const product = products.filter(product => {
        return product.product_id === +product_id;
      });
      return product;
    }
  };

  const cartLists = props.carts.map((cart, i) => {
    let productFilter = productFilters(cart.product_id);
    productFilter = productFilter[0];
    const { product, product_img, price } = productFilter ? productFilter : {};
    return (
      <CheckoutItems
        key={i}
        product_id={cart.product_id}
        quantity={cart.quantity}
        product_img={product_img}
        price={price}
        title={product}
      />
    );
  });

  const totalAmount = () => {
    const productPrice = props.carts.map(product => {
      const { product_id, quantity } = product;
      const price = products
        .filter(cart => cart.product_id === product_id)
        .map(cart => cart.price);

      return {
        quantity,
        price: price[0]
      };
    });

    return productPrice.reduce((acc, cur) => {
      const { quantity, price } = cur;
      const amount = quantity * price;
      acc += amount;
      return +acc;
    }, 0);
  };

  const taxes = rating => {
    return totalAmount() * rating;
  };

  const finalAmount = () => {
    // setTotal(+((totalAmount() + taxes(0.0715)).toFixed(2)))
    return totalAmount() + taxes(0.0715);
  };

  const currency = price => {
    return `$${price.toFixed(2)}`;
  };

  // const getProduct = () => {
  //   props.carts.map(cart => {
  //     const { quantity } = cart;
  //     console.log("get" + quantity);
  //     let productFilter = productFilters(cart.product_id);
  //     productFilter = productFilter[0];
  //     const { product, product_img, price } = productFilter
  //       ? productFilter
  //       : {};
  //     console.log("get" + product);
  //     return {
  //       product: product,
  //       product_img: product_img,
  //       price: price,
  //       quantity: quantity,
  //       total: price * quantity
  //     };
  //   });
  // }

  const login = () => {
    props.history.push("/login");
  };

  async function handlerToken(token) {
    const email = props.user.email;
    const total = +finalAmount().toFixed(2)
    const response = await axios.post("/charge", {
      token,
      price: total
    });
    const { data } = response;
    if (data === "OK") {
      const orders = { ...props.carts };
      const confirmOrder = await axios.post(`/purchased/${props.user.id}`, {
        orders
      });
      if (confirmOrder.data === "Accepted") {
        const confirm = await axios.post("/send", { total, email });
        if (confirm.data === "OK") {
          props.removeCarts();
          props.clearCarts();
          props.history.push("/news");
        } else {
          console.log("failed");
        }
      } else {
        console.log("ordered failed");
      }
    } else {
      alert("nope...");
    }
  }

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Checkout:</h2>
        </div>
        <div className="checkout-cart-lists" style={{ overflowY: "scroll" }}>
          {cartLists}
        </div>
        {!props.user.id ? (
          <div className="checkout-cart-prices">
            <div className="checkout-cart-prices-box">
              <p>
                price: <span>{currency(totalAmount())}</span>
              </p>
              <p>
                tax: <span>{currency(taxes(0.0715))}</span>
              </p>
              <p>
                shipping: <span>-.--</span>
              </p>
              <p>
                total: <span>{currency(finalAmount())}</span>
              </p>
            </div>
          </div>
        ) : null}
        <div className="checkout-buttons">
          <button onClick={cancelClicked}>Back to Shop</button>
          {props.user.id ? (
            <StripeCheckout stripeKey={stripeKey} token={handlerToken} />
          ) : (
            <button onClick={login}>login to pay</button>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = reduxState => {
  const { carts } = reduxState.carts;
  const { user } = reduxState.user;
  return {
    user,
    carts
  };
};

export default connect(mapStateToProps, { getCarts, removeCarts, clearCarts })(
  Checkout
);
