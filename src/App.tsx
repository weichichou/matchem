import React from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <Card id={1} index={1} fold={true} img={"sometext"} />
    </div>
  );
}

export default App;
