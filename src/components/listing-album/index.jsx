import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { Tabs } from "react-tabs";

import { toBase64 } from "../../services/image";
import { useModal } from "../modal/context";

import { Edit, Trash } from "../icons";

import {
  AddPhotosButton,
  EditSectionActions,
  EditSectionButton,
  EditSectionInput,
  GoBackButton,
  ListingAlbumContainer,
  NewSectionButton,
  NoPhotosAdded,
  RemoveImageButton,
  SectionImage,
  SectionImageContainer,
  SectionTab,
  SectionTabContent,
  SectionTabImageGrid,
  SectionTabs,
  SectionsActions,
  UploadPhotosInput,
} from "./styles";

export function ListingAlbum({
  handleGoBack,
  editable,
  album,
  handleAddSection,
  onSectionNameChange,
  onImagesUploaded,
  onImageRemoved,
}) {
  // refactor, to load state separately (remove sections images from backend listing get)
  // put it all on a react context, make ref to get images, new images and removed images.
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [edit, setEdit] = useState(false);

  const modal = useModal();

  const uploadPhotosRef = useRef(null);
  const editInputRef = useRef(null);

  const toggleEdit = () => {
    if (!editable) {
      return;
    }

    setEdit((old) => !old);
  };

  const handleSaveName = () => {
    if (!editable || !editInputRef.current || !onSectionNameChange) {
      return;
    }

    onSectionNameChange(activeSectionIndex, editInputRef.current.value);
    setEdit(false);
  };

  const handleOpenUpload = () => {
    if (!editable) {
      return;
    }

    uploadPhotosRef.current.click();
  };

  const onUploaded = useCallback(
    (event) => {
      if (!editable && !onImagesUploaded) {
        return;
      }

      const filesArray = Array.from(event.target.files);
      const images = filesArray.map((file) => {
        const url = URL.createObjectURL(file);

        const image = {
          url,
          base64: "",
        };

        toBase64(file).then((base64) => {
          image.base64 = base64;
        });

        return image;
      });

      onImagesUploaded(activeSectionIndex, images);
    },
    [editable, activeSectionIndex, onImagesUploaded]
  );

  const handleRemoveImage = useCallback(
    (imageIndex) => {
      if (!editable || !onImageRemoved) {
        return;
      }

      onImageRemoved(activeSectionIndex, imageIndex);
    },
    [editable, activeSectionIndex, onImageRemoved]
  );

  useEffect(() => {
    modal?.hideFooter?.();

    return () => modal?.showFooter?.();
  }, [modal]);

  useEffect(() => {
    modal?.setHeight?.("90vh");

    return () => modal?.setHeight?.(undefined);
  }, [modal]);

  return (
    <ListingAlbumContainer>
      <GoBackButton type="button" onClick={handleGoBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8.974"
          height="15.592"
          viewBox="0 0 8.974 15.592"
        >
          <path
            d="M8.349,13.654a1.046,1.046,0,0,0,.36.8l6.838,6.7a1,1,0,0,0,.729.3A1.037,1.037,0,0,0,17.322,20.4a1.074,1.074,0,0,0-.316-.747l-6.161-6,6.161-6a1.09,1.09,0,0,0,.316-.747,1.037,1.037,0,0,0-1.046-1.046,1,1,0,0,0-.729.3L8.709,12.846A1.078,1.078,0,0,0,8.349,13.654Z"
            transform="translate(-8.349 -5.858)"
            fill="#197572"
          />
        </svg>
        Go Back
      </GoBackButton>

      <Tabs
        selectedTabClassName="active"
        selectedTabPanelClassName="active"
        tabIndex={activeSectionIndex}
        onSelect={setActiveSectionIndex}
      >
        <SectionTabs>
          {album?.Sections.map((albumSection, index) => (
            <SectionTab key={index}>
              {index === activeSectionIndex && edit ? (
                <EditSectionInput
                  ref={editInputRef}
                  type="text"
                  defaultValue={albumSection.Section.name}
                />
              ) : (
                <span>{albumSection.Section.name}</span>
              )}

              {editable && index === activeSectionIndex && (
                <EditSectionActions>
                  {edit ? (
                    <>
                      <EditSectionButton type="button" onClick={toggleEdit}>
                        <FiX size={20} />
                      </EditSectionButton>
                      <EditSectionButton type="button" onClick={handleSaveName}>
                        <FiCheck size={20} />
                      </EditSectionButton>
                    </>
                  ) : (
                    <EditSectionButton type="button" onClick={toggleEdit}>
                      <Edit />
                    </EditSectionButton>
                  )}
                </EditSectionActions>
              )}
            </SectionTab>
          ))}

          {editable && (
            <SectionsActions>
              <NewSectionButton type="button" onClick={handleAddSection}>
                + New Section
              </NewSectionButton>

              <AddPhotosButton type="button" onClick={handleOpenUpload}>
                + Add Photos
              </AddPhotosButton>
            </SectionsActions>
          )}
        </SectionTabs>

        {album?.Sections.map((section, index) => (
          <SectionTabContent key={index}>
            {section.Images?.length ? (
              <SectionTabImageGrid>
                {section.Images.map((image, index) => {
                  let url;

                  if (image.key) {
                    url =
                      `https://rms-staging.s3.us-west-1.amazonaws.com/${image.key}`.replace(
                        /\\/g,
                        "%5C"
                      );
                  } else {
                    url = image.url;
                  }

                  return (
                    <SectionImageContainer key={index}>
                      <SectionImage src={url} />

                      {editable && (
                        <RemoveImageButton
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Trash />
                        </RemoveImageButton>
                      )}
                    </SectionImageContainer>
                  );
                })}
              </SectionTabImageGrid>
            ) : (
              <NoPhotosAdded>No Photos Added</NoPhotosAdded>
            )}
          </SectionTabContent>
        ))}
      </Tabs>

      {editable && (
        <UploadPhotosInput
          ref={uploadPhotosRef}
          type="file"
          multiple
          onChange={onUploaded}
        />
      )}
    </ListingAlbumContainer>
  );
}

ListingAlbum.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  album: PropTypes.object,
  handleAddSection: PropTypes.func,
  onSectionNameChange: PropTypes.func,
  onImagesUploaded: PropTypes.func,
  onImageRemoved: PropTypes.func,
};
