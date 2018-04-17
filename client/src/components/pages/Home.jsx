import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import 'materialize-css';
import fetchAllCentersRequest from '../../actions/fetchAllCentersRequest';
import bannercenter from '../../images/banner-center2.png';
import checkAvailabilityImg from '../../images/icons/calendar-check.png';
import searchForCenterImg from '../../images/icons/searching-for-a-house.png';
import bookVenueImge from '../../images/icons/calendar-book1.png';
import featuredCenterImg from '../../images/party-room.jpg';
import OverlaySearch from '../containers/OverlaySearch';

/**
 * Home page component
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * Home page component
   *
   * @param {object} props - The application properties
   */
  constructor(props) {
    super(props);
    this.state = {
      centers: []
    };
  }
  /**
   * Fetch all centers when component mounts
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.fetchAllCentersRequest();
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
  }
  /**
   * Update centers when property received
   *
   * @param {props} props - The properties received
   * @return {void}
   */
  componentWillReceiveProps(props) {
    this.setState({ centers: props.centers });
  }
  /**
   * Renders the component
   *
   * @returns {object} - JSX object
   */
  render() {
    return (
      <div>
        <div className="search_slider_panel">
          <div className="carousel carousel-slider banner">
            <Link className="carousel-item" to="#one!">
              <img src={bannercenter} alt="Center Banner" />
            </Link>
            <Link className="carousel-item" to="#two!">
              <img src={bannercenter} alt="Center Banner" />
            </Link>
            <Link className="carousel-item" to="#three!">
              <img src={bannercenter} alt="Index Center Banner" />
            </Link>
          </div>
          <div
            className="searchEvent_panel"
            style={{
              width: '80%',
              marginLeft: '10%',
              maxHeight: '90%',
              overflow: 'auto',
              paddingBottom: '2%'
            }}
          >
            <OverlaySearch />
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
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Donec id elit non mi porta gravida at eget metus. Nullam id
                  dolor id nibh ultricies vehicula ut id elit.
                </p>
              </div>
              <div className="col s12 m4 l4">
                <img src={bookVenueImge} alt="Book Venue" />;
                <h5>BOOK VENUE</h5>
                <p>
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Donec id elit non mi porta gravida at eget metus. Nullam id
                  dolor id nibh ultricies vehicula ut id elit.
                </p>
              </div>
            </div>
          </div>
          <div className="row center featured-centers">
            <div className="col s12 m12 l12">
              <hr />
              <h5>FEATURED CENTERS</h5>
            </div>
            {this.state.centers.map(center => (
              <Link to={`/center/${center.id}`} key={center.id}>
                <div className="col s12 m4 l4 card">
                  <div className="event-center">
                    <img src={featuredCenterImg} alt="Featured Center" />
                    <div className="over-img">
                      <h4 className="truncate">{center.name}</h4>
                      <p>{center.area}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Map redux state to component property
 *
 * @param {state} state - state to map to property
 * @return {object} - extracted properties from state
 */
const mapStateToProps = state => ({ centers: state.center.centers });
export default connect(mapStateToProps, { fetchAllCentersRequest })(Home);
