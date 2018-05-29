import React from "react"
import pluginCall from 'sketch-module-web-view/client'

class Layer extends React.Component {
  constructor(props) {
    super(props)
  }

  styleDisplay(style) {
    return (
      <div>
        <button onClick={() => pluginCall('selectLayer', this.props.compliance[0].id)}>Go to layer ></button>
        <div>{style.category}</div>
        <div>{style.compliant ? 'Compliant' : 'Non Compliant'}</div>
        <div>{style.primary}</div>
        <div>{style.prop}</div>
        Suggestions:
      </div>
    )
  }

  render() {
    // category: "color"
    // compliant: true
    // id: "C4A6A097-CF41-4D90-9594-BE32B3C426F2"
    // primary: "#ca1111ff"
    // prop: "fills"
    // styles: {fill: "Color", color: "#ca1111ff", gradient: Object, enabled: true}
    // suggestions: []

    return <div> <h1>{_.map(this.props.compliance, 'name')[0]}</h1>{ _.map(this.props.compliance, (style) => this.styleDisplay(style)) } </div>
  }
}

export default Layer
