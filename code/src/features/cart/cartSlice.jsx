import { configureStore, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 100,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

console.log("LOCAL STORAGE", getCartFromLocalStorage());

const CartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { course } = action.payload;
      // if items in cartItems is already in cart, add them,otherwise add it as a new item.
      const item = state.cartItems.find((cou) => cou.cartID === course.cartID);
      if (item) {
        item.amount += course.amount;
      } else {
        state.cartItems.push(course);
      }
      // total number of items
      state.numItemsInCart = state.numItemsInCart + course.amount;
      // Price
      state.cartTotal = state.cartTotal + course.price * course.amount;
      // using caseReducer to the common task.
      CartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to the cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    // remove item
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const course = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= course.amount;
      state.cartTotal -= course.price * course.amount;
      CartSlice.caseReducers.calculateTotals(state);
      toast.error("Items removed from the cart");
    },

    editCart: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      CartSlice.caseReducers.calculateTotals(state);
      toast.success("Items had been Edited");
    },
    calculateTotals: (state) => {
      state.tax = 0.01 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editCart } = CartSlice.actions;
export default CartSlice.reducer;
