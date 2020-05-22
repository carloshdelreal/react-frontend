import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/UI/Map";
import Header from "./components/UI/Header";

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        position: "relative"
      }}
    >
      <Header />
      <Map />
    </div>
  );
}

export default App;
