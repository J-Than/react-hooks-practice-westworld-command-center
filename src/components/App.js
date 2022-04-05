import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import "../stylesheets/App.css";

function App() {

  const [areas, setAreas] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [selectedHost, setSelectedHost] = useState(undefined)

  useEffect(() => {
    fetch("http://localhost:3001/areas")
    .then(r => r.json())
    .then(data => setAreas(data))
  }, [])

  useEffect(() => {
    fetch("http://localhost:3001/hosts")
    .then(r => r.json())
    .then(data => setHosts(data))
  }, [])

  function updateSelectedHost(newHost) {
    setSelectedHost(newHost);
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} selectedHost={selectedHost} onSelectHost={updateSelectedHost} />
      <Headquarters areas={areas} hosts={hosts} selectedHost={selectedHost} onSelectHost={updateSelectedHost} />
    </Segment>
  );
}

export default App;
