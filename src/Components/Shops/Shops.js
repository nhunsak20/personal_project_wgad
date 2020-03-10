import React, { Component } from "react";
import { connect } from "react-redux";
import { getCarts, addCarts } from '../../Redux/cartReducer'

import cart_icon from "../../assets/cart-logo.png";
import edit_icon from "../../assets/edit_icon.png";

import "./Shops.scss";

class Shops extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        "golf balls",
        "golf shoes",
        "golf shirt",
        "golf pant",
        "golf clubs"
      ],
      carts: []
    };
  }

  componentDidMount() {
    // this.setState({
    //   carts: this.props.getCarts()
    // })
    console.log("Cart: " + this.props.getCarts())
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.checkoutScrolled);
  }

  checkoutClicked = () => {
    this.props.addCarts(this.state.carts)
    this.props.history.push('/shops/checkout')
  };

  checkoutScrolled = () => {
    const checkoutButton = document.getElementById("checkout-button");
    
    if (checkoutButton) {
      if (window.scrollY >= 0 && window.scrollY < 75) {
        checkoutButton.style.top = "95px";
      } else {
        checkoutButton.style.top = "20px";
      }
    }
  };

  addCart = (get) => {
    this.setState({
      carts: [...this.state.carts, get]
    })
  }

  render() {
    document.addEventListener("scroll", this.checkoutScrolled);
    
    // const cartPosition = this.state.carts.length > 0 ? (
    //   document.getElementById('checkout-button').style.top = '100px'
    // ): (
    //   document.getElementById('checkout-button').style.top = '500px'
    // )

    let mapProducts = this.state.products.map((product, i) => {
      return (
        <div key={i} className="product-box">
          <div className="product-left">
            <img alt="" />
          </div>
          <div className="product-right">
            <p>{product}</p>
            <button onClick={() => this.addCart(product)}>add</button>
          </div>
          {this.props.user.isAdmin ? (
            <div className="products-edit-button">
              <img src={edit_icon} alt="" />
            </div>
          ) : null}
        </div>
      );
    });

    return (
      <div className="products">
        <div className="products-container">
          <div className="products-header">
            <h1 className="products-header-title">Shops</h1>
            {this.props.user.isAdmin ? (
              <div className="products-new-buttons">
                <div className="products-new-button">
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              this.state.carts.length > 0 ? (
              <div
                className="products-checkout-buttons"
                id="checkout-button"
                onClick={this.checkoutClicked}>
                <div className="products-checkout-button">
                  <img src={cart_icon} alt="" />
                  {/* count */}
                  
                    <div className="checkout-conuter">
                      <span>{this.state.carts.length}</span>
                      </div>
                </div>
              </div>
              ): null )}
          </div>
          <div className="product-container">
            <div className="product-flex-box">{mapProducts}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => (
  { 
    user: reduxState.user,
    cart: reduxState.cart
 });


export default connect(mapStateToProps, { getCarts, addCarts })(Shops);
