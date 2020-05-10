import React from 'react';
import { GoogleApiWrapper } from "google-maps-react";

import Map from './Map';

export default {
  title: 'Map',
  component: Map,
};

const wrapWithGoogleApi = (Component) => (
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // @ts-ignore
  })(Component)
)

const Container = wrapWithGoogleApi(Map)

export const Default = () => <Container />

export const Zoomed = () => <Container defaultLocation={{ lat: 37.7749, lng: -122.4194 }} />