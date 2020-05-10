import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

import SearchBar from "./SearchBar";
import { Location } from "./types";

const US_LOCATION = { lat: 40.413993, lng: -99.034504 };
const DEFAULT_ZOOM = 4;
const GOT_LOCATION_ZOOM = 15;

type Map = {
  defaultLocation?: Location;
};

export default ({ defaultLocation }: Map) => {
  const [location, setLocation] = useState<Location>(
    defaultLocation || US_LOCATION
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <SearchBar setLocation={setLocation} />
      <GoogleMapReact
        center={location}
        zoom={location === US_LOCATION ? DEFAULT_ZOOM : GOT_LOCATION_ZOOM}
      ></GoogleMapReact>
    </div>
  );
};
