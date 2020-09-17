import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import Jump from "react-reveal/Jump";

const StyledMapMarkerWrapper = styled.div`
  background-color: ${({ theme }) => theme.redSalsa};
  color: white;
  width: 50px;
  height: 50px;
  padding: 12px 18px;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 100% 100% 100% 0;
  transform: rotate(-45deg);
`;
const StyledMapMarkerText = styled.span`
  transform: rotate(45deg);

  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const MapMarker = ({ text }) => (
  <Jump forever duration={2000} delay={2500}>
    <StyledMapMarkerWrapper>
      <StyledMapMarkerText>{text}</StyledMapMarkerText>
    </StyledMapMarkerWrapper>
  </Jump>
);

const StyledGoogleMapWrapper = styled.div`
  width: 600px;
  height: 500px;
  margin: auto;
`;
class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 54.51889,
      lng: 18.53188,
    },
    zoom: 11,
  };

  render() {
    const { center, zoom } = this.props;
    return (
      <StyledGoogleMapWrapper>
        <GoogleMapReact defaultCenter={center} defaultZoom={zoom}>
          <MapMarker text="here" />
        </GoogleMapReact>
      </StyledGoogleMapWrapper>
    );
  }
}

export default GoogleMap;
