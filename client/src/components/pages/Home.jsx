import React from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css';
import bannercenter from '../../images/banner-center2.png';
import checkAvailabilityImg from '../../images/icons/calendar-check.png';
import searchForCenterImg from '../../images/icons/searching-for-a-house.png';
import bookVenueImge from '../../images/icons/calendar-book1.png';
import OverlaySearch from '../containers/OverlaySearch';
import FeaturedCenter from '../containers/FeaturedCenter';

/**
 * Home page component
 *
 * @class Home
 * @extends {Component}
 */
const Home = () => (
  <div>
    <div className="search_slider_panel">
      <div className="carousel carousel-slider banner">
        <Link className="carousel-item" to="#one!" href="#one!">
          <img src={bannercenter} alt="Center Banner" />
        </Link>
        <Link className="carousel-item" to="#two!" href="#two!">
          <img src={bannercenter} alt="Center Banner" />
        </Link>
        <Link className="carousel-item" to="#three!" href="#three!">
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
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec
              id elit non mi porta gravida at eget metus. Nullam id dolor id
              nibh ultricies vehicula ut id elit.
            </p>
          </div>
          <div className="col s12 m4 l4">
            <img src={bookVenueImge} alt="Book Venue" />;
            <h5>BOOK VENUE</h5>
            <p>
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec
              id elit non mi porta gravida at eget metus. Nullam id dolor id
              nibh ultricies vehicula ut id elit.
            </p>
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

export default Home;
