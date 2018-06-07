import React from 'react';
import Text from './Text';
import Subheader from './Subheader';
import JSONPretty from 'react-json-pretty';


export default class FormatTips extends React.Component {
  render() {

    return (

      <div>

        <div className="pb16">
          <Text size="body">How to format your files:</Text>
        </div>

        <div className="flex f-column tcard">

          <div>
            <Subheader>JSON</Subheader>
            <div className="p8">
              <JSONPretty json={{colors: [{name: 'White', hex: '#FFFFFF'}]}} />
            </div>
          </div>

          <div>
            <Subheader>CSV</Subheader>
            <div className="p8">
            <table className="rules-csv-example">
              <th> name </th>
              <th> hex </th>
              <tr>
                <td> Black </td>
                <td> #000000 </td>
              </tr>
            </table>
          </div>
          </div>

        </div>

      </div>


    );
  }
}
