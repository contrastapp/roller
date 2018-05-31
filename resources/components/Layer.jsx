import React from "react"
import tinycolor from "tinycolor2"
import Text from './Text';
import _ from "lodash"
_.mixin(require("lodash-inflection"));
import pluginCall from 'sketch-module-web-view/client'

class Layer extends React.Component {
  constructor(props) {
    super(props)

    this.styleDisplay = this.styleDisplay.bind(this)
  }

  styleDisplay(style) {
    return (
      <div onClick={() => this.props.onClick(style)}>
        <div>Category: {style.category}</div>
        <div>{style.compliant ? 'Compliant' : 'Non Compliant'}</div>
        <div>
          <div style={{minHeight: 50, width: 50, minWidth: 50, backgroundColor: style.primary}}/>
          <div>{style.primary}</div>
        </div>
        <div>Property: {style.prop}</div>
      </div>
    )
  }

  render() {
    let first = {...(this.props.compliance[0] || {})}

    return (
      <div className='layer-row flex flexaic' onClick={() => this.props.onClick(first)}>
        <div className="error mr16"><i className="fas fa-camera-retro"></i></div>
        <div className='layer-block mr16' style={{backgroundColor: first.primary}}></div>
        <div className='layer-data'>
          <div className='layer-name'><Text size="subheading" subdued>Error</Text></div>
          <div className='layer-occurences'>
            <Text size="caption" subdued>{this.props.compliance.length} {_.pluralize('occurence', this.props.compliance.length)}</Text>
          </div>
          <div className='layer-caption'>
            <Text size="body">Misuse of {_.uniq(_.map(this.props.compliance, 'prop')).join(' and ')} color</Text>
          </div>
        </div>
      </div>
    )
  }
}

export default Layer
