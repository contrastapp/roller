import React from "react"
import { connect } from 'react-redux';
import pluginCall from "sketch-module-web-view/client"
import LayersContainer from './containers/LayersContainer'

class Test extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container settings">
        <LayersContainer />
      </div>
    )
  }
}

export default Test
