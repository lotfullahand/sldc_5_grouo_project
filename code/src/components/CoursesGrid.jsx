import { useLoaderData, Link } from "react-router-dom";
import { formatPrice } from "../utils";

const CoursesGrid = () => {
  const { courses } = useLoaderData();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const { image, title, price } = course.attributes;
        const dollarsAmount = formatPrice(price);

        return (
          <Link
            key={course.id}
            to={`/products/${course.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              ></img>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">{dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default CoursesGrid;
