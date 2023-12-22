import { Link } from "react-router-dom";
import { useState } from "react";
import { customFetchUrl, formatPrice, generateSelectOption } from "../utils";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleCourseQuery = (id) => {
  return {
    queryKey: ["singleCourse", id],
    queryFn: () => customFetchUrl(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleCourseQuery(params.id)
    );
    return { course: response.data.data };
  };

const SingleCourse = () => {
  const { course } = useLoaderData();
  const { image, title, description, price, colors, company } =
    course.attributes;
  const [courseColor, setCourseColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };
  // add the item to the cart.
  const cartProduct = {
    // adding `cartID` so that items with different ID will be treated as different co
    cartID: course.id + courseColor,
    productID: course.id,
    image,
    title,
    price,
    company,
    courseColor,
    amount,
  };
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ course: cartProduct }));
  };

  const dollarsAmount = formatPrice(price);

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
      </div>
      <div className="grid  mt-8 gap-y-8  lg:grid-cols-2 gap-x-16">
        <img
          src={image}
          alt={title}
          className=" h-96 object-cover rounded-lg w-full lg:w-full"
        ></img>
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl ">{dollarsAmount}</p>
          <p className="mt-4 leading-8 tracking-wider">{description}</p>
          <div className="mt-4">
            <div className="mt-4">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === courseColor && `border-2 border-secondary`
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCourseColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateSelectOption(8)}
            </select>
          </div>
          <div className="mt-8">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleCourse;
