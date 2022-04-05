import React from "react";
import HostList from "./HostList";
import "../stylesheets/Area.css";

function Area({ area, hosts, selectedHost, onSelectHost }) {

  const currentHosts = hosts.filter(host => host.active && host.area===area.name)

  function titleCaseLabel() {
    let label = area.name.replace("_", " ")
    return label.replace(
      /\w\S*/g,
      function(text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
      }
    );
  }

  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
        {titleCaseLabel()}
      </h3>
      <HostList hosts={currentHosts} selectedHost={selectedHost} onSelectHost={onSelectHost} />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
