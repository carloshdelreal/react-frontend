import algoliasearch from 'algoliasearch/lite';
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Configure, Hits, InstantSearch, Panel } from 'react-instantsearch-dom';
import { GeoSearch, Control, Marker } from 'react-instantsearch-dom-maps';
import SearchBar from "./SearchBar";
import { Location } from "./types";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID!,
  process.env.REACT_APP_ALGOLIA_READ_ONLY_API_KEY!
);
const US_LOCATION = { lat: 40.413993, lng: -99.034504 };
const DEFAULT_ZOOM = 4;
const GOT_LOCATION_ZOOM = 15;

type Map = {
  defaultLocation?: Location;
};

type THitComponent = {
  siteName?: string;
};

const HitComponent = ({ siteName }: THitComponent) => (<div>{siteName}</div>);

export default ({ defaultLocation }: Map) => {
  const [location, setLocation] = useState<Location>(
    defaultLocation || US_LOCATION
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_ALGOLIA_INDEX!}>
      {location ? (
        <Configure aroundLatLng={`${location.lat}, ${location.lng}`} />
      ) : (
          <Configure aroundLatLngViaIP aroundRadius="all" />
        )}
      <SearchBar setLocation={setLocation} />
      <div className="search-container">
        <div className="right-panel">
          <div id="map">
            <GoogleMapReact
              center={location}
              zoom={location === US_LOCATION ? DEFAULT_ZOOM : GOT_LOCATION_ZOOM}>
              {(google: any) => (
                <GeoSearch google={google}>
                  {({ hits }) => (
                    <div>
                      <Control />
                      {hits.map(hit => (
                        <Marker key={hit.objectID} hit={hit} />
                      ))}
                    </div>
                  )}
                </GeoSearch>
              )}
            </GoogleMapReact>
          </div>
        </div>
        <div className="left-panel">
          <Hits {...HitComponent} />
        </div>
      </div>
    </InstantSearch>
  );
};
