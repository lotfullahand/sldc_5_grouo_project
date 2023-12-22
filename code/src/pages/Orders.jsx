import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetchUrl } from "../utils";
import { OrdersList, ComplexPagination, SectionTitle } from "../components";

const orderQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetchUrl.get("/orders", {
        // passing params is very important here, in order for pagination to work
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("You must logged in to view orders");
      return redirect("/login");
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await queryClient.ensureQueryData(
        orderQuery(params, user)
      );
      console.log("ORDER RESPONSE", response);
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />;
  }
  return (
    <>
      <SectionTitle title="Your Orders" />
      <OrdersList />
      <ComplexPagination></ComplexPagination>
    </>
  );
};
export default Orders;
