import React from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({ areas, selectedHost, onActivation, onAreaChange }) {

  const options = areas.map((area) => ({ key: area.name, text: area.displayName, value: area.name }))

  function handleOptionChange(e, { value }) {
    onAreaChange(value)
  }

  function handleRadioChange() {
    onActivation();
  }

  let fullName = selectedHost.firstName;
  fullName = fullName.concat("", selectedHost.lastName==="n/a" ? "" : ` ${selectedHost.lastName}`)

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {fullName} | 
              {selectedHost.gender==="Male" ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={handleRadioChange}
                label={selectedHost.active ? "Active" : "Decommissioned"}
                checked={selectedHost.active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={selectedHost.area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
