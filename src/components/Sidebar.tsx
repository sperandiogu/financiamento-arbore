import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="https://arboreengenharia.com.br/wp-content/uploads/2022/11/logo-arbore-animado.gif" alt="Logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#orders">Orders</a></li>
          <li><a href="#analytics">Analytics</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#collections">Collections</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#discounts">Discounts</a></li>
          <li><a href="#employees">Employees</a></li>
          <li><a href="#customers">Customers</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
