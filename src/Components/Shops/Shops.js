import React, { Component } from "react";
import { connect } from "react-redux";
import ProductItems from './ProductItems'
import Carts from './Carts'
import axios from "axios";
import { getCarts, addCarts } from "../../Redux/cartReducer";

import "./Shops.scss";

class Shops extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios.get("/api/products").then(res => {
      this.setState({
        products: res.data
      });
    });
    this.props.getCarts()
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.checkoutScrolled);
  }

  checkoutClicked = () => {
    this.props.history.push("/shops/checkout");
  };

  checkoutScrolled = () => {
    const checkoutButton = document.getElementById("checkout-button");

    if (checkoutButton) {
      if (window.scrollY >= 0 && window.scrollY < 75) {
        checkoutButton.style.top = "120px";
      } else {
        checkoutButton.style.top = "50px";
      }
    }
  };

  addCart = (product_id, quantity) => {
    this.props.addCarts(this.props.user.id, product_id, quantity);
  };

  render() {
    document.addEventListener("scroll", this.checkoutScrolled);

    const{ carts } = this.props.carts

    let mapProducts = this.state.products.map((product, i) => {
      return (
        <ProductItems key={i}
          addCart={this.addCart}
          product = {product}
          />
      );
    });

    return (
      <div className="products">
        <div className="products-container">
          <div className="products-header">
            <h1 className="products-header-title">Shops</h1>
            { carts.length > 0 ? (
              <Carts carts={carts}
                onClick={this.checkoutClicked}
                />
            ): null}
          </div>
          <div className="product-container">
            <div className="product-flex-box">{mapProducts}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { user, carts } = reduxState;
  return {
    user,
    carts
  };
};

export default connect(mapStateToProps, { getCarts, addCarts })(Shops);
