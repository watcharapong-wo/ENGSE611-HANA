// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RestaurantList from "./components/RestaurantList.jsx";
import RestaurantDetail from "./pages/RestaurantDetail.jsx";
import "./App.css";

export default function App(){
  return (
    <BrowserRouter>
      <div className="container">
        <header style={{padding:"18px 0", display:"flex", alignItems:"center", gap:12}}>
          <Link to="/" style={{textDecoration:"none"}}><h1>🍽️ Restaurant Reviews</h1></Link>
          <div className="sub">Express API + React</div>
        </header>

        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
