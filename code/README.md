```js
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <Error></Error>,
  },
  {
    path: "/",
    element: <Register></Register>,
    errorElement: <Error></Error>,
  },

```

we are having the login and register along the main route because we are not going to have navbar for them.

```js
const handleTheme = () => {
  // destructuring the themes.
  const { winter, dracula } = themes;
  const newTheme = theme === winter ? dracula : winter;
  document.documentElement.setAttribute("data-theme", theme);
  setTheme(newTheme);
};
```

```js
import { useLoaderData, Link } from "react-router-dom";

const CoursesGrid = () => {
  const { courses } = useLoaderData();
  console.log(courses);
  return <h1>products</h1>;
};
export default CoursesGrid;
```

`CoursesGrid` had been used in `FeaturedCourse` and we used `FeaturedCourses` in `Landing` pages where we have defined loader function, that is why we are having access to the loader data using `useLoaderData` in `CoursesGrid`

### Single course

this is how we are having that params object that leads us to the `id` params that we passed in the `loader`, then in `gridCourse` and at last in `SingleCourse`

```js
     {
       path: "products/:id",
       element: <SingleCourse></SingleCourse>,
       loader: singleCourseLoader,
       errorElement: <ErrorElement></ErrorElement>,
     },
```

```js
        return (
          <Link
            key={course.id}
            to={`/products/${course.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
```

```js
export const loader = async ({ params }) => {
  const response = await customFetchUrl(`{/products/${params.id}}`);
  return { course: response.data.data };
};

const SingleCourse = () => {
  return <div>SingleCourses</div>;
};
```

## {Request} to filter the data based on queries we are passing.

```js
import { Pagination, Filter, CoursesContainer } from "../components";
import { customFetchUrl } from "../utils";
const url = "/products";
//  the request object represents an HTTP GET request to the URL.
// we get useful information about our request we are making to the server.
export const loader = async ({ request }) => {
  // get the parameters from the newly constructed url.
  const params = new URL(request.url).searchParams;
  // get the value of search query.
  const search = params.get("search");
  console.log("params", search);
  const response = await customFetchUrl(url);
  const courses = response.data.data;
  const meta = response.data.meta;
  console.log(request);
  return { courses, meta };
};

const Courses = () => {
  return (
    <>
      <Pagination></Pagination>
      <Filter></Filter>
      <CoursesContainer></CoursesContainer>
    </>
  );
};
export default Courses;
```

we cannot go directly with `(request.url)` .searchParams because request.url is just a string representing the URL, and it doesn't have the searchParams property. The searchParams property is specific to the URL object, which is part of the URL API in JavaScript. To work with query parameters, you need to create a URL object from the URL string using the URL constructor, and then you can access its searchParams property.
The primary purpose of the URL object is to parse and manipulate URLs in a structured manner
It provides a convenient way to access different components of a URL, such as the host, path, query parameters, and more.
.searchParams: The searchParams property of the URL object is an instance of the URLSearchParams object. It represents the query parameters (i.e., the part of the URL after the "?" character) of the URL. searchParams is an object, not an array.
searchParams Property: The searchParams property is specifically designed to work with query parameters. It provides methods for retrieving, modifying, and working with the query parameters in a URL.

#### Dynamic Approach

```js
const arrayParams = [...new URL(request.url).searchParams.entries()];
const objectParams = Object.fromEntries(arrayParams);
console.log(objectParams);
```

searchParams.entries(): The searchParams.entries() method returns an iterator of key-value pairs for the query parameters. For example, if you have query parameters like search=query and category=electronics, this method would return an iterator like [["search", "query"], ["category", "electronics"]].

Spread Operator [...]: The spread operator [...] is used to spread the elements of an iterable (in this case, the key-value pairs) into a new array. So, [...searchParams.entries()] creates an array from the iterator, resulting in arrayParams being something like [["search", "query"], ["category", "electronics"]].

Object.fromEntries(): The Object.fromEntries() method then takes an array of key-value pairs and converts it into an object. In this context, it's used to convert the arrayParams array into an object where each key-value pair becomes a property in the object

```js
Object.fromEntries([... new URL(request.url).searchParams..entries()])
```

we would be having more query parameters, hence we need to make the getting query params dynamic.

Certainly! The Array.from() method is a built-in JavaScript method used to create a new array from an iterable or array-like object. It takes two main arguments: the source iterable or array-like object and an optional mapping function that can be used to transform the elements of the source into elements of the new array. Here's a detailed explanation of how Array.from() works:

### Creating an Array with a Specified Length:

```js const length = 5;
const emptyArray = Array.from({ length });
console.log(emptyArray); // Outputs: [undefined, undefined, undefined, undefined, undefined]
```

You can also use Array.from() to create an array with a specified length filled with undefined values.

```js
const { search, pathname } = useLocation();
const navigate = useNavigate();
const handlePageChange = (pageNumber) => {
  const searchParams = new URLSearchParams(search);
  searchParams.set("page", pageNumber);
  navigate(`${pathname}?${searchParams.toString()}`);
};
```

### search

is a string that typically represents the query string portion of the current URL. For example, in the URL http://example.com?page=2&search=term, search would be "?page=2&search=term".

### search string as an argument to URLSearchParams

By passing the search string as an argument to URLSearchParams, you create a new URLSearchParams object named searchParams. This object now contains the parsed query parameters from the search string.

### URLSearchParams

is a built-in JavaScript object that provides a convenient way to work with query parameters in a URL. It allows you to parse, modify, and manipulate the query parameters easily.

### searchParams.set(key, value)

is a method of the URLSearchParams object that allows you to set or update a query parameter. In this case, it's setting the "page" query parameter to the selected pageNumber.

### useLocation:

The useLocation hook is used to access information about the current location (URL) in your React component.
It returns an object containing information such as the current pathname, search parameters, and more.

### useNavigate:

The useNavigate hook provides a function that allows you to programmatically navigate to different routes within your application.
Once you have obtained the navigate function, you can use it to navigate to different routes. You can pass a string representing the target route as an argument to
You can also use the navigate function to update the URL with query parameters or state, enabling more complex navigation scenarios.

### JSON.stringify()

JSON.stringify() is a built-in JavaScript method that converts a JavaScript object or value into a JSON (JavaScript Object Notation) string. JSON is a lightweight data interchange format that is commonly used for data exchange between a server and a web application, as well as for configuration files and other structured data storage.

it is commonly used when sending data to a server or when saving configuration settings to a file, among other use cases where you need to serialize JavaScript objects into a standardized data format.

```js
JSON.stringify(value, replacer, space);

const person = {
  name: "John",
  age: 30,
  city: "New York",
};

// Create a replacer function to include only "name" and "age" properties
const jsonString = JSON.stringify(person, ["name", "age"]);

console.log(jsonString);
// Output: {"name":"John","age":30}

const person = {
  name: "John",
  age: 30,
  city: "New York",
};

// Create a replacer function to include only "name" and "age" properties
const jsonString = JSON.stringify(person, ["name", "age"]);

console.log(jsonString);
// Output: {"name":"John","age":30}

const person = {
  name: "John",
  age: 30,
  city: "New York",
};

// Add indentation for readability
const jsonString = JSON.stringify(person, null, 2);

console.log(jsonString);
// Output:
// {
//   "name": "John",
//   "age": 30,
//   "city": "New York"
// }
```

#### Status

400: means, we might have missed something important while submitting the form.
401: means, un-authorize request, missing something in headers.
403: the server has determined that the client does not have the necessary permissions to access the requested resource.
