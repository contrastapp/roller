import React from "react"
import Modal from 'react-modal';
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
import RulesDropZone from './RulesDropZone';
import Papa from 'papaparse';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.back = this.back.bind(this)
    this.signOut = this.signOut.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onComplete = this.onComplete.bind(this)

    this.state = {signOutModal: false, csvError: null}
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
      this.props.saved(false)
      let colors = _.reject(data.colors, _.isEmpty)
      pluginCall('saveRules', data.colors)

      // if (colors.length > 0 && !_.isEqual(this.props.rules.colors,colors)) {
      //   this.props.saved(true)
      // } else {
      //   this.props.saved(false)
      // }
    }
  }

  onComplete(data) {
    validHeaders = _.isEqual(data.meta.fields.sort(),['name','hex'].sort())
    if (validHeaders) {
      this.setState({csvError: null})
      if(!window.mock) {
        pluginCall('saveRules', data.data)
      }
    } else {
      this.setState({csvError: 'Please format CSV with headers: name, hex'})
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    Papa.parse(acceptedFiles[0], {header: true, complete: this.onComplete});
  }


  render() {
    const customStyles = {
      content : {
        top: '0',
        left: '0',
        marginRight: '0',
        width: '100%',
        height: '100%',
        padding: '0',
        border: 'none',
      }
    };
    return (
      <div>
        <Modal
          isOpen={this.state.signOutModal}
          style={customStyles}
        >
        <div className="mt60">
          <div className="p24">
            <Button size="full" style="default" onClick={this.signOut}>
              Sign Out
            </Button>
          </div>
          <div className="p24">
            <Button size="full" style="primary" onClick={() => this.setState({signOutModal: false})}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

        <Subheader>
          <div className="grid settings text-center">
          <a onClick={this.back}>←</a>
          <Text size="subheading" subdued>Settings</Text>
          <a onClick={() => this.setState({signOutModal: true})}>
            <FontAwesomeIcon icon={faPowerOff } />
          </a>
          </div>
        </Subheader>
        <RulesDropZone />



        <RulesForm savedAction={this.props.saved} onSubmit={this.handleSubmit}/>

      </div>
    )
  }
}

export default Settings
