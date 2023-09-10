import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { Tabs } from "react-tabs";

import { toBase64 } from "../../../../services/image";
import { useModal } from "../../../modal/context";

import { Edit, Trash } from "../../../icons";

import {
  BlackOverlay,
  CloseButton,
  GoBackButton,
  ListingAlbumContainer,
  NoPhotosAdded,
  RemoveImageButton,
  SectionImage,
  SectionImageContainer,
  SectionTab,
  SectionTabContent,
  SectionTabImageGrid,
  SectionTabs,
  SingleImage,
  UploadPhotosInput,
} from "./styles";

export function ListingAlbum1({
  handleGoBack,
  editable,
  listingSections,
  onSectionNameChange,
  onImagesUploaded,
  onImageRemoved,
}) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [edit, setEdit] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const { showFooter, hideFooter, setHeight } = useModal();

  const uploadPhotosRef = useRef(null);
  const editInputRef = useRef(null);

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

  const handleImage = () => {
    setShowImage(!showImage);
  };

  useEffect(() => {
    hideFooter();

    return showFooter;
  }, [hideFooter, showFooter]);

  useEffect(() => {
    setHeight("90vh");

    return () => setHeight(undefined);
  }, [setHeight]);

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
          {listingSections.map((albumSection, index) => (
            <SectionTab key={index}>
              <span>{albumSection.name}</span>
            </SectionTab>
          ))}
        </SectionTabs>

        {listingSections.map((section, index) => (
          <SectionTabContent key={index}>
            {section?.Album?.Images?.length ? (
              <SectionTabImageGrid>
                {section.Album.Images.map((image, index) => {
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
                      <SectionImage src={url} onClick={handleImage} />

                      {showImage && (
                        <BlackOverlay>
                          <div>
                            <div>
                              <CloseButton onClick={handleImage}>X</CloseButton>
                            </div>
                            <SingleImage src={url} />
                          </div>
                        </BlackOverlay>
                      )}
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
    </ListingAlbumContainer>
  );
}

ListingAlbum1.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  listingSections: PropTypes.array.isRequired,
  handleAddSection: PropTypes.func,
  onSectionNameChange: PropTypes.func,
  onImagesUploaded: PropTypes.func,
  onImageRemoved: PropTypes.func,
};