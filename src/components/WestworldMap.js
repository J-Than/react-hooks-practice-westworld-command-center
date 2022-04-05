import React from "react";
import Area from "./Area";
import { Segment } from "semantic-ui-react";

function WestworldMap({ areas }) {
  return <Segment id="map">
    {
      areas.map(area => <Area key={area.id} area={area} />)
    }
  </Segment>;
}

export default WestworldMap;
