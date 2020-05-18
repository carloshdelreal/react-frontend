import algoliasearch from 'algoliasearch/lite';
import React, { useState } from "react";
import InfoPopover from "./InfoPopover";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Configure, Hits, InstantSearch } from 'react-instantsearch-dom';
import GoogleMapReact from "google-map-react";
import { GoogleApiWrapper } from "google-maps-react";
import { GeoSearch, Control, Marker } from 'react-instantsearch-dom-maps';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const US_LOCATION = { lat: 40.413993, lng: -99.034504 };
const DEFAULT_ZOOM = 4;
const GOT_LOCATION_ZOOM = 15;


const HitComponent = ({ hit }) => (<div>{hit.siteName}</div>);

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID!,
  process.env.REACT_APP_ALGOLIA_READ_ONLY_API_KEY!
);

const [locationSearch, setLocationSearch] = useState("");

const [{ location: any }, setLocation] = useState<Location>(US_LOCATION);

const handleSelect = async (locationSelected: string) => {
  setLocationSearch(locationSelected);
  const geo = await geocodeByAddress(locationSelected);
  setLocation(await getLatLng(geo[0]));
};

const Suggestions = styled("div")`
  position: absolute;
  border: 1px solid gray;
  z-index: 1000;
  background: white;
`;

const Suggestion = styled("div")`
  border-bottom: 1px solid gray;
  padding: 5px;
  cursor: pointer;
`;

const SearchBarContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const SearchBarContainerInner = styled("div")`
  width: 800px;
`;

function App() {
  return (
    <div className="App">
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.REACT_APP_ALGOLIA_INDEX!}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              alt="Project Ending Hunger Logo"
              style={{ width: 99, height: 29 }}
              src={require("./assets/images/ProjectEndingHunger.png")}
            />
          </div>
          <PlacesAutocomplete
            value={locationSearch}
            onChange={setLocationSearch}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <SearchBarContainer>
                <SearchBarContainerInner>
                  <form>
                    <InputGroup>
                      <FormControl
                        id="location"
                        placeholder="Enter a Zip Code, Neighborhood and City, or Full Address"
                        {...getInputProps()}
                      />
                      <InputGroup.Append>
                        <Button variant="info">Search</Button>
                      </InputGroup.Append>
                    </InputGroup>

                    <Suggestions>
                      {!loading &&
                        suggestions.map((suggestion) => (
                          <Suggestion
                            {...getSuggestionItemProps(suggestion)}
                            key={suggestion.description}
                          >
                            {suggestion.description}
                          </Suggestion>
                        ))}
                    </Suggestions>
                  </form>
                </SearchBarContainerInner>
              </SearchBarContainer>
            )}
          </PlacesAutocomplete>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "12.5vw",
          }}>
            <InfoPopover title="About">
              <p>
                TODO: add actual about
                Darcie is an automated phone line anyone can call to find human
                services near them, such as free food, legal assistance,
                non-emergency medical help, and more. Read more and watch a live
                stream of the conversations at
              <a href="http://www.darcie.me">darcie.me</a>
                <br />
                <b>COVID-19 Update</b> Darcie was intended to pull from all
              services listed in the
              <a href="https://sfserviceguide.org/">SF Service Guide</a>,
              however in the current times the format of the data in that
              database (a.k.a.
              <a href="https://github.com/sheltertechsf/askdarcel-api">
                  AskDarcel on github
              </a>
              ) made it hard to keep the information up to date with service
              hours & offerings changing. We pivoted Darcie to pull from a
              separate Algolia index which consists of all hygiene stations &
              places handing out food in SF. The dialog has been
              adopted accordingly.
            </p>
            </InfoPopover>
            <InfoPopover title="Contact">
              <p>
                TODO: add actual Contact info
                Contributing, Branching, & Forking While we actively accept help,
                as well as encourage you to fork this repo and build it out for
                your city, we do not take pull requests directly to this repo -
              please contact us before you plan to do so. Reach out to: <br />
              Repo{" "}
                <a href="https://github.com/ShelterTechSF/VACS-MVP">
                  Github
              </a>{" "}
                <br />
              Twitter{" "}
                <a href="https://twitter.com/dariceshelter">@dariceshelter</a>
              </p>
            </InfoPopover>
          </div>
        </div>
        {location ? (
          <Configure aroundLatLng={`${location.lat}, ${location.lng}`} />
        ) : (
            <Configure aroundLatLngViaIP aroundRadius="all" />
          )}
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
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  // @ts-ignore
})(App);
