import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Graph from './Graph';
import { BarChart, ResponsiveContainer, Bar, Legend, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export const fill = (i) =>
  {
    const hexs = ['#9C6ADE', '#5C6AC4', '#007ACE', '#50B83C', '#47C1BF', '#202E78', '#547AA5', '#C0E0DE'];
    return hexs[i % hexs.length]
  }

export default class BarGraph extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    let keys = _.uniq(_.flatten(_.map(this.props.data, (r) => _.keys(r))))
    _.remove(keys, (k) => k === 'name')

    const seed = _.random(10)

    if (_.indexOf(keys, this.props.remainder) >= 0) {
      keys = _.pull(keys, this.props.remainder)
      keys.push(this.props.remainder)
    }

    const bars =  keys.map((k, i) => {
      return <Bar stackId="a" key={i} dataKey={k} fill={fill(i+seed)} />
    })



    const customizedAxisTick  = ({x, y, stroke, payload}) => {
      return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform={`rotate(${this.props.rotate || 0})`}>{_.truncate(payload.value, {length: 24})}</text>
          </g>
      );
    };

    if (_.get(this.props.data,'length') === 0) {
      return "Looks like there is no data for this graph"
    }

    return (
      <ResponsiveContainer width="100%" height={400} >
        <BarChart
          data={this.props.data}
          margin={{top: 20, right: 30, left: 20, bottom: 50}}
        >
          <XAxis tick={customizedAxisTick} dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Legend />
          <Tooltip/>
          {bars}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
