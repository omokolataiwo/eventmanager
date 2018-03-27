import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import 'materialize-css';
import { fetchAllCentersRequest } from '../../store/actions/action_creators/fetchAllCentersRequest';
import bannercenter from '../../images/banner-center2.png';
import checkAvailabilityImg from '../../images/icons/calendar-check.png';
import searchForCenterImg from '../../images/icons/searching-for-a-house.png';
import bookVenueImge from '../../images/icons/calendar-book1.png';
import featuredCenterImg from '../../images/party-room.jpg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
    };
  }
  componentWillMount() {
    this.props.getCenters();
    this.setState({ centers: this.props.centers });
  }
  componentDidMount() {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
  }
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
                  Find your best suited Events Venues across Nigeria, including pricing, special
                  offers, reviews.
                </p>
              </div>
              <div className="col s12 m4 l4">
                <img src={checkAvailabilityImg} alt="Check Availability" />
                <h5>CHECK AVAILABILITY</h5>
                <p>
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
                  porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id
                  elit.
                </p>
              </div>
              <div className="col s12 m4 l4">
                <img src={bookVenueImge} alt="Book Venue" />;
                <h5>BOOK VENUE</h5>
                <p>
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
                  porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id
                  elit.
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
const mapDispatchToProps = dispatch => ({
  getCenters: () => dispatch(fetchAllCentersRequest()),
});
const mapStateToProps = state => ({ centers: state.center.centers });
export default connect(mapStateToProps, mapDispatchToProps)(Home);
