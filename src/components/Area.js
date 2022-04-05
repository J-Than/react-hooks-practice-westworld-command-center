import React from "react";
import "../stylesheets/Area.css";

function Area({ area }) {

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
      {/* <Segment compact>
        {/* See Checkpoint 1 item 2 in the Readme for a clue as to what goes here */}
      {/* </Segment> */}
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
