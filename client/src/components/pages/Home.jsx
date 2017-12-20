import React, { Component } from "react";
import { Link } from "react-router-dom";
import bannercenter from "../../images/banner-center2.png";
import checkAvailabilityImg from "../../images/icons/calendar-check.png";
import searchForCenterImg from "../../images/icons/searching-for-a-house.png";
import bookVenueImge from "../../images/icons/calendar-book1.png";
import featuredCenterImg from "../../images/party-room.jpg";

import $ from "jquery";
import "materialize-css";

export class Home extends Component {
  componentWillMount() {
    $(document).ready(function() {
      $(".carousel.carousel-slider").carousel({ fullWidth: true });
    });
  }
  render() {
    return (
      <div>
        <div className="search_slider_panel">
          <div className="carousel carousel-slider banner">
            <Link className="carousel-item" to="#one!">
              <img src={bannercenter} alt="Index Center Banner" />
            </Link>
            <Link className="carousel-item" to="#two!">
              <img src={bannercenter} alt="Index Center Banner" />
            </Link>
            <Link className="carousel-item" to="#three!">
              <img src={bannercenter} alt="Index Center Banner" />
            </Link>
          </div>
          {/*
            <div className="searchEvent_panel">
                <h2 className="intro_title">FIND AND BOOK EVENT CENTERS IN NIGERIA</h2>
            </div>
            */}
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
          <div className="row center event_center">
            <h5>FEATURED CENTERS</h5>
            <div className="col s12 m4 l4 card list-item">
              <div className="card-panel list-center no-padding relative">
                <img src={featuredCenterImg} alt="Featured Center" />
                <div className="over-img">
                  <h4 className="white-text">Royal Court</h4>
                  <p className="white-text">Lagos</p>
                  <p className="white-text">CCTV, Air Conditional, Projector</p>
                </div>
              </div>
            </div>
            <div className="col s12 m4 l4 card list-item">
              <div className="card-panel list-center no-padding relative">
                <img src={featuredCenterImg} alt="Featured Center" />
                <div className="over-img">
                  <h4 className="white-text">Royal Court</h4>
                  <p className="white-text">Lagos</p>
                  <p className="white-text">CCTV, Air Conditional, Projector</p>
                </div>
              </div>
            </div>
            <div className="col s12 m4 l4 card list-item">
              <div className="card-panel list-center no-padding relative">
                <img src={featuredCenterImg} alt="Featured Center" />
                <div className="over-img">
                  <h4 className="white-text">Royal Court</h4>
                  <p className="white-text">Lagos</p>
                  <p className="white-text">CCTV, Air Conditional, Projector</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
