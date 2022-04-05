import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import "../stylesheets/App.css";

const API = "http://localhost:3001/"

function App() {

  const [areas, setAreas] = useState([]);
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    fetch(`${API}areas`)
    .then(r => r.json())
    .then(data => setAreas(data))
  }, [])

  useEffect(() => {
    fetch(`${API}hosts`)
    .then(r => r.json())
    .then(data => setHosts(data))
  }, [])

  return (
    <Segment id="app">
      <WestworldMap areas={areas} />
      <Headquarters />
    </Segment>
  );
}

export default App;
