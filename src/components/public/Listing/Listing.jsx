import bath from "../../../assets/img/bath.svg";
import bed from "../../../assets/img/bed.svg";
import PropTypes from "prop-types";
import { createListingImage } from "../../../services/listing";
import { PublicListing } from "./styles";

const Listing = ({ listing, handleImageClick }) => {
  return (
    <PublicListing>
      <img
        className="imgPublic"
        src={createListingImage(listing)}
        onClick={() => handleImageClick(listing.id)}
      />
      <div className="description d-flex col">
        <div className="spects d-flex flex-column justify-content-center align-items-start">
          <p className="publicPrice price">
            $&nbsp;
            {listing.price
              ? parseFloat(listing.price).toLocaleString("en", {
                  useGrouping: true,
                })
              : ""}
            &nbsp;
            <span className="strong"> per month</span>
          </p>
          <p className="spect house_size">
            HOUSE{" "}
            <span className="strong">
              {listing.houseSize
                ? listing.houseSize.toLocaleString("EN", {
                    maximumFractionDigits: 0,
                  })
                : ""}
              &nbsp;SQ. FT.
            </span>
          </p>

          <p className="spect lot_size">
            LOT{" "}
            <span className="strong">
              {listing.lotSize
                ? listing.lotSize.toLocaleString("EN", {
                    maximumFractionDigits: 0,
                  })
                : ""}{" "}
              &nbsp;SQ. FT.
            </span>
          </p>
        </div>
        <div className="spects2">
          <p className="spectText d-flex justify-content-end location mt-3">
            {listing.location.split(",")[2].trim()},{" "}
            {listing.location
              .split(",")[3]
              .trim()
              .substring(0, 1)
              .toUpperCase()}
            {listing.location
              .split(",")[3]
              .trim()
              .substring(1, 2)
              .toLowerCase()}
          </p>
          <div className="icons1 d-flex justify-content-end">
            <span className="nbedbath">{listing.bedrooms}</span>
            <img className="bed bedrooms" src={bed} />
            <span className="nbedbath bathrooms">{listing.bathrooms}</span>
            <img className="bath" src={bath} />
          </div>
          <p className="listingNumber d-flex justify-content-end mt-2 id">
            # {listing.id.toString().padStart(6, "0")}
          </p>
        </div>
      </div>
    </PublicListing>
  );
};

export default Listing;

Listing.propTypes = {
  listing: PropTypes.object.isRequired,
  handleImageClick: PropTypes.func.isRequired,
};
