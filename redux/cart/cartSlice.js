import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    count: 0,
    total: 0
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem: (state, action) => {
       state.products.push(action.payload);
       state.count = state.products.length;
       state.total += action.payload.totalPrice
      },
      removeItem: (state, action) => {
        // const remainingProducts = state.products.filter((product) => product !== action.payload)
        // console.log('payload',action.payload)
        // console.log('remaining products',remainingProducts)
        // state.products = remainingProducts
        state.products.splice(state.products.indexOf(action.payload), 1);
        state.count = state.products.length;
        state.total -= action.payload.totalPrice
      },
      clearCart: (state) => {
        state = initialState
      },
    },
})
  
// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer