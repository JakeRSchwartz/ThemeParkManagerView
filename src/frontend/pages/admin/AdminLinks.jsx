import React from "react";
import "../../styles/customer.styles/Links.css";

function Links() {
  return (
    <nav className="CustomerLinks">
      {}
      <ul className="CustomerLinksUl">
        <li className="CustomerLinks-ul-li">
          <a href="http://localhost:5173/login">Home</a>
        </li>
        <li className="CustomerLinks-ul-li">
          <a href="http://localhost:5173/about">About</a>
        </li>
        <li className="CustomerLinks-ul-li">
          <a href="http://localhost:5173/login">Sign Out</a>
        </li>
      </ul>
    </nav>
  );
}

export default Links;
