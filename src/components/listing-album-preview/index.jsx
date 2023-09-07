import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import { Album as AlbumIcon } from "../icons";
import { ListingAlbum } from "../listing-album";

import { Album, AlbumImage, ViewAlbumButton } from "./styles";

export function ListingAlbumPreview({
  editable,
  listingSections,
  handleAddSection,
  onSectionNameChange,
  onImagesUploaded,
  onImageRemoved,
}) {
  const [showAlbum, setShowAlbum] = useState(false);

  const albumImages = useMemo(() => {
    const sectionsWithImages = listingSections.filter(
      (section) => section && section.Album && section.Album.Images
    );

    return sectionsWithImages
      .map((section) => section.Album.Images)
      .reduce((a, b) => [...a, ...b], []);
  }, [listingSections]);

  const preview = useMemo(() => {
    if (!albumImages.length) {
      return null;
    }

    const previewImage = albumImages[0];

    if (previewImage.key) {
      return `https://rms-staging.s3.us-west-1.amazonaws.com/${previewImage.key}`.replace(
        /\\/g,
        "%5C"
      );
    }

    return previewImage.url;
  }, [albumImages]);

  const toggleAlbum = () => setShowAlbum((old) => !old);

  if (showAlbum) {
    return (
      <ListingAlbum
        handleGoBack={toggleAlbum}
        editable={editable}
        listingSections={listingSections}
        handleAddSection={handleAddSection}
        onSectionNameChange={onSectionNameChange}
        onImagesUploaded={onImagesUploaded}
        onImageRemoved={onImageRemoved}
      />
    );
  }

  return (
    <Album>
      {preview ? <AlbumImage src={preview} alt="Album Image" /> : <AlbumIcon />}

      <ViewAlbumButton
        type="button"
        onClick={toggleAlbum}
        data-has-image={!!albumImages.length}
        // disabled={isSaving}
      >
        {albumImages.length
          ? `${editable ? "Edit Album" : "View Album"} (${albumImages.length})`
          : "+ Add Photos"}
      </ViewAlbumButton>
    </Album>
  );
}

ListingAlbumPreview.propTypes = {
  editable: PropTypes.bool.isRequired,
  listingSections: PropTypes.array.isRequired,
  handleAddSection: PropTypes.func,
  onSectionNameChange: PropTypes.func,
  onImagesUploaded: PropTypes.func,
  onImageRemoved: PropTypes.func,
};
