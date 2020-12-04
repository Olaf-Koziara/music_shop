import React from "react";
import GoogleMap from "../components/GoogleMap";
import Slider from "../components/Slider";
import slidesArray from "../assets/aboutSlider/slidesArray";
import styled from "styled-components";

const StyledSliderWrapper = styled.div`
  margin-bottom: 100px;
`;
const About = () => {
  return (
    <div>
   
      <StyledSliderWrapper>
        <Slider slides={slidesArray} />
      </StyledSliderWrapper>
      <GoogleMap />
    </div>
  );
};

export default About;
