import { connect } from 'react-redux';
import Test from './Test';
import * as actions from './actions/UserActions';

const mapStateToProps = (state, ownProps) => {
  return state
}

export default connect(mapStateToProps, actions)(Test);
