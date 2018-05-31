import React from "react"
import history from '../history'
import Layer from './Layer'
import Button from './Button';
import Paginate from './Paginate';
import Text from './Text';
import Subheader from './Subheader';
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
      let layers = this.props.layers[layer.primary]
      if (this.props.selected) {
        layers = this.props.layerMap[layer.id]
      }
      layer = <GroupDetail layers={layers} />
    }

    let nestedLayers;

    let chunk = 25
    let layers = _.map(this.props.layers, (l, id) => l)
    let pages = _.chunk(layers, chunk)
    let page = pages[this.props.page]
    layers = _.reverse(_.sortBy(page, (l) => _.reverse(_.sortBy(l, 'createdAt'))[0].createdAt))

    if (this.props.layers.length == 0) {
      nestedLayers =<div>loading...</div>
    } else {
      nestedLayers = _.map(layers, (styles) => <Layer onClick={this.clickLayer} compliance={styles} />)
    }



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
        <div>
          <div className="flex flexaic flexjcc pt24 pb24 pr16 pl16">
            <Button size="full" style="default" onClick={() => pluginCall('getData', this.props.page) }>Lint My File</Button>
          </div>

          <Paginate prev={this.prev} page={this.props.page + 1} pages={_.get(pages, 'length', 0)} next={this.next}/>

          <Subheader>Results:</Subheader>

          <div className='layer-grid'>
            {nestedLayers}
          </div>
          <Modal
            isOpen={this.props.activeLayer}
            onRequestClose={() => this.props.setActiveLayer(null)}
            style={customStyles}
          >
            <Subheader><a onClick={() => this.props.setActiveLayer(null)}>←</a></Subheader>
            {layer}
          </Modal>
        </div>
      )

  }
}

export default LayerCollection
