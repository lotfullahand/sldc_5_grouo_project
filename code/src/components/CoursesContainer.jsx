import CoursesList from "./CoursesList";
import CoursesGrid from "./CoursesGrid";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
const CoursesContainer = () => {
  const { meta } = useLoaderData();

  const totalCourses = meta.pagination.total;
  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? `btn-primary text-primary-content`
        : `btn-ghost text-based-content`
    }`;
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalCourses} product{totalCourses > 1 && `s`}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill></BsFillGridFill>
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            className={setActiveStyles("list")}
          >
            <BsList></BsList>
          </button>
        </div>
        {/* PRODUCTS */}
      </div>
      <div>
        {totalCourses === 0 ? (
          <h4 className="text-2xl mt-16:">
            No courses matched your search....
          </h4>
        ) : layout === "grid" ? (
          <CoursesGrid></CoursesGrid>
        ) : (
          <CoursesList></CoursesList>
        )}
      </div>
    </>
  );
};
export default CoursesContainer;
