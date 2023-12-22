import { Link, Form, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetchUrl } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetchUrl.post("/auth/local/register", data);
    toast.success("USER REGISTERED SUCCESSFULLY");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || "Please double check";
    toast.error("COULD NOT REGISTERED");
    console.log(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className=" card w-96 flex flex-col mt-4 shadow-lg bg-base-300 p-8 gap-y-2"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          label="name"
          type="text"
          placeholder="user name"
          name="username"
          defaultValue="ah12mad"
        ></FormInput>
        <FormInput
          label="email"
          type="email"
          placeholder="email"
          name="email"
          defaultValue="ahma12d@gmail.com"
        ></FormInput>
        <FormInput
          label="password"
          type="password"
          placeholder="password"
          name="password"
          defaultValue="secret"
        ></FormInput>
        <div className="mt-4">
          <SubmitBtn text="register"></SubmitBtn>
        </div>
        <p className="mt-4 text-center">
          <span>already registered, go to </span>
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
