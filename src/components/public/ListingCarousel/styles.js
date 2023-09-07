import { styled } from "styled-components";
import { Carousel } from "react-responsive-carousel";

export const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomCarousel = styled(Carousel)`
  /* Change arrow color to red */
  .control-prev.control-arrow,
  .control-next.control-arrow {
    color: red;
  }

  /* Optionally, you can style other aspects of the arrows, like size or background color */
  .control-arrow {
    background-color: transparent; /* Set arrow background color to transparent */
    font-size: 24px; /* Set arrow font size */
    /* Add other styles as needed */
  }
`;
