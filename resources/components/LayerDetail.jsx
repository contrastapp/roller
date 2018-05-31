import React from "react"
import tinycolor from "tinycolor2"
import Paginate from "./Paginate";
import Subheader from "./Subheader";
import PropertiesHead from "./PropertiesHead";
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
        <div>

          <div className="flex flexjcc p48">
            <div className="swatch" style={{'backgroundColor' : this.props.layerCompliance.primary}}>  </div>
          </div>

          <Paginate prev={this.props.prev} page={this.props.page} pages={this.props.pages} next={this.props.next}/>
            <Subheader>Details</Subheader>
            <div className="pr16 pl16 pt24 pb24 flex flexaic">
              <div className="error mr16" />
              <div>
                <Text size="subheading">{this.props.layerCompliance.compliant ? 'Compliant' : 'Non Compliant'}</Text>
                  <div>
                    <Text size="body">Misuse of {this.props.layerCompliance.category} within {this.props.layerCompliance.prop}</Text>
                </div>
              </div>
            </div>

          <Subheader>Properties</Subheader>
          <div className="p16">

            <PropertiesHead>CSS</PropertiesHead>
            {this.props.layerCompliance.primary}
            <div className="p8" />

            <PropertiesHead>Layer Name</PropertiesHead>
            <a onClick={() => pluginCall('selectLayer', this.props.layerCompliance.id)}>
              {this.props.layerCompliance.name} >
            </a>

          </div>

          <div>
            <Subheader>Suggestions</Subheader>
            {suggestions}
          </div>

        </div>
      )
  }
}
export default LayerDetail
