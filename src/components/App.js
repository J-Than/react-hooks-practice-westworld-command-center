import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import "../stylesheets/App.css";

const API = "http://localhost:3001/"

function App() {

  const [areas, setAreas] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [selectedHost, setSelectedHost] = useState(undefined)

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

  function updateSelectedHost(newHost) {
    setSelectedHost(newHost);
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} selectedHost={selectedHost} onSelectHost={updateSelectedHost} />
      <Headquarters hosts={hosts} selectedHost={selectedHost} onSelectHost={updateSelectedHost} />
    </Segment>
  );
}

export default App;
