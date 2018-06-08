import { connect } from 'react-redux';
import Test from './Test';
import { bindActionCreators } from 'redux';
import * as actions from './actions/UserActions';
import * as ruleActions from './actions/RuleActions';

const mapStateToProps = (state, ownProps) => {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
    ruleActions: bindActionCreators(ruleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
