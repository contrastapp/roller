import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Text from './Text';

export default class ColorSwatch extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }


  render() {
    let details = (
      <div className="mt8 label padding bottom">
        <Text size="subheading mt8" inheritColor>{this.props.hexvalue}</Text>
      </div>
    )

    if (this.props.swatchOnly) {
      details = null
    }

    return (
      <div>
        <div class={`color-card ${this.props.small ? 'small' : ''}`} style={{background: this.props.hexvalue}} />
        {details}
      </div>
    );
  }

}
