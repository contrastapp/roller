import React from 'react';
import Text from './Text';

export default class Button extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    let className, classButton;

    switch(this.props.size) {
      case 'small':
        className ='btn-small'
        break;

      case 'medium':
        className ='btn-medium'
        break;

      case 'full':
        className ='btn-full'
        break;
    }

    switch(this.props.style) {
      case 'primary':
        classButton ='btn-primary'
        break;

      case 'default':
        classButton ='btn-default'
        break;

    }

    return (

        <button onClick={this.props.onClick} className={`tb-btn ${className} ${classButton}`}>
          <Text size="body" inheritColor>{this.props.children}</Text>
        </button>
      );
  }
}
