import React from "react";
import "./Dropdown.css";
function Dropdown() {
  return (
    <div class="search-box">
      <input class="search-text" type="text" placeholder="Search Anything" />
      <a href="#" class="search-btn">
        <i class="fas fa-search"></i>
      </a>
    </div>
  );
}

export default Dropdown;
