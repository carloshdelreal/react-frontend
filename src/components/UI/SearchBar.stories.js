import React, { useState } from 'react';
import { GoogleApiWrapper } from "google-maps-react";

import SearchBar from './SearchBar';

export default {
  title: 'SearchBar',
  component: SearchBar,
};

const wrapWithGoogleApi = (Component) => (
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // @ts-ignore
  })(Component)
)

const Container = wrapWithGoogleApi(({ Child }) => {
  const [location, setLocation] = useState([]);

  return <Child location={location} setLocation={setLocation} />
})

export const Default = () => <Container Child={SearchBar} />