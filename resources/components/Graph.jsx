import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { BarChart, Bar, LineChart, Legend, Area, AreaChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default class Graph extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    let width
    let height=400

    switch (this.props.size) {
      case "third":
        width = 255;
        break;
      case "half":
        width = 420;
        break;
      case "two-thirds":
        width = 580;
        break;
      case "full":
        width = 916;
        break;
      default:
        width = 400;
        break
    }

  return (
    <div>
      {React.cloneElement(this.props.children, { width: width, height: height, seed: _.random(10) })}
    </div>
  );
}
}
