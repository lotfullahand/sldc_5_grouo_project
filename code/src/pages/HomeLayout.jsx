import { Outlet } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
import { useNavigation } from "react-router-dom";
import { Container } from "postcss";
const HomeLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <section className="align-element py-20">
          <Outlet></Outlet>
        </section>
      )}
    </>
  );
};
export default HomeLayout;
