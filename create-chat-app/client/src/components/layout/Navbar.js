import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        credentials: "include",
      });
      const data = res.json();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const menu = user ? <SignedInMenu logout={logout} /> : <SignedOutMenu />;
  return (
    <>
      <nav className="green">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            Chat
          </a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {menu}
          </ul>
        </div>
      </nav>
      <ul class="sidenav" id="mobile-demo">
        {menu}
      </ul>
    </>
  );
};

export default Navbar;
