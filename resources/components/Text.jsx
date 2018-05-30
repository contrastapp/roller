import React from 'react';

export default class Text extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    let className;
    const subdued = this.props.subdued ? "subdued" : ""
    const inheritColor = this.props.inheritColor ? "inherit-color" : ""

    switch(this.props.size) {
      case 'medium':
        className = 'dmedium'
        break;

      case 'small':
        className = 'dsmall'
        break;

      case 'heading':
        className = 'heading'
        break;

      case 'subheading':
        className = 'subheading'
        break;

      case 'body':
        className = 'body'
        break;

      case 'caption':
        className = 'caption'
        break;

    }

    return <div className={`tb-text ${className} ${subdued} ${inheritColor}`}>{this.props.children}</div>;
  }
}
