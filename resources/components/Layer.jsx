import React from "react"
import Button from './Button';
import tinycolor from "tinycolor2"
import Text from './Text';
import Error from './Error';
import _ from "lodash"
_.mixin(require("lodash-inflection"));
import pluginCall from 'sketch-module-web-view/client'

class Layer extends React.Component {
  constructor(props) {
    super(props)

    this.addColor = this.addColor.bind(this)
  }

  addColor() {
    let first = {...(this.props.compliance[0] || {})}
    this.props.colors.push({name: 'Saved Color', hex: first.primary})
    if (!window.mock) {
      pluginCall('saveRules', this.props.colors)
    }
  }

  render() {
    let first = {...(this.props.compliance[0] || {})}

    let block = <div className='layer-block mr16' style={{backgroundColor: first.primary}}></div>
      if (first.category === 'text') {
        block = <div className='layer-block mr16'>Aa</div>
      }


    let trend = true;
    if (_.get(this.props.colors, 'length') > 0) {
      trend = first.compliant;
    }


    let caption;
    if (!trend) {
      caption = <Text size="body">Misuse of {_.uniq(_.map(this.props.compliance, 'prop')).join(' and ')}</Text>
    } else {
      caption = <Text size="body">Trend data on {_.uniq(_.map(this.props.compliance, 'prop')).join(' and ')} </Text>
    }

    return (
      <div className='layer-row flex flexaic' >
        <span className="flex flexaic" onClick={() => this.props.onClick(first)}>
          <Error trend={first.compliant}/>
          {block}
          <div className='layer-data'>
            <div className='layer-name'><Text size="subheading" subdued>Color { trend ? 'Trend' : 'Error'}</Text></div>
            <div className='layer-occurences'>
              <Text size="caption" subdued>{this.props.compliance.length} {_.pluralize('occurence', this.props.compliance.length)}</Text>
            </div>
            <div className='layer-caption'>
              {caption}
            </div>
          </div>
        </span>
        <Button onClick={this.addColor}>+</Button>
      </div>
    )
  }
}

export default Layer
