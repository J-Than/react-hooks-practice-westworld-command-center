import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, selectedHost, onSelectHost }) {

  let selected = false;
  
  if (selectedHost!==undefined) {
    selected = selectedHost.id===host.id
  }

  function handleHostClick() {
    onSelectHost(host)
  }

  return (
    <Card
      className={selected ? "host selected" : "host"}
      onClick={handleHostClick}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
