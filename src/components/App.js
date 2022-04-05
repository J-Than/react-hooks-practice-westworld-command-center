import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import "../stylesheets/App.css";

function App() {

  const [areas, setAreas] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [selectedHost, setSelectedHost] = useState(undefined)
  let selectedHostUpdates;

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

  function syncSelectedHost() {
    fetch(`http://localhost:3001/hosts/${selectedHost.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedHostUpdates)
    })
    .then(r => r.json())
    .then(data => {
      const updateHosts = [...hosts];
      const found = updateHosts.find(h => h.id===data.id);
      const index = updateHosts.indexOf(found);
      updateHosts[index] = data;
      setHosts(updateHosts);
      setSelectedHost(data);
    })
  }

  function handleActiveSwitch() {
    selectedHostUpdates = {...selectedHost, active: !selectedHost.active}
    syncSelectedHost();
  }

  function handleCurrentArea(selectedArea) {
    selectedHostUpdates = {...selectedHost, area: selectedArea}
    syncSelectedHost();
  }

  return (
    <Segment id="app">
      <WestworldMap
        areas={areas}
        hosts={hosts}
        selectedHost={selectedHost}
        onSelectHost={updateSelectedHost}
      />
      <Headquarters
        areas={areas}
        hosts={hosts}
        selectedHost={selectedHost}
        onSelectHost={updateSelectedHost}
        onActivation={handleActiveSwitch}
        onAreaChange={handleCurrentArea}
      />
    </Segment>
  );
}

export default App;
