import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { styled } from "styled-components";
import { BtnBackToSearch, BtnGallery } from "./styles";
import ChevronLeft from "../../../assets/img/chevron.left (1).svg";
import { useState } from "react";
const CarouselContainer = styled.div``;

const ListingCarousel = ({ images, handleBackToSearch, handleShowAlbum }) => {
  const [count, setCount] = useState(1);

  const handlePlusCount = () => {
    if (count === images.length) {
      setCount(1);
    } else {
      setCount(count + 1);
    }
  };

  const handleMinusCount = () => {
    if (count === 1) {
      setCount(images.length);
    } else {
      setCount(count - 1);
    }
  };

  const renderImages = (listingImage) => {
    let image = null;
    if (listingImage) {
      const key = listingImage.key;
      image = `https://rms-staging.s3.us-west-1.amazonaws.com/${key}`.replace(
        /\\/g,
        "%5C"
      );
    }
    return image;
  };

  return (
    <CarouselContainer
      id="carouselExampleControls"
      className="carousel   w-100 d-flex align-items-center justify-content-center"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""} `}
            key={image.id}
          >
            <img
              className="d-block w-100"
              src={renderImages(image)}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        role="button"
        data-slide="prev"
        href="#carouselExampleControls"
        onClick={handleMinusCount}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        role="button"
        data-slide="next"
        href="#carouselExampleControls"
        onClick={handlePlusCount}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      <BtnBackToSearch onClick={handleBackToSearch}>
        <img
          src={ChevronLeft}
          alt="ChevronLeft"
          style={{ width: "8px", marginRight: "9px" }}
        />
        Back To Search Results
      </BtnBackToSearch>
      <BtnGallery onClick={handleShowAlbum}>
        {count}/{images.length}
      </BtnGallery>
    </CarouselContainer>
  );
};

export default ListingCarousel;
