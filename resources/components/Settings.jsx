import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import Subheader from "./Subheader";
import Text from "./Text";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPowerOff }  from '@fortawesome/fontawesome-free-solid'
import Button from "./Button";
import pluginCall from 'sketch-module-web-view/client'
import { connect } from 'react-redux'

import RulesForm from "./RulesForm"

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.back = this.back.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  back() {
    this.props.history.push('list');
    this.props.saved(false)
  }

  signOut() {
    pluginCall('saveUser', null);
    this.props.history.push('list');
  }

  handleSubmit(data) {
    if (!window.mock) {
      let colors = _.reject(data.colors, _.isEmpty)
      pluginCall('saveRules', colors)

      if (colors.length > 0 && !_.isEqual(this.props.rules.colors,colors)) {
        this.props.saved(true)
      } else {
        this.props.saved(false)
      }
    }
  }

  render() {
    return (
      <div>

        <Subheader>
          <div className="grid settings text-center">
          <a onClick={this.back}>←</a>
          <Text size="subheading" subdued>Settings</Text>
          <a onClick={this.signOut}>
            <FontAwesomeIcon icon={faPowerOff } />
          </a>
          </div>
        </Subheader>


        <RulesForm savedAction={this.props.saved} onSubmit={this.handleSubmit}/>

      </div>
    )
  }
}

export default Settings
