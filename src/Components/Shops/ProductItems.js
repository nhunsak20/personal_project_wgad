import React, { useState } from "react";

function ProductItems(props) {
  let [quantity, setQuantity] = useState(1);
  const { product_id, product, product_img, price } = props.product;

  
const desClick = () => {
    quantity <= 1 ? setQuantity(1) : setQuantity(quantity -= 1)

}
const insClick = () => {
    setQuantity(quantity += 1)
}



  return (
    <div className="product-box">
      <h2 className='product-title'>{product}</h2>
      <div className="product-bottom">
        <div className="product-left">
          <div className="product-img-background">
            <img src={product_img} alt="" style={{ width: "100px" }} />
          </div>
          <div className="product-price">
            <p>${price}</p>
          </div>
        </div>
        <div className="product-right">
          <div className="product-quantity-input">
            <div className='button' onClick={desClick}>-</div>
            <input
                id='quantity-input'
              type="number"
              value={quantity}
              onChange={event => setQuantity(event.target.value)}
              min={1}
            />
            <div className='button' onClick={insClick}>+</div>
          </div>
          <div className="product-buttons">
            {/* <button>detail</button> */}
            <button onClick={() => props.addCart(product_id, quantity)}>
              add cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
