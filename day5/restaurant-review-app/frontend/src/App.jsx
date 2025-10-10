import React from "react";
import RestaurantList from "./components/RestaurantList.jsx";
import "./App.css";

export default function App(){
  return (
    <div className="container">
      <header style={{padding:"18px 0"}}>
        <h1>🍽️ Restaurant Reviews</h1>
        <div className="sub">Full-stack demo — Express API + React</div>
      </header>
      <RestaurantList />
    </div>
  );
}
