import React from "react";
import HostList from "./HostList";
import { Segment } from "semantic-ui-react";

function ColdStorage({ hosts, selectedHost, onSelectHost }) {

  const currentHosts = hosts.filter(host => !host.active)

  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList hosts={currentHosts} selectedHost={selectedHost} onSelectHost={onSelectHost} />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
