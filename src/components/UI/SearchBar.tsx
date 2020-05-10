import React, { useState } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { InputGroup, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";

import { SetLocation } from "./types";

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
  );
};
