import React from "react"
import Intercom from 'react-intercom';

class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Intercom appID="mqb1jnyg" email={_.get(this.props.user, 'email')}/>
  }
}

export default Settings
