import React from "react";
import { Grid } from "semantic-ui-react";
import ColdStorage from "./ColdStorage";
import Details from "./Details";
import LogPanel from "./LogPanel";
import "../stylesheets/Headquarters.css";

function Headquarters({ areas, hosts, selectedHost, onSelectHost, onActivation, onAreaChange }) {

  function areaCheck(area) {
    const hostsInArea = hosts.filter(h => h.area===area).length;
    const areaToCheck = areas.find(a => a.name===area);
    if (hostsInArea < areaToCheck.limit) {
      onAreaChange(area);
    } else {
      console.log("ERROR: Too many hosts.")
    }
  }

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} selectedHost={selectedHost} onSelectHost={onSelectHost} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details areas={areas} selectedHost={selectedHost} onActivation={onActivation} onAreaChange={areaCheck} />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
