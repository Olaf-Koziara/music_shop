import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import styled from "styled-components";

const AutoplaySlider = withAutoplay(AwesomeSlider);
const StyledSlider = styled(AutoplaySlider)`
  width: 80%;
  height: 100%;
  margin: auto;
  border-radius: 20px;
`;
const StyledSliderWrapper = styled.div`
  width: 80%;
  height: 100%;
  margin: auto;
  border-radius: 20px;
`;
const Slider = ({ slides }) => (
  <StyledSliderWrapper>
    <StyledSlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={3500}
      bullets
    >
      {slides.map((slide) => (
        <div data-src={slide} />
      ))}
    </StyledSlider>
  </StyledSliderWrapper>
);
export default Slider;
