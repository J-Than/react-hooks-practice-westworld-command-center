import React from "react";
import { Segment, Image } from "semantic-ui-react";
import HostInfo from "./HostInfo";
import * as Images from "../services/Images";

function Details({ areas, selectedHost, onActivation, onAreaChange }) {

  return (
    <Segment id="details" className="HQComps">
      {selectedHost===undefined ?
        <Image size="medium" src={Images.westworldLogo} /> :
        <HostInfo areas={areas} selectedHost={selectedHost} onActivation={onActivation} onAreaChange={onAreaChange} />
      }
    </Segment>
  );
}

export default Details;
