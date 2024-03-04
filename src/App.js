// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./router";
import './App.css';
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import bootstrap from 'bootstrap'

function App() {
  return (
    <div className="container-fluid">
      <Router>
        
        <div>
          
          <Routes>
            {router.routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
