import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { styled } from "styled-components";
import { BtnBackToSearch, BtnGallery, ImgCarousel } from "./styles";
import ChevronLeft from "../../../assets/img/chevron.left (1).svg";
import camera from "../../../assets/img/camera.svg";
import { useState } from "react";
const CarouselContainer = styled.div`
  height: 100%;
`;

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
      <div className="carousel-inner h-100 ">
        {images.map((image, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""} h-100`}
            key={image.id}
          >
            <ImgCarousel className="d-block w-100" src={renderImages(image)} />
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={camera} alt="image" />
          <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
            {count}/{images.length}
          </p>
        </div>
      </BtnGallery>
    </CarouselContainer>
  );
};

export default ListingCarousel;
