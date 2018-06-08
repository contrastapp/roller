import { connect } from 'react-redux';
import Intercom from '../components/Intercom';

const mapStateToProps = (state, ownProps) => {
  return {...state.user}

}

export default connect(mapStateToProps)(Intercom);
