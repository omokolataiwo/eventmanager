import React from 'react';
import { STATES } from '../../consts';

/**
 * Google Map
 *
 * @class Map
 * @extends {React.Component}
 */
class Map extends React.Component {
  /**
   * Initialize google map
   *
   * @returns {object} - Google object
   * @memberof Map
   */
  componentDidMount() {
    const { google } = window;

    const geocoder = new google.maps.Geocoder();

    const address = `${this.props.address}, ${STATES[this.props.state]}`;

    geocoder.geocode({ address }, (results, status) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 15,
        mapTypeId: 'roadmap'
      });
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        const gMap = new google.maps.Marker({
          map,
          position: results[0].geometry.location
        });
        return gMap;
      }
    });
  }

  /**
   * Renders google map
   *
   * @returns {object} JSX DOM
   * @memberof Map
   */
  render() {
    return (
      <div id="map" style={{ width: '300px', height: '300px' }}>
        Loading map...
      </div>
    );
  }
}
export default Map;
