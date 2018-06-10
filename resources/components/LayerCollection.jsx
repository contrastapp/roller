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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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

    this.state = {scrollPosition: 0}
  }

  clickLayer(layer) {
    this.setState({scrollPosition: window.scrollY})
    this.props.setActiveLayer(layer)
  }

  prev(tab) {
    this.props.prevPage(tab)
  }

  next(tab) {
    this.props.nextPage(tab)
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
    window.scrollTo(0,this.state.scrollPosition)
    this.props.clearLayer(this.props.activeLayer.id);
    if(!window.mock) {
      pluginCall('updateLayer', this.props.activeLayer.id)
    }
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


    if (_.keys(this.props.layers).length == 0) {
      nestedLayers = <div className="flex flexaic flexjcc pt24 pb24 pr16 pl16">Click "Lint My File" Above To Get Started</div>
    } else {
      let compliantLayers ;
      let noncompliantLayers ;
      let  primaryTab;
      let  secondaryTab;
        // layers = _.reverse(_.sortBy(layers, (l) => {
        //   return _.reverse(_.sortBy(l, 'createdAt'))[0].createdAt
        // }))
      layers = _.reverse(_.sortBy(layers, 'length'))

        let tabs = _.groupBy(layers, (l) => l[0].compliant)

        pagesTrends = _.chunk(tabs[true], chunk)
        pagesErrors = _.chunk(tabs[false], chunk)

        let pageTrends = pagesTrends[this.props.page.trends]
        let pageErrors = pagesErrors[this.props.page.errors]

      if (_.get(this.props.colors, 'length') > 0) {

        compliantLayers = (
          <div>
            <Paginate prev={() => this.prev('trends')} page={this.props.page.trends + 1} pages={_.get(pagesTrends, 'length', 0)} next={() => this.next('trends')}/>
            
            {
              _.map(pageTrends , (styles) => <GroupContainer onClick={this.clickLayer} compliance={styles} />)
            }
          </div>
        )

        noncompliantLayers = (
          <div>
            <Paginate prev={() => this.prev('errors')} page={this.props.page.errors + 1} pages={_.get(pagesErrors, 'length', 0)} next={() => this.next('errors')}/>

            {
              _.map(pageErrors, (styles) => <GroupContainer onClick={this.clickLayer} compliance={styles} />)
            }
          </div>
        )

        primaryTab = 'Errors'
        secondaryTab = 'Trends'
      } else {
        noncompliantLayers = (
          <div className="p48 text-center flex flexjcc">
            <Text>Add some colors in settings to start linting for errors</Text>
          </div>
        )

        compliantLayers = (
          <div>
            <Paginate prev={() => this.prev('errors')} page={this.props.page.errors + 1} pages={_.get(pagesErrors, 'length', 0)} next={() => this.next('errors')}/>

            {
              _.map(pageErrors, (styles) => <GroupContainer onClick={this.clickLayer} compliance={styles} />)
            }
          </div>
        )
        primaryTab = 'Trends'
        secondaryTab = 'Errors'
      }

      nestedLayers =(
        <Tabs>
          <TabList>
            <Tab>{primaryTab}</Tab>
            <Tab>{secondaryTab}</Tab>
          </TabList>
          <TabPanel>
            {noncompliantLayers}
          </TabPanel>
          <TabPanel>
            {compliantLayers}
          </TabPanel>
        </Tabs>
      )
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

          // <Modal
          //   isOpen={this.props.activeLayer}
          //   onRequestClose={this.onRequestClose}
          //   style={customStyles}
          // >
          //   <Subheader><a onClick={this.onRequestClose}>←</a></Subheader>
          //   {layer}
          // </Modal>
      layer = (<div style={{display: this.props.activeLayer ? 'block': 'none'}}><Subheader><a onClick={this.onRequestClose}>←</a></Subheader> {layer}</div>)

      return (
        <div>
          <div style={{display: this.props.activeLayer ? 'none': 'block'}}>
            <div className="flex flexaic flexjcc pt24 pb24 pr16 pl16">
              <Button size="full" style="default" onClick={() => pluginCall('getData', this.props.page) }>Lint My File</Button>
            </div>


            <div className='layer-grid'>
              {nestedLayers}
            </div>
          </div>
          {layer}
        </div>
      )

  }
}

export default LayerCollection
