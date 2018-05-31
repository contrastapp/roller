import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import Text from "./Text";
import pluginCall from 'sketch-module-web-view/client'

class SuggestionCollection extends React.Component {
  constructor(props) {
    super(props)
    this.computeSuggestions = this.computeSuggestions.bind(this)
  }

  computeSuggestions(primary) {
    let base_colors = this.props.colors

    //Convert to RGB, then R, G, B
    var color = tinycolor(primary);
    let rgb = color.toRgb();

    var color_r = rgb.r;
    var color_g = rgb.g;
    var color_b = rgb.b;

    var differenceArray=[];

    _.each(base_colors, (value) => {
      var base_color_rgb = tinycolor(value).toRgb();
      var base_colors_r = base_color_rgb.r;
      var base_colors_g = base_color_rgb.g;
      var base_colors_b = base_color_rgb.b;

      differenceArray.push(Math.sqrt((color_r-base_colors_r)*(color_r-base_colors_r)+(color_g-base_colors_g)*(color_g-base_colors_g)+(color_b-base_colors_b)*(color_b-base_colors_b)));
    });

    //Get the lowest number from the differenceArray
    var lowest = _.min(differenceArray);

    //Get the index for that lowest number
    var index = differenceArray.indexOf(lowest);

    //Return the HEX code
    return base_colors[index];
  }

  render() {
    let suggestion = this.computeSuggestions(this.props.primary)
    let swap = (
      <a onClick={() => { pluginCall('swapProp', this.props.id, this.props.prop, this.props.primary, suggestion)} }>

        <div className="pt8" />
        <div className="flex flexaic tcard suggestions">
          <div className="swatch suggest mr16" style={{backgroundColor: suggestion}}/>
          <div>
            <Text size="subheading" subdued>Hex Value</Text>
            <Text size="body">{suggestion}</Text>
          </div>
        </div>

      </a>
    )

    return (
      <div className="p16">
        <Text size="body" subdued>Did you mean to use:</Text>
        {swap}
      </div>
    )
  }
}
export default SuggestionCollection
