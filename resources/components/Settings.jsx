import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import pluginCall from 'sketch-module-web-view/client'

import RulesForm from "./RulesForm"

class Layer extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // pluginCall('setRules')
  }

  handleSubmit(data) {
    pluginCall('saveRules', data.colors)
  }

  render() {
    return (
      <div>
        <button onClick={()=> this.props.history.push('list')}>Home</button>
        <button onClick={this.loadForm}>LOAD</button>
        <h1>Settings</h1>
        <h1>Colors</h1>
        <RulesForm onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default Layer
