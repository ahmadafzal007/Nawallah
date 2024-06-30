import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '400px',
    };

    return (
      <div>
        <h1>Google Map Test</h1>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: -34.397, lng: 150.644 }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBgfj1d3-rPRMKfpfjdOmRKuyVpLsu_tPc' // Replace with your actual API key
})(MapContainer);
