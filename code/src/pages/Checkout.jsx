import { CartTotals, CheckoutForm } from "../components";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { store } from "../store";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  // retrieve the current state of the Redux store.
  const user = store.getState().userState.user;
  console.log("USER", user);
  if (!user) {
    toast.warn("You must be logged in");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartItems = useSelector((state) => state.cartState.cartTotal);
  if (cartItems === 0) {
    return <SectionTitle title="Your Cart is empty"></SectionTitle>;
  }
  return (
    <>
      <SectionTitle title="Place your order"></SectionTitle>
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm></CheckoutForm>
        <CartTotals></CartTotals>
      </div>
    </>
  );
};
export default Checkout;
