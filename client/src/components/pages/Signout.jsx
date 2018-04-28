import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { signoutRequest } from '../../actions/signoutRequest';

/**
 *
 *
 * @class Signout
 * @extends {React.Component}
 */
class Signout extends React.Component {
  componentWillMount() {
    this.props.signout();
  }

  render() {
    return (
      <div className="container container-small">
        <div className="row card">
          <h3>Signed Out, Successfully.</h3>
        </div>
      </div>
    );
  }
}

Signout.propTypes = {
  signout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signoutRequest())
});

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
