import React from "react"
import tinycolor from "tinycolor2"
import Paginate from "./Paginate";
import Subheader from "./Subheader";
import Text from "./Text";
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
        <div className="lint-detail">

          <div className="flex flexjcc p48">
            <div className="swatch" style={{'backgroundColor' : this.props.layerCompliance.primary}}>  </div>
          </div>

          <Paginate prev={this.props.prev} page={this.props.page} pages={this.props.pages} next={this.props.next}/>

          <Subheader>Properties</Subheader>


          <div className="p16">

            <Text size="subheading" subdued>CSS</Text>
            {this.props.layerCompliance.primary}

            <Text size="subheading" subdued>Layer Name</Text>
            <a onClick={() => pluginCall('selectLayer', this.props.layerCompliance.id)}>
              {this.props.layerCompliance.name}
            </a>

          </div>




          <div>

            <div>Category: {this.props.layerCompliance.category}</div>
            <div>{this.props.layerCompliance.compliant ? 'Compliant' : 'Non Compliant'}</div>

            <div>Property: {this.props.layerCompliance.prop}</div>{suggestions}

          </div>

        </div>
      )
  }
}
export default LayerDetail
