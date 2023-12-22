import { Hero, FeaturedCourses } from "../components";
import { customFetchUrl } from "../utils";
const url = "/products?featured=true";

const featuredCourseQuery = {
  queryKey: ["featuredCourses"],
  queryFn: () => customFetchUrl(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredCourseQuery);
  const courses = response.data.data;
  return { courses };
};

const Landing = () => {
  return (
    <>
      <Hero></Hero>
      <FeaturedCourses></FeaturedCourses>
    </>
  );
};
export default Landing;
