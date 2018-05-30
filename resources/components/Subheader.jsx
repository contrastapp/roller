import React from 'react';
import Text from './Text';


export default class Subheader extends React.Component {
  render() {

    return (

      <div className="subheader"><Text size="subheading">{this.props.children}</Text></div>


    );
  }
}
