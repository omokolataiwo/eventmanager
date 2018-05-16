import React from 'react';
import 'materialize-css';
import PropTypes from 'prop-types';
import checkAvailabilityImg from '../../images/icons/calendar-check.png';
import searchForCenterImg from '../../images/icons/searching-for-a-house.png';
import bookVenueImge from '../../images/icons/calendar-book1.png';
import OverlaySearch from '../containers/OverlaySearch';
import Slider from '../containers/Slider';
import FeaturedCenter from '../containers/FeaturedCenter';

const propTypes = {
  history: PropTypes.func.isRequired
};

/**
 * Home page component
 *
 * @class Home
 * @extends {Component}
 */
const Home = ({ history }) => (
  <div>
    <div className="search_slider_panel">
      <Slider />
      <div
        className="searchEvent_panel"
        style={{
          width: '60%',
          marginLeft: '20%',
          overflow: 'auto',
          paddingBottom: '2%'
        }}
      >
        <OverlaySearch history={history} />
      </div>
    </div>
    <div className="container feature">
      <div className="row center" id="how_it_works">
        <div className="col s12 m12 l12">
          <h3>HOW IT WORKS</h3>
          <hr />
        </div>
        <div className="row">
          <div className="col s12 m4 l4">
            <img src={searchForCenterImg} alt="Search for Center" />
            <h5>SEARCH VENUE</h5>
            <p>
              Find your best suited Events Venues across Nigeria, including
              pricing, special offers, reviews.
            </p>
          </div>
          <div className="col s12 m4 l4">
            <img src={checkAvailabilityImg} alt="Check Availability" />
            <h5>CHECK AVAILABILITY</h5>
            <p>
              Check the availability of the center. We are sure you will get a
              center that best fit your event.
            </p>
          </div>
          <div className="col s12 m4 l4">
            <img src={bookVenueImge} alt="Book Venue" />;
            <h5>BOOK VENUE</h5>
            <p>Book the venue of your choice and have fun using the center.</p>
          </div>
        </div>
      </div>
      <div className="row center featured-centers">
        <div className="col s12 m12 l12">
          <hr />
          <h5>FEATURED CENTERS</h5>
        </div>
        {<FeaturedCenter />}
      </div>
    </div>
  </div>
);

Home.propTypes = propTypes;
export default Home;
