import React from "react"
import Modal from 'react-modal';
import tinycolor from "tinycolor2"
import _ from "lodash"
import Subheader from "./Subheader";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Button from "./Button";
import pluginCall from 'sketch-module-web-view/client'
import { connect } from 'react-redux'
import { faArrowDown }  from '@fortawesome/fontawesome-free-solid'
import Text from "./Text";

import RulesForm from "./RulesForm"
import Dropzone from 'react-dropzone'
import Papa from 'papaparse';

class RulesDropZone extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
    this.onComplete = this.onComplete.bind(this)

    this.state = {csvError: null}
  }

  onComplete(data) {
    validHeaders = _.isEqual(data.meta.fields.sort(),['name','hex'].sort())
    if (validHeaders) {
      this.setState({csvError: null})
      if(!window.mock) {
        pluginCall('saveRules', data.data)
        this.props.onComplete()
      }
    } else {
      this.setState({csvError: 'Please format CSV with headers: name, hex'})
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    Papa.parse(acceptedFiles[0], {header: true, complete: this.onComplete});
  }


  render() {
    return (
      <div >
        <div >
          <Dropzone
            accept=".csv"
            style={{padding: '24px', border: '1px dashed gray'}}
            onDrop={this.onDrop}
          >
            <div className='text-center'>
              Drag and drop a CSV <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </Dropzone>
          <div className="pt24 text-center ">
            <div className="pb12">
              <Text size="body" subdued>
                Please format the csv like this
              </Text>
            </div>
            <div className="text-center flex flexjcc">
              <table className="rules-csv-example">
                <th> name </th>
                <th> hex </th>
                <tr>
                  <td> Black </td>
                  <td> #000000 </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        {this.state.csvError}
      </div>
    )
  }
}

export default RulesDropZone
