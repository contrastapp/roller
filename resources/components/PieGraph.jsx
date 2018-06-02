import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Graph from './Graph';
import { PieChart, Pie, Sector, Cell, Legend, Area, AreaChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export const fill = (i) =>
  {
    const hexs = ['#9C6ADE', '#5C6AC4', '#007ACE', '#50B83C', '#47C1BF', '#202E78', '#547AA5', '#C0E0DE'];
    return hexs[i % hexs.length]
  }

export default class PieGraph extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {activeIndex: 0}
  }

  renderActiveShape(props) {
    const RADIAN = Math.PI / 180;
    let { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props;

    // fill = (fill == '#ffffffff' || _.toUpper(fill) == '#FFFFFF' ||  _.toUpper(fill) == '#FFF') ? '#ccc' : fill
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill='black'>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="#ccc"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} occurences`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.85 ;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    const seed = _.random(10)

    return (
        <Graph size={this.props.size} width={this.props.width} height={this.props.height} >
          <PieChart >
            <Pie
              data={this.props.data}
              labelLine={false}
              activeIndex={this.state.activeIndex}
              activeShape={this.renderActiveShape}
              outerRadius={80}
              innerRadius={40}
              onMouseEnter={this.onPieEnter.bind(this)}
              dataKey='value'
              fill="#8884d8"
            >
              {
                this.props.data.map((entry, i) => {
                  let k = this.props.data[i].name
                  let stroke = (k == '#ffffffff' || _.toUpper(k) == '#FFFFFF' ||  _.toUpper(k) == '#FFF') ? '#ccc' : null
                  return <Cell key={i} stroke={stroke} fill={this.props.colored ?  k : fill(i)}/>
                })
              }
            </Pie>
            <Tooltip formatter={(value) => {return `${value} occurences` }}/>
            <Legend/>
          </PieChart>
        </Graph>
    );
  }
}
