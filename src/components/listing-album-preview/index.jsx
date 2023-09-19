/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";

import { api } from "../../services/api";

import { Album as AlbumIcon } from "../icons";
import { ListingAlbum } from "../listing-album";

import { Album, AlbumImage, ViewAlbumButton } from "./styles";

const DEFAULT_NEW_SECTION = {
  isNew: true,
  Section: { name: 'NEW SECTION' },
  Images: []
}

const ListingAlbumPreviewWithRef = (
  {
    listingId,
    editable,
  },
  albumRef,
) => {
  const [originalAlbum, setOriginalAlbum] = useState(null);
  const [album, setAlbum] = useState(null);
  const [showAlbum, setShowAlbum] = useState(false);

  const albumImages = useMemo(() => {
    if (!album) {
      return []
    }
    
    const sectionsWithImages = album.Sections.filter(
      (section) => section && section.Images
    );
      
    return sectionsWithImages
      .map((section) => section.Images)
      .reduce((a, b) => [...a, ...b], []);
  }, [album]);

  const preview = useMemo(() => {
    if (!albumImages.length) {
      return null;
    }

    const previewImage = albumImages[0];

    if (previewImage.key) {
      return `https://rms-staging.s3.us-west-1.amazonaws.com/${previewImage.key}`
        .replace(/\\/g, "%5C");
    }

    return previewImage.url;
  }, [albumImages]);

  const toggleAlbum = () => setShowAlbum((old) => !old);

  const handleAddSection = useCallback(() => {  
    setAlbum(oldState => ({
      ...oldState,
      Sections: [...oldState.Sections, DEFAULT_NEW_SECTION]
    }))
  }, [])

  const onSectionNameChange = useCallback((albumSectionIndex, newName) => {
    setAlbum(oldState => ({
      ...oldState,
      Sections: oldState.Sections.map((section, index) => {
        if (index === albumSectionIndex) {
          return {
            ...section,
            Section: {
              ...section.Section,
              name: newName
            }
          }
        }

        return section
      })
    }))
  }, [])

  const onImagesUploaded = useCallback((albumSectionIndex, newImages) => {
    setAlbum(oldState => ({
      ...oldState,
      Sections: oldState.Sections.map((section, index) => {
        if (index === albumSectionIndex) {
          return {
            ...section,
            Images: [...section.Images, ...newImages]
          }
        }

        return section
      })
    }))
  }, [])

  const onImageRemoved = useCallback((albumSectionIndex, removedImageIndex) => {
    setAlbum(oldState => ({
      ...oldState,
      Sections: oldState.Sections.map((section, index) => {
        if (index === albumSectionIndex) {
          return {
            ...section,
            Images: section.Images.filter((_, imageIndex) => imageIndex !== removedImageIndex)
          }
        }

        return section
      })
    }))
  }, [])

  const getAlbum = useCallback(() => {
    if (!originalAlbum) {
      return album
    }

    const albumSectionsImages = album.Sections
      .map(({ Section, isNew, Images }) => Images.map(image => ({ ...image, Section, isNew })))
      .reduce((a, b) => [...a, ...b])
    const albumImagesIds = albumSectionsImages.map(image => image.id)

    const removedImages = originalAlbum.Sections
    .map(albumSection => albumSection.Images
      .filter(image => albumImagesIds.indexOf(image.id) === -1)
      .map(removedImage => ({
        sectionId: removedImage.AlbumSection.sectionId,
        imageId: removedImage.id
      })))
    .reduce((a, b) => [...a, ...b])

    const addedImages = albumSectionsImages.filter(image => !image.id && !image.isNew)
    
    const changedSections = album.Sections
      .filter(({ Section }, index) => originalAlbum.Sections[index]
        && originalAlbum.Sections[index].Section.name !== Section.name)
      .map(({ Section }) => Section)

    const addedSections = album.Sections
      .filter((section) => section.isNew)
      .map(({ Section, Images }) => ({ Section, Images }))

    return { removedImages, addedImages, changedSections, addedSections }
  }, [originalAlbum, album])

  useImperativeHandle(albumRef, () => ({ getAlbum }))

  useEffect(() => {
    async function loadListingAlbum() {
      try {
        const { data } = await api.get(`/listing/${listingId}/album`)

        setOriginalAlbum(data)
        setAlbum(data)
      } catch (err) {
        alert('Error loading listing album')
      }
    }

    if (listingId) {
      loadListingAlbum()
    } else {
      setAlbum({ Sections: [DEFAULT_NEW_SECTION] })
    }
  }, [listingId])

  if (showAlbum) {
    return (
      <ListingAlbum
        handleGoBack={toggleAlbum}
        editable={editable}
        album={album}
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
          : editable ? "+ Add Photos" : "No Photos Added"}
      </ViewAlbumButton>
    </Album>
  );
}

export const ListingAlbumPreview = forwardRef(ListingAlbumPreviewWithRef)