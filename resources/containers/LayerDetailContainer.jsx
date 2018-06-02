import { connect } from 'react-redux';
import LayerDetail from '../components/LayerDetail';
import * as actions from '../actions/LayerActions';

const mapStateToProps = (state, ownProps) => {
  return {...state.layers, ...state.rules, ...ownProps}
}

export default connect(mapStateToProps, actions)(LayerDetail);
