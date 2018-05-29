import React from "react"
import history from '../history'
import Layer from './Layer'
import moment from 'moment'
import pluginCall from "sketch-module-web-view/client"

class LayerCollection extends React.Component {
  constructor(props) {
    super(props)

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }

  clickLayer(id) {
    // console.log('clicked layer ' + id)
    // history.push(['item',id].join('/'))
    this.props.setActiveLayerId(id)
  }

  prev() {
    this.props.prevPage()
  }

  next() {
    this.props.nextPage()
  }

  renderLayer(styles) {

    const title = styles[0].name

    return (
      <li onClick={() => this.clickLayer(styles[0].id)}>
        {title}
        <ul>{_.map(styles, (style) => <li>(X) {style.prop}</li>)}</ul>
      </li>
    )
  }

  render() {
    if (this.props.activeLayerId) {
      return <div><button onClick={() => this.props.setActiveLayerId(null) }>Back</button><Layer compliance={this.props.layers[this.props.activeLayerId]} /></div>
    } else {

      let layers = _.map(this.props.layers, (l, id) => l)
      layers = _.chunk(layers, 2)[this.props.page]
      layers = _.reverse(_.sortBy(layers, (l) => _.reverse(_.sortBy(l, 'createdAt'))[0].createdAt))
      const nestedLayers = _.map(layers, (styles) => this.renderLayer(styles))

      return (
        <div>
          <button onClick={() => pluginCall('getData', this.props.page) }>Lint</button>
          <h3>Layers:</h3>
          Page: {this.props.page}
          <button onClick={this.prev}>Previous</button>
          <button onClick={this.next}>Next</button>
          <ul>{nestedLayers}</ul>
        </div>
      )

    }
  }
}

export default LayerCollection
