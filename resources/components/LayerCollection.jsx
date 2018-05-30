import React from "react"
import history from '../history'
import Layer from './Layer'
import GroupDetail from './GroupDetail'
import moment from 'moment'
import pluginCall from "sketch-module-web-view/client"
import Modal from 'react-modal';

class LayerCollection extends React.Component {
  constructor(props) {
    super(props)

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.clickLayer = this.clickLayer.bind(this)
  }

  clickLayer(layer) {
    this.props.setActiveLayer(layer)
  }

  prev() {
    this.props.prevPage()
  }

  next() {
    this.props.nextPage()
  }

  render() {
    let layer;
    if (this.props.activeLayer) {
      layer = _.find(this.props.layerMap[this.props.activeLayer.id], (l) => this.props.activeLayer.prop == l.prop)
      layer = <GroupDetail layers={this.props.layers[layer.primary]} />
    }

    let nestedLayers;
    if (this.props.layers.length == 0) {
      nestedLayers =<div>loading...</div>
    } else {
      let layers = _.map(this.props.layers, (l, id) => l)
      layers = _.chunk(layers, 25)[this.props.page]
      layers = _.reverse(_.sortBy(layers, (l) => _.reverse(_.sortBy(l, 'createdAt'))[0].createdAt))
      nestedLayers = _.map(layers, (styles) => <Layer onClick={this.clickLayer} compliance={styles} />)
    }


    const customStyles = {
      content : {
        top                   : '0',
        left                  : '0',
        marginRight           : '0',
        width: '100%',
        height: '100%',
      }
    };

      return (
        <div>
          <button onClick={() => pluginCall('getData', this.props.page) }>Lint</button>
          <h3>Results:</h3>
          Page: {this.props.page}
          <button onClick={this.prev}>Previous</button>
          <button onClick={this.next}>Next</button>
          <div className='layer-grid'>
            {nestedLayers}
          </div>
          <Modal
            isOpen={this.props.activeLayer}
            onRequestClose={() => this.props.setActiveLayerId(null)}
            style={customStyles}
          >
            <button onClick={() => this.props.setActiveLayerId(null)}>Close</button>
            {layer}
          </Modal>
        </div>
      )

  }
}

export default LayerCollection
