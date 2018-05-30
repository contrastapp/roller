import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import pluginCall from 'sketch-module-web-view/client'

class Layer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <button onClick={()=> this.props.history.push('list')}>Home</button>
        <h1>Settings</h1>
        <h1>Colors</h1>
        { _.map(this.props.rules.colors, (color) => <div>{color}</div>) }
      </div>
    )
  }
}

export default Layer
