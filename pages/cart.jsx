import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { addItem, removeItem } from "../redux/cart/cartSlice";
import ButtonWrapper from "../components/PayPalBtnWrapper";
import {
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

const Cart = () => {
  const [open, setOpen] = useState(false)
  const currency = "USD";
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart.products)
  const total = useSelector(state => state.cart.total)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    console.log(products)
  }, [total])

  useEffect(() => {
    const initialDiscount = 0;
    const totalDiscount = products.reduce(
      (accumulator, product) => accumulator + product.discount,
      initialDiscount
    );

    setDiscount(totalDiscount)
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {
          products.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              
              <tbody>
              {
                products.map((product, index) => (
                  <tr className={styles.tr} key={index}>
                    <td>
                      <div className={styles.imgContainer}>
                        <Image
                          src={product.image}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <span className={styles.name}>{product?.name}</span>
                    </td>
                    <td>
                      <span className={styles.extras}>
                        {
                          product.extras.map((extra, index) => (
                            <span>{`${extra.name}${extra.length-1 === index ? ", ":"."}`}</span>
                          ))
                        }
                      </span>
                    </td>
                    <td>
                      <span className={styles.price}>${product?.price}</span>
                    </td>
                    <td>
                      <span className={styles.quantity}>{product?.quantity}</span>
                    </td>
                    <td>
                      <span className={styles.total}>${product?.totalPrice}</span>
                    </td>
                    <td>
                      <button onClick={() => {dispatch(removeItem(product))}}>Remove</button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          )
        }
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>${discount}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total}
          </div>
          {
            open ? 
            <div className={styles.paymentMethods}>
              <button className={styles.payButton}>CASH ON DELIVERY</button>
              <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                <PayPalScriptProvider
                    options={{
                        "client-id": "test",
                        components: "buttons",
                        currency: "USD",
                        "disable-funding": "credit,card,p24"
                    }}
                >
                <ButtonWrapper
                    currency={currency}
                    showSpinner={true}
                    amount={total}
                />
                </PayPalScriptProvider>
              </div>
            </div> : 
            <button className={styles.button} onClick={() => setOpen(true)}>CHECKOUT NOW!</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
