import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import Subheader from "./Subheader";
import Text from "./Text";
import Button from "./Button";
import pluginCall from 'sketch-module-web-view/client'

import RulesForm from "./RulesForm"

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
  }

  handleSubmit(data) {
    pluginCall('saveRules', data.colors)
  }

  render() {
    return (
      <div>

        <Subheader>
          <div className="grid settings text-center">
          <a onClick={()=> this.props.history.push('list')}>←</a>
          <Text size="subheading" subdued>Settings</Text>
          <Text size="subheading" subdued> </Text>
          </div>
        </Subheader>


        <RulesForm onSubmit={this.handleSubmit}/>

        <Button onClick={() => {pluginCall('saveUser', null); this.props.history.push('list');}}>Sign Out</Button>
      </div>
    )
  }
}

export default Settings
