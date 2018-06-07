import { connect } from 'react-redux';
import RulesDropZone from '../components/RulesDropZone';
import * as actions from '../actions/RuleActions';

const mapStateToProps = (state, ownProps) => {
  return {...state.rules}
}

export default connect(mapStateToProps, actions)(RulesDropZone);
