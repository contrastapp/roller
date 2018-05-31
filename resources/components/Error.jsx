import React from 'react';
import Text from './Text';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faExclamationTriangle }  from '@fortawesome/fontawesome-free-solid'


export default class Error extends React.Component {
  render() {

    return (

      <div className="error ml4 mr16"><FontAwesomeIcon icon={faExclamationTriangle} /></div>

    );
  }
}
