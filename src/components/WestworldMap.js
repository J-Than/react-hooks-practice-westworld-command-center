import React from "react";
import Area from "./Area";
import { Segment } from "semantic-ui-react";

function WestworldMap({ areas, hosts, selectedHost, onSelectHost }) {

  if (areas===undefined) {
    areas = [{id: 1, name: "Loading"}]
  }

  return <Segment id="map">
    {
      areas.map(area => <Area
        key={area.id}
        area={area}
        hosts={hosts}
        selectedHost={selectedHost}
        onSelectHost={onSelectHost}
      />)
    }
  </Segment>;
}

export default WestworldMap;
