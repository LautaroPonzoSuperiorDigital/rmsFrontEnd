import bath from "../../../assets/img/bath.svg";
import bed from "../../../assets/img/bed.svg";
import PropTypes from "prop-types";
import { createListingImage } from "../../../services/listing";
import {
  PublicListing,
  ListingPublicImg,
  ListingPublicDescription,
  ListingPriceLocation,
  Text,
  PriceText,
  SpanPrince,
  LocationText,
  FieldName,
  FieldValue,
} from "./styles.js";

const Listing = ({ listing, handleImageClick }) => {
  return (
    <PublicListing>
      <ListingPublicImg
        src={createListingImage(listing)}
        onClick={() => handleImageClick(listing.id)}
      />

      <ListingPublicDescription>
        <ListingPriceLocation>
          <PriceText>
            $&nbsp;
            {listing.price
              ? parseFloat(listing.price).toLocaleString("en", {
                  useGrouping: true,
                })
              : ""}
            &nbsp;
            <SpanPrince> per month</SpanPrince>
          </PriceText>

          <LocationText>
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
          </LocationText>
        </ListingPriceLocation>
        <div>
          <ListingPriceLocation>
            <FieldName>
              HOUSE{" "}
              <FieldValue className="strong">
                {listing.houseSize
                  ? listing.houseSize.toLocaleString("EN", {
                      maximumFractionDigits: 0,
                    })
                  : ""}
                &nbsp;SQ. FT.
              </FieldValue>
            </FieldName>
            <div className=" d-flex justify-content-end align-items-center">
              <span className="nbedbath">{listing.bedrooms}</span>
              <img className="bed bedrooms" src={bed} />
              <span className="nbedbath bathrooms">{listing.bathrooms}</span>
              <img className="bath" src={bath} />
            </div>
          </ListingPriceLocation>
          <ListingPriceLocation>
            <FieldName>
              LOT:{" "}
              <FieldValue>
                {listing.lotSize
                  ? listing.lotSize.toLocaleString("EN", {
                      maximumFractionDigits: 0,
                    })
                  : ""}{" "}
                &nbsp;SQ. FT.
              </FieldValue>
            </FieldName>
            <Text># {listing.id.toString().padStart(6, "0")}</Text>
          </ListingPriceLocation>
        </div>
      </ListingPublicDescription>
    </PublicListing>
  );
};

export default Listing;

Listing.propTypes = {
  listing: PropTypes.object.isRequired,
  handleImageClick: PropTypes.func.isRequired,
};
