import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import Subheader from "./Subheader";
import Text from "./Text";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPowerOff }  from '@fortawesome/fontawesome-free-solid'
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
          <a onClick={() => {pluginCall('saveUser', null); this.props.history.push('list');}}>
            <FontAwesomeIcon icon={faPowerOff } />
          </a>
          </div>
        </Subheader>


        <RulesForm onSubmit={this.handleSubmit}/>

      </div>
    )
  }
}

export default Settings
