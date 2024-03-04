// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData.js';
import "../App.css";

function Sidebar() {
  return (
    <div className='Sidebar'>
      {SidebarData.map((item, index) => (
        <Link to={item.link} key={index} className='SidebarItem'>
          {React.cloneElement(item.icon, { style: { fontSize: 45 } })}
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
