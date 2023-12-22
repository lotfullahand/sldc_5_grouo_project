import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h3 className="text-5xl text-primary">404</h3>
          <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-7">
            the page you are looking is not in our website, once look back
          </p>

          <div className="mt-10">
            <Link to="/" className="btn btn-secondary">
              back home
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center text-4xl font-bold">There was an error</h4>
    </main>
  );
};
export default Error;
