import { useLoaderData, Link, Form } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckBox from "./FormCheckBox";
const Filter = () => {
  const { meta, arrayParams } = useLoaderData();
  const { search, category, company, price, order, shipping } = arrayParams;
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search courses"
        name="search"
        size="input-sm"
        defaultValue={search}
      ></FormInput>

      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={company}
      ></FormSelect>
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="categories"
        list={meta.categories}
        size="select-sm"
        defaultValue={category}
      ></FormSelect>
      {/* ORDERS */}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={order}
      ></FormSelect>
      {/* PRICE */}
      <FormRange
        label="Price"
        name="select price"
        size="range-sm"
        defaultValue={price}
      ></FormRange>
      {/* FORM CHECKBOX */}
      <FormCheckBox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      ></FormCheckBox>
      {/* BUTTONS */}
      <button type="submit " className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/courses" className="btn btn-accent btn-sm">
        clear
      </Link>
    </Form>
  );
};
export default Filter;
