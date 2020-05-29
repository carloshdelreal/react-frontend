import React, { useState } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { InputGroup, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";

import { SetLocation } from "./types";
import Menu from "./Menu";

const TopBarContainer = styled("div")`
  display: flex;

  position: absolute;
  /* including Results width */
  left: 380px;
  right: 80px;
  top: 20px;
  z-index: 500;

  @media (max-width: 980px) {
    left: 20px;
  }
`;

const Suggestions = styled("div")`
  position: absolute;
  border: 1px solid gray;
  z-index: 1000;
  background: white;
  width: 100%;
`;

const Suggestion = styled("div")`
  border-bottom: 1px solid gray;
  padding: 5px;
  cursor: pointer;
`;

const SearchBarContainer = styled("div")`
  display: flex;
  justify-content: center;
  z-index: 1000;

  flex: 1;
`;

const SearchBarContainerInner = styled("div")`
  width: 100%;
  position: relative;
`;

type SearchBarProps = {
  setLocation: SetLocation;
};

export default ({ setLocation }: SearchBarProps) => {
  const [locationSearch, setLocationSearch] = useState("");

  const handleSelect = async (locationSelected: string) => {
    setLocationSearch(locationSelected);
    const geo = await geocodeByAddress(locationSelected);
    setLocation(await getLatLng(geo[0]));
  };

  return (
    <TopBarContainer>
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
      <Menu />
    </TopBarContainer>
  );
};
