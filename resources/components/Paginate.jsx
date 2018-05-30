import React from 'react';
import Text from './Text';


export default class Paginate extends React.Component {
  render() {

    return (

      <div className="flex flexaic f-between paginate-row">
        <div className="btn-paginate" onClick={this.prev}>←</div>
        <Text size="body" subdued>Page: {this.props.page}</Text>
        <div className="btn-paginate" onClick={this.next}>→</div>
      </div>

    );
  }
}
