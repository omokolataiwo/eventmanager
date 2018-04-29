import React from 'react';
import PropTypes from 'prop-types';
import { hasFlash, getFlash } from '../../../utils/flash';

const propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

/**
 * Verification page for center creation
 *
 * @class Verification
 * @extends {React.Component}
 */
class Verification extends React.Component {
  /**
   * Check if new center is created.
   *
   * @returns {void}
   * @memberof Verification
   */
  componentWillMount() {
    if (!hasFlash('NEW_CENTER_CREATED')) { this.props.history.push('/admin'); }
    getFlash('NEW_CENTER_CREATED');
  }
  /**
   * Renders the page
   *
   * @returns {object} JSX DOM object
   * @memberof Verification
   */
  render() {
    return (
      <div className="container container-medium card">
        <div className="row">
          <div className="col s12 m10 l9">
            <h5>New Center Created.</h5>
            <p>
              An application has been opened to review your centre.
            </p>
            <p>
              The centre status will be active when our team
              is done reviewing your application
              Thank you.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
Verification.propTypes = propTypes;
export default Verification;
