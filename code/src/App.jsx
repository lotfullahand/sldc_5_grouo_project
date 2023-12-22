import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Checkout,
  Cart,
  HomeLayout,
  Landing,
  Register,
  Login,
  Orders,
  Courses,
  SingleCourse,
  Error,
} from "./pages";
import { ErrorElement } from "./components";

// loaders
import { loader as LandingLoader } from "./pages/Landing";
import { loader as singleCourseLoader } from "./pages/SingleCourse";
import { loader as CoursesLoader } from "./pages/Courses";
import { loader as CheckoutLoader } from "./pages/Checkout";
import { loader as OrdersLoader } from "./pages/Orders";
// actions
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { action as CheckoutAction } from "./components/CheckoutForm";
// store
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>,
        loader: LandingLoader(queryClient),
        errorElement: <ErrorElement></ErrorElement>,
      },
      {
        element: <Courses></Courses>,
        path: "courses",
        loader: CoursesLoader(queryClient),
        errorElement: <ErrorElement></ErrorElement>,
      },
      {
        element: <SingleCourse></SingleCourse>,
        path: "products/:id",
        loader: singleCourseLoader(queryClient),
        errorElement: <ErrorElement></ErrorElement>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },

      {
        path: "checkout",
        element: <Checkout></Checkout>,
        loader: CheckoutLoader(store),
        action: CheckoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: OrdersLoader(store, queryClient),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <Error></Error>,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <Register></Register>,
    errorElement: <Error></Error>,
    action: RegisterAction,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>;
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
};

export default App;
