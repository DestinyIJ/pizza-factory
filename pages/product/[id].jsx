import styles from "../../styles/Product.module.css";
import axios from 'axios'
import Image from "next/image";
import { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from "../../redux/cart/cartSlice";

const BASE_URL = "http://localhost:3000"

const INITIAL_STATE = {
  extras: [],
  quantity: 1,
  price: 0,
  extraPrice: 0,
  totalPrice: 0,
  orderItem: {
    image: '',
    name: '',
    quantity: 1,
    discount: 0,
    price: 0,
    totalPrice: 0,
    extras: []
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXTRA":
      let extra = action.payload
      let price = state.price + extra.price

      return {...state, 
        extras: [...state.extras, extra], 
        extraPrice: (state.extraPrice + extra.price),
        price, totalPrice: price * state.quantity
      };
    case "REMOVE_EXTRA":
      extra = action.payload
      const prevExtras = state.extras
      const newExtras = prevExtras.filter((prevExtra) => prevExtra._id !== extra._id)
      price = state.price - extra.price
      return {...state, 
        extras: [...state.extras, newExtras], 
        extraPrice: (state.extraPrice - extra.price),
        price, totalPrice: price * state.quantity
      };
    case "SET_QUANTITY":
      let totalPrice = state.price * action.payload
      return {...state, quantity: action.payload, totalPrice};
    case "SET_PRICE":
      price = action.payload + state.extraPrice
      return {...state, price: price, totalPrice: (price * state.quantity)};
    case "SET_ORDER":
      const product = action.payload
      const orderItem = {
        image: product.image,
        name: product.title,
        quantity: state.quantity,
        discount: product.discount,
        price: state.price,
        totalPrice: state.totalPrice,
        extras: state.extras
      }
      return {...state, orderItem};
    default:
      return state;
  }
};

const Product = ({ pizza }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const cartDispatch = useDispatch()

  useEffect(() => {
    dispatch({type: "SET_PRICE", payload: pizza.prices.small})
  }, [])

  useEffect(() => {
    dispatch({type: "SET_ORDER", payload: pizza})
  }, [state.totalPrice])

  const handleChange = (e, option) => {
    const checked = e.target.checked

    if(checked) {
      dispatch({type: "ADD_EXTRA", payload: option})
    } else {
      dispatch({type: "REMOVE_EXTRA", payload: option})
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza?.image} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza?.title}</h1>
        <span className={styles.price}>${state.totalPrice}</span>
        <p className={styles.desc}>{pizza?.description}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => dispatch({type: "SET_PRICE", payload: pizza.prices.small})}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => dispatch({type: "SET_PRICE", payload: pizza.prices.medium})}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => dispatch({type: "SET_PRICE", payload: pizza.prices.large})}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {
            pizza?.extraOptions && pizza?.extraOptions.map((option) => (
              <div className={styles.option} key={option?._id}>
                <input
                  type="checkbox"
                  id="double"
                  name="double"
                  onChange={(e) => handleChange(e, option)}
                  value={option.price}
                  className={styles.checkbox}
                />
                <label htmlFor="double"> {option?.name}</label>
              </div>
            ))
          }
        </div>
        <div className={styles.add}>
            <input type="number" min={1} onChange={(e) => 
            dispatch({type: "SET_QUANTITY", payload: e.target.value})} defaultValue={state.quantity} className={styles.quantity}/>
            <button className={styles.button} onClick={() => cartDispatch(addItem(state.orderItem))} >Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({params}) => {
  const res = await axios.get(`${BASE_URL}/api/products/${params?.id}`)
  return {
    props: {
      pizza: res.data.data
    }
  }
}
