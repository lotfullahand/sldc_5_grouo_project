import { Pagination, Filter, CoursesContainer } from "../components";
import { customFetchUrl } from "../utils";
const url = "/products";
//  the request object represents an HTTP GET request to the URL.
// we get useful information about our request we are making to the server.

const allCoursesQuery = (queryParams) => {
  const { search, category, company, sort, price, page } =
    queryParams;

  return {
    queryKey: [
      "courses",
      search ?? "",
      company ?? "all",
      category ?? "all",
      sort ?? "a-z",
      price ?? 10000,
      page ?? 1,
    ],
    queryFn: () => customFetchUrl(url, { params: queryParams }),
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const arrayParams = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(
      allCoursesQuery(arrayParams)
    );
    const courses = response.data.data;
    const meta = response.data.meta;
    return { courses, meta, arrayParams };
  };

const Courses = () => {
  return (
    <>
      <Filter></Filter>
      <CoursesContainer></CoursesContainer>
      <Pagination></Pagination>
    </>
  );
};
export default Courses;
