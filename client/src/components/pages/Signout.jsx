import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import toastr from 'toastr';
import { signoutRequest } from '../../actions/signoutRequest';

/**
 * Signout user
 *
 * @class Signout
 * @extends {React.Component}
 */
class Signout extends React.Component {
  /**
   * Dispatch signout request
   *
   * @returns {void}
   * @memberof Signout
   */
  componentWillMount() {
    this.props.signoutRequest();
  }

  /**
   * Redirect to homepage
   *
   * @returns {void}
   * @memberof Signout
   */
  render() {
    toastr.options = {
      positionClass: 'toast-top-full-width',
      showDuration: '300',
      hideDuration: '2000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    };
    toastr.success('Sign out successfully.');
    this.props.history.replace('/');

    return null;
  }
}

Signout.propTypes = {
  signoutRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({ replace: PropTypes.func.isRequired }).isRequired
};

export default connect(() => {}, { signoutRequest })(Signout);
