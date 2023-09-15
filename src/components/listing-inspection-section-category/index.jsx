import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import placeholder from "../../assets/img/defaultImage.png";
import { useListingInspections } from "../../hooks/useListingInspections";
import { api } from "../../services/api";
import { toBase64 } from "../../services/image";
import { Input } from "../input";
import {
  Action,
  Header,
  ImagePreview,
  ListingInspectionSectionCategoryContainer,
  Loader,
  UploadInput,
  LoadingBox,
  ImagePreviewMobile,
} from "./styles";

export function ListingInspectionSectionCategory({
  category,
  onCategoryRemoved,
  onCategoryUpdated,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [requestRemove, setRequestRemove] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { editingInspection, handleOpenCategoryImagesModal } =
    useListingInspections();

  const uploadInputRef = useRef(null);
  const nameInputRef = useRef(null);

  const isLoading = isRemoving || isUploading || isSaving;
  const loadingText = isRemoving
    ? "Removing"
    : isUploading
    ? "Uploading"
    : isSaving
    ? "Saving"
    : null;

  const imageUrl = useMemo(() => {
    if (editingInspection) {
      const inspectionSection = category.InspectionSections?.find(
        (inspectedSection) => inspectedSection.Images?.length
      );

      if (inspectionSection && inspectionSection.Images.length > 0) {
        const imagesForCurrentInspection = inspectionSection.Images.filter(
          (image) =>
            editingInspection.id ===
            image.InspectionSectionCategory.InspectionSection.Inspection.id
        );

        if (imagesForCurrentInspection.length > 0) {
          return `https://rms-staging.s3.us-west-1.amazonaws.com/${imagesForCurrentInspection[0].key}`.replace(
            /\\/g,
            "%5C"
          );
        }
      }
    }

    return null;
  }, [category, editingInspection]);

  const openUploadInput = () => {
    if (isUploading) return;

    uploadInputRef.current?.click();
  };

  const handleSaveImages = async (images) => {
    setIsUploading(true);

    try {
      const url = `/inspection/${editingInspection.id}/section/${category.sectionId}/category/${category.id}/image`;
      const { data } = await api.post(url, { images });

      const InspectionSections = category.InspectionSections?.length
        ? [
            {
              ...category.InspectionSections[0],
              Images: [...category.InspectionSections[0].Images, ...data],
            },
          ]
        : [
            {
              categoryId: category.id,
              sectionId: category.sectionId,
              Images: data,
            },
          ];

      onCategoryUpdated({
        ...category,
        InspectionSections,
      });
    } catch (err) {
      console.log(err);
      alert("Error saving category images");
    }

    setIsUploading(false);
  };

  const handleRemoveCategory = async () => {
    if (!requestRemove) {
      setRequestRemove(true);

      setTimeout(() => {
        setRequestRemove(false);
      }, 5000); // 5 sec after set to false

      return;
    }

    setIsRemoving(true);

    try {
      await api.delete(
        `/section/${category.sectionId}/category/${category.id}`
      );

      setIsRemoving(false);
      onCategoryRemoved(category.id);
    } catch (err) {
      console.log(err);
      alert("Error while removing category.");

      setIsRemoving(false);
    }
  };

  const onUploaded = async (event) => {
    const filesArray = Array.from(event.target.files);

    const images = await Promise.all(filesArray.map(toBase64));

    handleSaveImages(images);
  };

  const toggleEdit = () => setEdit((old) => !old);

  const handleContextMenu = (event) => {
    event.preventDefault();

    toggleEdit();
  };

  const handleSaveName = async () => {
    if (!nameInputRef.current?.value) {
      return;
    }

    setIsSaving(true);

    try {
      await api.patch(
        `/section/${category.sectionId}/category/${category.id}`,
        {
          name: nameInputRef.current.value,
        }
      );

      setIsSaving(false);
      setEdit(false);
      onCategoryUpdated({
        ...category,
        name: nameInputRef.current.value,
      });
    } catch (err) {
      console.log(err);
      alert("Error saving category name");
      setIsSaving(false);
    }
  };

  const handleOpenImages = () => {
    if (!imageUrl) return;

    handleOpenCategoryImagesModal(category);
  };

  useEffect(() => {
    if (edit) {
      nameInputRef.current?.focus();
    }
  }, [edit]);

  useEffect(() => {
    function updateModalWidth() {
      setIsMobile(window.outerWidth <= 768);
    }

    updateModalWidth();

    window.addEventListener("resize", updateModalWidth);

    return () => {
      window.removeEventListener("resize", updateModalWidth);
    };
  }, []);

  return (
    <ListingInspectionSectionCategoryContainer>
      <Header data-loading={isLoading}>
        {edit ? (
          <Input
            ref={nameInputRef}
            defaultValue={category.name}
            label="NAME"
            containerStyle={{ marginRight: "1rem" }}
          />
        ) : (
          <span onContextMenu={handleContextMenu} onDoubleClick={toggleEdit}>
            {category.name}
          </span>
        )}

        {edit ? (
          <>
            <Action onClick={handleSaveName} disabled={isLoading}>
              <FiCheck />
            </Action>

            <Action onClick={toggleEdit} disabled={isLoading}>
              <FiX />
            </Action>
          </>
        ) : (
          <>
            <Action onClick={openUploadInput} disabled={isLoading}>
              <FiPlus />
            </Action>

            <Action onClick={handleRemoveCategory} disabled={isLoading}>
              <FiTrash2 color={requestRemove ? "#ff0000" : "unset"} />
            </Action>
          </>
        )}
      </Header>

      {isMobile ? (
        <ImagePreviewMobile
          src={imageUrl || undefined}
          data-loading={isLoading}
          data-clickable={!!imageUrl}
          draggable={false}
          onClick={handleOpenImages}
        />
      ) : (
        <ImagePreview
          src={imageUrl || placeholder}
          alt="Category Image Preview"
          data-loading={isLoading}
          data-clickable={!!imageUrl}
          draggable={false}
          onClick={handleOpenImages}
        />
      )}

      <UploadInput ref={uploadInputRef} onChange={onUploaded} />

      {isLoading && (
        <LoadingBox>
          <span>{loadingText}</span>
          <Loader />
        </LoadingBox>
      )}
    </ListingInspectionSectionCategoryContainer>
  );
}

ListingInspectionSectionCategory.propTypes = {
  category: PropTypes.object.isRequired,
  onCategoryRemoved: PropTypes.func.isRequired,
  onCategoryUpdated: PropTypes.func.isRequired,
};
