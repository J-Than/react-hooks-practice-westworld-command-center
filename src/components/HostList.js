import React from "react";
import Host from "./Host"
import { Card } from "semantic-ui-react";

function HostList({ hosts, selectedHost, onSelectHost }) {
  return (
    <Card.Group itemsPerRow={6}>
      {
        hosts.map(host => <Host key={host.id} host={host} selectedHost={selectedHost} onSelectHost={onSelectHost} />)
      }
    </Card.Group>
  );
}

export default HostList;
