import { useLoaderData, Link } from "react-router-dom";
import { formatPrice } from "../utils";

const CoursesList = () => {
  const { courses } = useLoaderData();
  console.log(courses);
  return (
    <div className="mt-12 gap-y-8 grid">
      {courses.map((course) => {
        const { image, title, price, company } = course.attributes;
        const dollarsAmount = formatPrice(price);
        console.log(course.id);
        return (
          <Link
            key={courses.id}
            to={`/products/${course.id}`}
            className="p-4 rounded-md flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={image}
              alt={title}
              className="h-28 w-32 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            ></img>
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h3 className="capitalize font-medium text-neutral-content text-md">
                {company}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default CoursesList;
