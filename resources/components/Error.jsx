import React from 'react';
import Text from './Text';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faExclamationTriangle }  from '@fortawesome/fontawesome-free-solid'


export default class Error extends React.Component {
  render() {

    return (

      <div className={`${this.props.trend ? 'trend' : ''} `}></div>

    );
  }
}
