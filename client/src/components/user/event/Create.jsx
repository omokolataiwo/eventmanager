import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import featuredCenterImg from '../../../images/party-room.jpg';
import { fetchAllCentersRequest } from '../../../store/actions/action_creators/fetchAllCentersRequest';
import { createEventRequest } from '../../../store/actions/action_creators/createEventRequest';
import { CenterDetailsSimple } from '../../admin/center/CenterDetailsSimple';
import { STATES } from '../../ui/consts';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        title: 'Happy Party',
        start: '2018-03-21',
        end: '2018-03-22',
        centerid: '',
      },
      centers: [],
      activeCenter: 0,
    };
  }
  componentWillMount() {
    this.props.fetchCenters(this.props.accessToken);
    this.setState({ centers: this.props.centers }, () => {
      const choicedCenter = localStorage.getItem('choice-center');
      const centerid = choicedCenter || this.state.centers[this.state.activeCenter].id;
      this.setState({
        event: { ...this.state.event, centerid },
      });
    });
  }
  changeActiveCenter(activeCenter) {
    this.setState({ activeCenter });
    this.setState({
      event: { ...this.state.event, centerid: this.state.centers[activeCenter].id },
    });
  }
  createEvent(e) {
    e.preventDefault();
    this.props.createEvent(this.state.event, this.props.accessToken);
  }
  render() {
    return (
      <div className="container container-medium card">
        <h5>Create Event</h5>
        <form>
          <div className="row">
            <div className="col input-field s12 m8 l8">
              <input
                type="text"
                className="validate"
                id="event-title"
                onChange={e =>
                  this.setState({ event: { ...this.state.event, title: e.target.value } })
                }
                defaultValue={this.state.event.title}
              />
              <label htmlFor="event-title">Event Title</label>
            </div>
            <div className="row">
              <div className="input-field col s12 m6 l6">
                <input
                  id="start-date"
                  type="text"
                  className="validate"
                  onChange={e =>
                    this.setState({ event: { ...this.state.event, start: e.target.value } })
                  }
                  defaultValue={this.state.event.start}
                />
                <label htmlFor="start-date">Start Date</label>
              </div>

              <div className="input-field col s12 m6 l6">
                <input
                  id="end-date"
                  type="text"
                  className="validate"
                  onChange={e =>
                    this.setState({ event: { ...this.state.event, end: e.target.value } })
                  }
                  defaultValue={this.state.event.end}
                />
                <label htmlFor="end-date">End Date</label>
              </div>
            </div>
          </div>

          <CenterDetailsSimple center={this.state.centers[this.state.activeCenter]} />
          <button className="btn" onClick={e => this.createEvent(e)}>
            Book Center
          </button>
        </form>

        <hr />
        <div className="row">
          <div className="col s12 m12 l12">
            <h5>Related Centers</h5>
          </div>
        </div>
        <div className="row center event_center">
          <div className="col s12 m12 l12">
            <div className="row">
              {this.state.centers.map((center, index) => (
                <div
                  className="col s12 m4 l4 card"
                  key={center.id}
                  onClick={() => this.changeActiveCenter(index)}
                  role="button"
                  tabIndex="-20"
                  onKeyUp={() => this.changeActiveCenter(index)}
                >
                  <div className="event-center">
                    <img src={featuredCenterImg} alt="Event Center" />
                    <div className="over-img">
                      <h4 className="truncate">{center.name}</h4>
                      <p>{STATES[center.state]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col s12 m12 l12">
            <ul className="pagination">
              <li className="disabled">
                <a href="#!">
                  <i className="mdi-navigation-chevron-left" />
                </a>
              </li>
              <li className="active">
                <a href="#!">1</a>
              </li>
              <li className="waves-effect">
                <a href="#!">2</a>
              </li>
              <li className="waves-effect">
                <a href="#!">3</a>
              </li>
              <li className="waves-effect">
                <a href="#!">4</a>
              </li>
              <li className="waves-effect">
                <a href="#!">5</a>
              </li>
              <li className="waves-effect">
                <a href="#!">
                  <i className="mdi-navigation-chevron-right" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  fetchCenters: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  createEvent: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchCenters: accessToken => dispatch(fetchAllCentersRequest(accessToken)),
  createEvent: (event, accessToken) => dispatch(createEventRequest(event, accessToken)),
});

const mapStateToProps = (state) => {
  const { accessToken } = state.user;
  const { centers } = state.center;
  return { accessToken, centers };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
