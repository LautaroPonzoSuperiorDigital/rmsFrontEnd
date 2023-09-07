import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ListingCarousel = ({ images }) => {
  const renderImages = (listingImage) => {
    let image = null;
    if (listingImage) {
      const key = listingImage.key; // Fix: Access 'key' property from 'listingImage', not 'image'
      image = `https://rms-staging.s3.us-west-1.amazonaws.com/${key}`.replace(
        /\\/g,
        "%5C"
      );
    }
    return image;
  };

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide h-100 w-100 d-flex align-items-center justify-content-center"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={image.id}
          >
            <img
              className="d-block w-100"
              src={renderImages(image)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        role="button"
        data-slide="prev"
        href="#carouselExampleControls"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        role="button"
        data-slide="next"
        href="#carouselExampleControls"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default ListingCarousel;
