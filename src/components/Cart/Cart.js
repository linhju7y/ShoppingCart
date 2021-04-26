import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";

import { connect } from "react-redux";

import CartItem from "./CartItem/CartItem";
import OrderModal from "./../Order/OrderModal";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
    console.log(totalPrice);
    console.log();
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Cart Summary</h4>
        <div >
          {cart.map((carts) => {
            return (
              <ul>
                <li>
                  {carts.title} x {carts.qty}kg
                </li>
              </ul>
            );
          })}
        </div>
        <div>
          <b>VNĐ {totalPrice}</b>
        </div>
        <button
          className={styles.summary__checkoutBtn}
          onClick={() => setIsOpenOrder(true)}
        >
          Proceed To Checkout
        </button>
      </div>
      <OrderModal
        open={isOpenOrder}
        onClose={() => setIsOpenOrder(false)}
        cart={cart}
        totalPrice={totalPrice}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop,
  };
};

export default connect(mapStateToProps)(Cart);
