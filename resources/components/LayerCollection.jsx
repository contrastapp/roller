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
import GroupContainer from '../containers/GroupContainer';

class LayerCollection extends React.Component {
  constructor(props) {
    super(props)

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.clickLayer = this.clickLayer.bind(this)
    this.relevantLayers = this.relevantLayers.bind(this)
    this.colorCompliance = this.colorCompliance.bind(this)
    this.textCompliance = this.textCompliance.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
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



  textCompliance(layers) {
    let props = ['fontSize', 'weight', 'lineHeight']

    //Non compliant layers
    return _.filter(layers, (l) => {
      let layer = _.pick(l.styles, props)
      return _.filter(this.props.typography, (t) => _.isEqual(_.pick(t, props), layer)).length === 0
    })

  }

  colorCompliance(layers) {
    return layers
    // return _.filter(layers, (l) => {
    //   //Non compliant layers
    //   return !l.compliant
    // })
  }


  relevantLayers(layer) {
    layer = _.find(this.props.layerMap[layer.id], (l) => layer.prop == l.prop)
    let key = layer.primary
    if (layer.category === 'text') {
      key = _.join(_.map(_.keys(layer.styles), (k) => layer.styles[k]), '-')
    }
    let layers = this.props.layers[key]
    if (this.props.selected) {
      layers = this.props.layerMap[layer.id]
    }

    switch (layer.category) {
      case 'text':
        return this.textCompliance(layers);
      case 'color':
        return this.colorCompliance(layers);
      default:
        return layers
    }
  }

  onRequestClose() {
    this.props.clearLayer(this.props.activeLayer.id);
    pluginCall('updateLayer', this.props.activeLayer.id)
    this.props.setActiveLayer(null)
  }

  render() {
    let layer;
    if (this.props.activeLayer) {
      layer = <GroupDetail layers={this.relevantLayers(this.props.activeLayer)} />
    }

    let nestedLayers;
    nestedLayers =<div>All Compliant!</div>

    let chunk = 25
    let pages = 1
    let layers = _.filter(_.map(this.props.layers, (l, id) => this.relevantLayers(l[0])), (group) => group.length > 0 )

    pages = _.chunk(layers, chunk)
    let page = pages[this.props.page]
    layers = _.reverse(_.sortBy(page, (l) => {
      return _.reverse(_.sortBy(l, 'createdAt'))[0].createdAt
    }))

    if (this.props.layers.length == 0) {
      nestedLayers =<div>loading...</div>
    } else {
      nestedLayers = _.map(layers, (styles) => <GroupContainer onClick={this.clickLayer} compliance={styles} />)
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
            onRequestClose={this.onRequestClose}
            style={customStyles}
          >
            <Subheader><a onClick={this.onRequestClose}>←</a></Subheader>
            {layer}
          </Modal>
        </div>
      )

  }
}

export default LayerCollection
