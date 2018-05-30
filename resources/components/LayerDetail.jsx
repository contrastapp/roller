import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import pluginCall from 'sketch-module-web-view/client'
import SuggestionContainer from '../containers/SuggestionsContainer';

class LayerDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let suggestions = <SuggestionContainer {...this.props.layerCompliance} />
      return (
        <div>
          <h1>{this.props.layerCompliance.name}</h1>
          <button onClick={() => pluginCall('selectLayer', this.props.layerCompliance.id)}>Go to layer ></button>
          <button onClick={this.props.prev}>Previous</button>
          {this.props.page} of {this.props.pages}
          <button onClick={this.props.next}>Next</button>
          <div>
            <div>Category: {this.props.layerCompliance.category}</div>
            <div>{this.props.layerCompliance.compliant ? 'Compliant' : 'Non Compliant'}</div>
            <div style={{'backgroundColor' : this.props.layerCompliance.primary}}>{this.props.layerCompliance.primary}</div>
            <div>Property: {this.props.layerCompliance.prop}</div>
            {suggestions}
          </div>
        </div>
      )
  }
}
export default LayerDetail
