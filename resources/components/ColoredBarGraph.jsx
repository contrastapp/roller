import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Graph from './Graph';
import ColorSwatch from './ColorSwatch';
import { BarChart, ResponsiveContainer, Bar, Legend, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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

    const bars =  keys.map((k, i) => {
      let stroke = (k == '#ffffffff' || _.toUpper(k) == '#FFFFFF' ||  _.toUpper(k) == '#FFF') ? '#ccc' : null
      return <Bar stackId="a" key={i} dataKey={k} fill={k} stroke={stroke}/>
    })

    const customizedAxisTick  = ({x, y, stroke, payload}) => {
      return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform={`rotate(${this.props.rotate || -25})`}>{payload.value}</text>
          </g>
      );
    };

    const customToolTip  = (params) => {
      if (params.active) {
      return (
        <div className="custom-tooltip">
          <p className="label"><ColorSwatch small hexvalue={params.label} hex={params.label}/>{`Occurences : ${params.payload[0].value}`}</p>
        </div>
      );
      }
    };

    if (_.get(this.props.data,'length') === 0) {
      return "Looks like there is no data for this graph"
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={this.props.data}
          margin={{top: 20, right: 30, left: 20, bottom: 50}}
        >
          <XAxis
            interval={0}
            tick={customizedAxisTick}
            dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip content={customToolTip} itemStyle={{color: '#000'}} cursor={{ fill: '#F9FAFB' }}/>
          <div className="m60" />
          <Legend verticalAlign={this.props.verticalAlign || 'bottom'}/>
          {bars}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
