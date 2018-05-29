import React from "react"
import { connect } from 'react-redux';
import pluginCall from "sketch-module-web-view/client"
import history from './history'

class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let id = this.props.match.params.id
    return (
      <div className="container settings">
        <button onClick={() => history.push('/list')}>Back</button>
        Item {id}
      </div>
    )
  }
}

export default Item
