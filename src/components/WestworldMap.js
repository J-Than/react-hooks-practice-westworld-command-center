import React from "react";
import Area from "./Area";
import { Segment } from "semantic-ui-react";

function WestworldMap({ areas, hosts, selectedHost, onSelectHost }) {

  return <Segment id="map">
    {
      areas.map(area => <Area key={area.id} area={area} hosts={hosts} selectedHost={selectedHost} onSelectHost={onSelectHost} />)
    }
  </Segment>;
}

export default WestworldMap;
