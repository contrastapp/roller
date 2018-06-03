import { connect } from 'react-redux';
import SuggestionCollection from '../components/SuggestionCollection';
import * as actions from '../actions/LayerActions';

const mapStateToProps = (state, ownProps) => {
  return {...state.rules, ...state.layers}
}

export default connect(mapStateToProps, actions)(SuggestionCollection);
