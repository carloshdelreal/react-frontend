import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/UI/Map";

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        position: "relative",
      }}
    >
      <Map />
    </div>
  );
}

export default App;
