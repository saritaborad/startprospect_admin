import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";

const Googlemap = withScriptjs(
    withGoogleMap(props => {
      return (
        <GoogleMap
          defaultZoom={18}
          center={{ lat: Number(props.latitude), lng: Number(props.longitude) }}
        >
          <Marker position={{ lat: Number(props.latitude), lng: Number(props.longitude) }} />
        </GoogleMap>
      );
    })
  );

  export default Googlemap;
