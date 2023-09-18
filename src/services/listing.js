import DefaultImage from "./../assets/img/defaultImage.png";
import { api } from "./api";

export const createListingImage = (listing, callback) => {
  let image = DefaultImage;

  api
    .get(`/listing/${listing.id}/album`)
    .then((response) => {
      const data = response.data;
      if (data?.Sections[0]?.Images[0]) {
        const key = data?.Sections[0]?.Images[0].key;
        image = `https://rms-staging.s3.us-west-1.amazonaws.com/${key}`.replace(
          /\\/g,
          "%5C"
        );
      }
      callback(image);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      callback(image); // Return the default image in case of an error
    });
};
