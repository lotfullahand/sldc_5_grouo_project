import { NavLink } from "react-router-dom";
const NavLinks = () => {
  const Links = [
    { id: 1, url: "/", text: "home" },
    {
      id: 2,
      url: "/about",
      text: "about",
    },
    {
      id: 3,
      url: "/courses",
      text: "courses",
    },
    {
      id: 4,
      url: "/cart",
      text: "cart",
    },
    {
      id: 5,
      url: "/checkout",
      text: "checkout",
    },
    {
      id: 6,
      url: "/orders",
      text: "orders",
    },
  ];

  return (
    <>
      {Links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink to={url} className="capitalize py-2">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
