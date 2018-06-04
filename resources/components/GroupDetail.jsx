import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import LayerDetailContainer from '../containers/LayerDetailContainer'
import pluginCall from 'sketch-module-web-view/client'

class GroupDetail extends React.Component {
  constructor(props) {
    super(props)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.goToLayer = this.goToLayer.bind(this)
    this.state = {
      page: 0
    }
  }

  componentDidMount() {
    window.scrollTo(0,0)
    this.goToLayer(0)
  }

  goToLayer(page) {
    if (!window.mock) {
      pluginCall('selectLayer', this.props.layers[page].id)
    }
  }

  prev() {
    if (this.state.page > 0) {
      let newPage = this.state.page - 1
      this.setState({page: newPage})
      this.goToLayer(newPage)
    }
  }

  next() {
    if (this.state.page + 1 < this.props.layers.length) {
      let newPage = this.state.page + 1
      this.setState({page: newPage})
      this.goToLayer(newPage)
    }
  }

  render() {
    return (
      <div>
        <LayerDetailContainer
          prev={this.prev}
          next={this.next}
          index={this.state.page} page={this.state.page + 1} pages={this.props.layers.length}
          layerCompliance={this.props.layers[this.state.page]}
        />
      </div>
    )
  }
}

export default GroupDetail
