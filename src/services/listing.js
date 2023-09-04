export const createListingImage = (listing) => {
  let image = null;

  if (listing.Sections[0]?.Album.Images[0]) {
    const key = listing.Sections[0]?.Album.Images[0].key;

    image = `https://rms-staging.s3.us-west-1.amazonaws.com/${key}`.replace(
      /\\/g,
      "%5C"
    );
  }

  return image;
};
