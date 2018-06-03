import { connect } from 'react-redux';
import Settings from '../components/Settings';
import * as actions from '../actions/RuleActions';

const mapStateToProps = (state, ownProps) => {
  return state

}

export default connect(mapStateToProps, actions)(Settings);
