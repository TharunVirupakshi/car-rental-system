// Navigation.js (a separate component or part of App.js)
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/car-listing">Car Listing</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/payment">Payment</Link></li>
        {/* Add more links for other pages */}
      </ul>
    </nav>
  );
};

export default Navbar;