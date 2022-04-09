import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({ activate, onActivateAll, logs }) {

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      <Button
        fluid color={activate ? "green" : "red"}
        content={activate ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        onClick={onActivateAll}
      />
    </Segment>
  );
}

export default LogPanel;
