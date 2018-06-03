import { connect } from 'react-redux';
import Layer from '../components/Layer';
import * as actions from '../actions/LayerActions';

const mapStateToProps = (state, ownProps) => {
  return {...state.layers, ...state.rules}
}

export default connect(mapStateToProps, actions)(Layer);
