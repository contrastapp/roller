import React from "react"
import tinycolor from "tinycolor2"
import Paginate from "./Paginate";
import Subheader from "./Subheader";
import PropertiesHead from "./PropertiesHead";
import PieGraph from "./PieGraph";
import ColoredBarGraph from "./ColoredBarGraph";
import Text from "./Text";
import Error from "./Error";
import _ from "lodash"
import pluginCall from 'sketch-module-web-view/client'
import SuggestionContainer from '../containers/SuggestionsContainer';
import JSONPretty from 'react-json-pretty';
import ColorSwatch from './ColorSwatch';

class LayerDetail extends React.Component {
  constructor(props) {
    super(props)

    this.renderTrendWithinColor = this.renderTrendWithinColor.bind(this)
    this.renderTrendWithinProp = this.renderTrendWithinProp.bind(this)
    this.layersByProp = this.layersByProp.bind(this)
    this.trendInsight = this.trendInsight.bind(this)
    this.suggestions = this.suggestions.bind(this)
  }

  renderTrendWithinColor() {
    let layersByProp = this.props.trendByColor[this.props.layerCompliance.primary]

    layersByProp = _.map(layersByProp, (layers, prop) => ({name: prop, value: layers.length}))
    // "This color #FFF (small color example) is primarily used for fills (98% of the time), 1% for border, and 1% for text.

    let total = _.sum(_.map(layersByProp, 'value'))
    let sentence = _.map(_.sortBy(layersByProp, 'value'), (prop) => `${prop.name} ${(100.0 * prop.value/total).toFixed(1)}%`).join(', ')







    return ( <div>
      <div>
        {this.props.layerCompliance.primary} is used for {sentence} of the time
      </div>
      <PieGraph data={layersByProp} /></div>
    )
  }

  trendInsight() {
    let layersByProp = this.props.trendByColor[this.props.layerCompliance.primary]



    layersByProp = _.map(layersByProp, (layers, prop) => ({name: prop, value: layers.length}))
  }

  layersByProp() {
    let layersByProp = this.props.trendByProp[this.props.layerCompliance.prop]

    total = _.keys(layersByProp).length

    return _.map(layersByProp, (layers, prop) => ({name: prop, value: layers.length}))
  }

  renderTrendWithinProp() {
 // "Compared to all colors, #FFF is used .2% of the time for fills.
    let layersByProp = this.layersByProp()
    let total = _.sum(_.map(layersByProp, 'value'))
    let sentence = `Compared to all other colors, ${this.props.layerCompliance.primary} is used ${((100.0 * _.find(layersByProp, {name: this.props.layerCompliance.primary}).value)/total).toFixed(1)}% of the time for ${this.props.layerCompliance.prop}`

    return <div>{sentence}<PieGraph data={this.layersByProp()} colored/></div>
  }

  suggestions() {

    suggestions = _.take(_.reverse(_.map(_.sortBy(this.layersByProp(), 'value'), (l) => ({name: 'Color', hex: l.name}))), 3)
    return suggestions
  }


  render() {

    let suggestions;
    if (!this.props.layerCompliance.compliant) {
      suggestions = <SuggestionContainer {...this.props.layerCompliance} suggestions={_.get(this.props.colors, 'length') > 0 ? null : this.suggestions()}/>
    }

      let preview = <div className="swatch" style={{'backgroundColor' : this.props.layerCompliance.primary}}>  </div>
      let css = this.props.layerCompliance.primary

      if (this.props.layerCompliance.category === 'text') {
        preview = <div className="swatch">Aa</div>
        css = _.pick(this.props.layerCompliance.styles, ['fontSize', 'weight', 'fontFamily', 'lineHeight'])
        css = <JSONPretty id="json-pretty" json={css}></JSONPretty>
      }

    let caption;
    if (this.props.colors.length > 0 && !this.props.layerCompliance.compliant) {
      caption = <Text size="body">Misuse of {this.props.layerCompliance.category} within {this.props.layerCompliance.prop}</Text>
    } else {
      caption = <Text size="body">{this.props.layerCompliance.category === 'color' ? 'Color' : ''} trend data on {this.props.layerCompliance.prop} </Text>
    }

      return (
        <div>
          <div className="flex flexjcc p48">
            {preview}
          </div>

          <Paginate prev={this.props.prev} page={this.props.page} pages={this.props.pages} next={this.props.next}/>
            <Subheader>Details</Subheader>
            <div className="pr16 pl16 pt24 pb24 flex flexaic">
              <Error trend={this.props.layerCompliance.compliant}/>
              <div>
                <Text size="subheading">{this.props.layerCompliance.compliant ? 'Compliant' : 'Non Compliant'} {this.props.layerCompliance.prop}</Text>
                  <div>
                    {caption}
                </div>
              </div>
            </div>

          <Subheader>Properties</Subheader>
           <div className="p16">

            <PropertiesHead>CSS</PropertiesHead>
            {css}
            <div className="p8" />

            <PropertiesHead>Layer Name</PropertiesHead>
            <a onClick={() => pluginCall('selectLayer', this.props.layerCompliance.id)}>
              {this.props.layerCompliance.name} >
            </a>

          </div>

          <div>
            {!this.props.layerCompliance.compliant && <Subheader>Suggestions</Subheader>}
            {suggestions}
          </div>

          <Subheader>Stats</Subheader>
          <div className="p16 text-center">

            <Text size="heading">Color Usage by Property</Text>
            { this.renderTrendWithinColor() }
            <div className="divider24" />

            <Text size="heading">Total Color Usage for {_.capitalize(this.props.layerCompliance.prop)}</Text>
            { this.renderTrendWithinProp() }
          </div>

        </div>
      )
  }
}
export default LayerDetail
