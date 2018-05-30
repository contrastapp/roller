import React from "react"
import { connect } from 'react-redux';
import LayersContainer from './containers/LayersContainer'

class Test extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container settings">
        <div>
        <button onClick={()=> this.props.history.push('settings')}>
          Settings
        </button>
      </div>
        <LayersContainer />
      </div>
    )
  }
}

export default Test
