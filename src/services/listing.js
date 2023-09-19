import DefaultImage from "./../assets/img/defaultImage.png";
import { api } from "./api";

export const createListingImage = async (listing) => {
  const { data } = await api.get(`/listing/${listing.id}/album`);
  let image = DefaultImage;

  if (data?.Sections[0]?.Images[0]) {
    const key = data?.Sections[0]?.Images[0].key;
    image = `https://rms-staging.s3.us-west-1.amazonaws.com/${key}`.replace(
      /\\/g,
      "%5C"
    );
  }

  return image;
};
