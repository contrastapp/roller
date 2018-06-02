import React from "react"
import { connect } from 'react-redux';
import LayersContainer from './containers/LayersContainer'
import UserForm from './components/UserForm'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog }  from '@fortawesome/fontawesome-free-solid'
import pluginCall from 'sketch-module-web-view/client'
import Modal from 'react-modal';

class Test extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSubmit(data) {
    pluginCall('saveUser', data)
  }

  render() {
    const customStyles = {
      content : {
        top: '0',
        left: '0',
        marginRight: '0',
        width: '100%',
        height: '100%',
        padding: '0',
        border: 'none',
      }
    };

    return (
      <div className="container">
        <div className="flex f-end subheader">
          <Modal
            isOpen={!_.get(this.props.user.user, 'email')}
            style={customStyles}
          >
            <UserForm onSubmit={this.handleSubmit} />
          </Modal>
        <a onClick={()=> this.props.history.push('settings')}>
          <FontAwesomeIcon icon={faCog } />
        </a>

      </div>
        <LayersContainer />
      </div>
    )
  }
}

export default Test
