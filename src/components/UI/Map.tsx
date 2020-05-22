import algoliasearch from "algoliasearch/lite";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import {
  GeoSearch,
  Control,
  GoogleMapsLoader,
  Marker as OriginalMarker,
} from "react-instantsearch-dom-maps";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { Location } from "./types";

const Marker = styled(OriginalMarker)`
  height: 100px;
  width: 100px;
  background: black;
`;

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID!,
  process.env.REACT_APP_ALGOLIA_READ_ONLY_API_KEY!
);
const US_LOCATION = { lat: 40.413993, lng: -99.034504 };

type Map = {
  defaultLocation?: Location;
};

type THitComponent = {
  hit: {
    siteName?: string;
  };
};

const HitComponent = ({ hit }: THitComponent) => <div>{hit.siteName}</div>;

export default ({ defaultLocation }: Map) => {
  const [location, setLocation] = useState<Location>(
    defaultLocation || US_LOCATION
  );

  return (
    <GoogleMapsLoader
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      endpoint={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
    >
      {(google: any) => (
        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.REACT_APP_ALGOLIA_INDEX!}
        >
          {location ? (
            <Configure
              aroundLatLng={`${location.lat}, ${location.lng}`}
              aroundRadius="all"
            />
          ) : (
            <Configure aroundLatLngViaIP />
          )}

          <SearchBar setLocation={setLocation} />
          <div className="search-container">
            <div className="right-panel">
              <div id="map">
                <GeoSearch google={google}>
                  {({ hits }) => (
                    <div>
                      <Control />
                      {hits.map((hit) => (
                        <Marker key={hit.objectID} hit={hit} />
                      ))}
                    </div>
                  )}
                </GeoSearch>
              </div>
            </div>
            <div className="left-panel">
              <Hits hitComponent={HitComponent} />
            </div>
          </div>
        </InstantSearch>
      )}
    </GoogleMapsLoader>
  );
};
