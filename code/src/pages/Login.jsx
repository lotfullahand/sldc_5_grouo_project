import { CartTotals, FormInput, SubmitBtn } from "../components";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetchUrl } from "../utils";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetchUrl.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      console.log("response", response);
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "double check, you might forgot to add the name property to your inputs";

      console.log(errorMessage);
      return null;
    }
  };
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GuestUserLogin = async () => {
    try {
      const response = await customFetchUrl.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("logged in as guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("error occurred");
      return null;
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center font-bold text-3xl">Login</h4>
        <FormInput type="email" label="email" name="identifier"></FormInput>
        <FormInput type="password" label="password" name="password"></FormInput>
        <div className="">
          <SubmitBtn text="login"></SubmitBtn>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={GuestUserLogin}
        >
          Guest user
        </button>
        <p className="text-center">
          Not registered yet?
          <Link
            to="/register"
            className="ml-4 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
