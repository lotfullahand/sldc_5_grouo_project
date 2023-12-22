import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  return <h1 className="font-bold">error....</h1>;
};
export default ErrorElement;
