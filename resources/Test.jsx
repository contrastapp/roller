import React from "react"
import { connect } from 'react-redux';
import LayersContainer from './containers/LayersContainer'
import UserForm from './components/UserForm'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog, faLightbulb }  from '@fortawesome/fontawesome-free-solid'
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
        <div className="flex f-between flexaic subheader" style={{display: this.props.layers.activeLayer ? 'none': 'flex'}} >
          <Modal
            isOpen={!_.get(this.props.user.user, 'email')}
            style={customStyles}
          >
            <UserForm onSubmit={this.handleSubmit} />
          </Modal>

          <img width="21.58" height="25" src="http://toybox-public.s3.amazonaws.com/Asset%201@2x.png" />
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
