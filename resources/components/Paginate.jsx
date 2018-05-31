import React from 'react';
import Text from './Text';


export default class Paginate extends React.Component {
  constructor(props) {
    super(props)

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.canPrev = this.canPrev.bind(this)
    this.canNext = this.canNext.bind(this)
  }

  canPrev() {
    return this.props.page > 1
  }

  canNext() {
    return this.props.page < this.props.pages
  }

  prev() {
    if (this.canPrev()) {
      this.props.prev()
    }
  }

  next() {
    if (this.canNext()) {
      this.props.next()
    }
  }
  render() {

    let prevBtn;
    let nextBtn;

    if (this.canPrev()) {
      prevBtn = "←"
    }
    if (this.canNext()) {
      nextBtn = "→"
    }

    return (

      <div className="flex flexaic f-between paginate-row">
        <div className="btn-paginate" onClick={this.prev}>{prevBtn}</div>
        <Text size="body" subdued>Page: {this.props.page} of {this.props.pages}</Text>
        <div className="btn-paginate" onClick={this.next}>{nextBtn}</div>
      </div>

    );
  }
}
