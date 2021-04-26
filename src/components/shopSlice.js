import { createSlice } from "@reduxjs/toolkit";

export const adjustItemQtyPrepare = (id, qty) => {
  return {
    payload: {
      id,
      qty,
    },
  };
};
export const adjustItemQtyReducer = (state, action) => {
  const { id, qty } = action.payload;
  console.log(id, qty);
  const inCart = state.find((item) => item.id === id);
  if (inCart) {
    inCart.qty = +qty;
  }
};
const shop = createSlice({
  name: "shop",
  initialState: [],
  reducers: {
    //them
    addToCart: (state, action) => {
      const itemCart = action.payload;
      const inCart = state.find((item) => item.id === itemCart.id);
      if (inCart) {
        inCart.qty = inCart.qty + 1;
      } else state.push({ ...itemCart, qty: 1 });
    },

    //Xoa // done
    removeFromCart: (state, action) => {
      const itemCart = action.payload;
      return state.filter((item) => item.id !== itemCart);
    },

    //chinh so luong

    adjustItemQty: {
      prepare: adjustItemQtyPrepare,
      reducer: adjustItemQtyReducer,
      // const { id, qty } = action.payload;
      // console.log(id, qty);
      // const inCart = state.find((item) => item.id === id);
      // if (inCart) {
      //   // qty += qty
      // }
      // return {
      //   ...state,
      //   shop: state.map((item) =>
      //     item.id === action.payload.id
      //       ? { ...item, qty: +action.payload.qty }
      //       : item
      //   ),
      // };
    },
  },
});

const { reducer, actions } = shop;
export const { addToCart, removeFromCart, adjustItemQty } = actions;
export default reducer;
