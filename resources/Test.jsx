import React from "react"
import { connect } from 'react-redux';
import LayersContainer from './containers/LayersContainer'
import UserForm from './components/UserForm'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog, faLightbulb }  from '@fortawesome/fontawesome-free-solid'
import pluginCall from 'sketch-module-web-view/client'
import Text from "./components/Text";
import Modal from 'react-modal';
import RulesDropZoneContainer from './containers/RulesDropZoneContainer';
import Button from "./components/Button";

class Test extends React.Component {
  constructor(props) {
    super(props)

    this.onBoard = this.onBoard.bind(this)
    this.closeOnboard = this.closeOnboard.bind(this)
    this.settingsPage= this.settingsPage.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.onDrop= this.onDrop.bind(this)
  }

  componentWillMount() {
  }

  handleSubmit(data) {
    if (!window.mock) {
      pluginCall('saveUser', data)
    }
  }

  onDrop() {
    this.closeOnboard()
    if (!window.mock) {
      this.props.history.push('settings')
    }
  }

  closeOnboard() {
    if (!window.mock) {
      pluginCall('onboarded', true)
    }
    this.props.setOnboarded(true)
  }

  settingsPage() {
    this.closeOnboard()
    this.props.history.push('settings')
  }

  onBoard() {
    if (!_.get(this.props.user.user, 'email')) {
      return <UserForm onSubmit={this.handleSubmit} />
    }
    if (!this.props.user.onboarded) {
        return (
          <div className="flex flexaic flexjcc f-column mt24 p24">
            <div className="pb12 text-center">
              <Text size="small">Get Started with Roller</Text>
              <Text size="caption" subdued>Import or add your colors to start finding inconsistencies.</Text>
            </div>

            <div className="mt12">
              <RulesDropZoneContainer showFormatTips onComplete={this.onDrop}/>

              <div className="flex f-column">
                <div className="p16 text-center">
                  <Text size="body" subdued>- OR -</Text>
                </div>

                  <div className="text-center">
                    <Button style="primary" size="full" onClick={this.settingsPage}>Add Colors Manually</Button>
                    <div className="mb16" />
                    <Button style="link" size="small" onClick={this.closeOnboard}>Skip</Button>
                    <Text size="caption" subdued >You can always add or edit your colors later</Text>
                  </div>

                  <div className="divider24" />


                </div>
            </div>
          </div>
        )
    }
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
            isOpen={!this.props.user.onboarded || !_.get(this.props.user.user, 'email')}
            style={customStyles}
          >
            {this.onBoard()}
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
