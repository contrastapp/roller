import React from 'react';
import Text from './Text';


export default class PropertiesHead extends React.Component {
  render() {

    return (
      <div className="pb4">
        <Text size="subheading" subdued>{this.props.children}</Text>
      </div>

    );
  }
}
