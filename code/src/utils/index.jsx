import axios from "axios";
const productionUrl = "https://strapi-store-server.onrender.com/api";
export const customFetchUrl = axios.create({
  baseURL: productionUrl,
});
export const formatPrice = (price) => {
  const dollars = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollars;
};

// function to generate the select options

export const generateSelectOption = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option value={amount} key={amount}>
        {amount}
      </option>
    );
  });
};
