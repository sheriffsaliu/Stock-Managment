import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(){
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">Simventory</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <NavLink to="/" className="p-2 text-dark" >Dashboard</NavLink>
          <NavLink to="/brands" className="p-2 text-dark" href="#">Brand</NavLink>
          <NavLink to ="/categories" className="p-2 text-dark" href="#">Category</NavLink>
          <a className="p-2 text-dark" href="#">Product</a>
          <a className="p-2 text-dark" href="#">Orders</a>
          <a className="p-2 text-dark" href="#">Report</a>
        </nav>
        <a className="btn btn-outline-primary" href="#">Sign up</a>
      </div>
    );
  }

  export default Navbar;