import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import { Log } from "../services/Log";
import "../stylesheets/App.css";

let hostIterator = -2;

function App() {

  const [areas, setAreas] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [selectedHost, setSelectedHost] = useState(undefined);
  const [activate, setActivate] = useState(false);
  const [logs, setLogs] = useState([]);
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

  if (hostIterator >= 0) {setTimeout(handleActivateIteration, 50)}
  else if (hostIterator === -2) {
    if (selectedHost !== undefined) {syncSelectedHost()}
    hostIterator++;
  }

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

  function handleActivateAll() {
    if (!activate) {
      setLogs([(Log.warn("Activating all hosts!")), ...logs ]);
    } else {
      setLogs([(Log.notify("Decommissioning all hosts!")), ...logs ]);
    }
    setActivate(activate => activate = !activate)
    hostIterator++
  }

  function handleActivateIteration() {
    if (hostIterator < hosts.length && hostIterator > -1) {
      if (hosts[hostIterator].active !== activate) {
        fetch(`http://localhost:3001/hosts/${hosts[hostIterator].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({...hosts[hostIterator], active: activate})
        })
        .then(r => r.json())
        .then(data => {
          const updateHosts = [...hosts];
          const found = updateHosts.find(h => h.id===data.id);
          const index = updateHosts.indexOf(found);
          updateHosts[index] = data;
          hostIterator < hosts.length-1 ? hostIterator++ : hostIterator = -2;
          setHosts(updateHosts);
        })
      } else {
        hostIterator < hosts.length-1 ? hostIterator++ : hostIterator = -2;
        if (hostIterator >= 0) {handleActivateIteration()}
      }
    } else { hostIterator = -2 }
  }

  function handleActiveSwitch() {
    selectedHostUpdates = {...selectedHost, active: !selectedHost.active};
    if (!selectedHost.active) {
      setLogs([(Log.warn(`Activated ${selectedHost.firstName}`)), ...logs ]);
    } else {
      setLogs([(Log.notify(`Decommissioned ${selectedHost.firstName}`)), ...logs ]);
    }
    syncSelectedHost();
  }

  function handleAreaCheck(selectedArea) {
    const hostsInArea = hosts.filter(h => h.area===selectedArea).length;
    const areaToCheck = areas.find(a => a.name===selectedArea);
    if (hostsInArea < areaToCheck.limit) {
      handleCurrentArea(selectedArea);
    } else {
      setLogs([(Log.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${areas[areas.indexOf(areas.find(ar => ar.name===selectedArea))].displayName}`)), ...logs ]);
    }
  }

  function handleCurrentArea(selectedArea) {
    selectedHostUpdates = {...selectedHost, area: selectedArea};
    setLogs([(Log.notify(`${selectedHost.firstName} set in area ${areas[areas.indexOf(areas.find(ar => ar.name===selectedArea))].displayName}`)), ...logs ]);
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
        activate={activate}
        selectedHost={selectedHost}
        onSelectHost={updateSelectedHost}
        onActivation={handleActiveSwitch}
        onAreaChange={handleAreaCheck}
        onActivateAll={handleActivateAll}
        logs={logs}
      />
    </Segment>
  );
}

export default App;
