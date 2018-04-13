import React from 'react';

export class Map extends React.Component {
  componentDidMount() {
    const google = window.google;

    const geocoder = new google.maps.Geocoder();

    const address = '11 Oguntade Street, Iju, Lagos, Nigeria';

    geocoder.geocode({ address }, (results, status) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 15,
        mapTypeId: 'roadmap',
      });
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });
      } else {
        console.log(status);
      }
    });
  }

  render() {
    return (
      <div id="map" style={{ width: '300px', height: '300px' }}>
        Loading map...
      </div>
    );
  }
}
export default Map;
