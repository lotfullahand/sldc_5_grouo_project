import { CartItemsList, CartTotals, SectionTitle } from "../components";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
const Cart = () => {
  const user = null;

  const numItems = useSelector((state) => state.cartState.numItemsInCart);
  if (numItems === 0) {
    return <SectionTitle title="Your Cart is Empty"></SectionTitle>;
  }
  return (
    <>
      <SectionTitle text="Shopping Cart"></SectionTitle>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList></CartItemsList>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals></CartTotals>
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              proceed to checkout
            </Link>
          ) : (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
