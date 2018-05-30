import { connect } from 'react-redux';
import SuggestionCollection from '../components/SuggestionCollection';

const mapStateToProps = (state, ownProps) => {
  return {...state.rules}
}

export default connect(mapStateToProps)(SuggestionCollection);
