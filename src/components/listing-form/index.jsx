/* eslint-disable react/prop-types */
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { api } from "../../services/api";
import { createListingImage } from "../../services/listing";
import { useAuth } from "../../hooks/useAuth";

import CheckBoxLog from "../checkBox";
import { Input } from "../input";
import { TextArea } from "../text-area";
import { useModal } from "../modal/context";
import { ListingAlbumPreview } from "../listing-album-preview";

import {
  CheckBoxContainer,
  ExtraDetail,
  ExtraDetails,
  ListingFormContainer,
  MainDetail,
  MainDetails,
} from "./styles";
import Spinner from "../spinner/Spinner";

const formFields = [
  { field: "street", path: "value" },
  { field: "zip", path: "value" },
  { field: "unitNumber", path: "value" },
  { field: "city", path: "value" },
  { field: "state", path: "value" },
  { field: "lotSize", path: "value" },
  { field: "houseSize", path: "value" },
  { field: "price", path: "value" },
  { field: "isPublic", path: "checked" },
  { field: "bedrooms", path: "value" },
  { field: "bathrooms", path: "value" },
  { field: "amenities", path: "value", multiLines: true },
  { field: "requirements", path: "value", multiLines: true },
];

function ListingFormWithRef(
  { listing, isUpdating, onSavingStatusChange, onListingSaved },
  ref
) {
  const [isSaving, setIsSaving] = useState(false);

  const formRef = useRef(null);
  const listingAlbumRef = useRef(null);

  const modal = useModal();
  const { user } = useAuth();
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(true);

  const createListingLocation = ({ unitNumber, street, zip, city, state }) =>
    `${unitNumber} ${street}, ${zip}, ${city}, ${state}`;

  const createListing = useCallback(
    async (listingFormData) => {
      const album = listingAlbumRef.current?.getAlbum();

      if (!album) {
        return;
      }

      const method = isUpdating ? "patch" : "post";

      const { data: newListing } = await api[method]("/listing", {
        ...listingFormData,
        location: createListingLocation(listingFormData),
        adminId: adminId,
      });

      const Sections = [];

      for await (const { Section, Images } of album.Sections) {
        const { data: createdSection } = await api.post(
          `/listing/${newListing.id}/section`,
          { name: Section.name }
        );

        const images = Images.map(({ base64 }) => ({ base64 }));

        const { data: Album } = await api.post(
          `/listing/${newListing.id}/album/section/${createdSection.id}/image`,
          { images }
        );

        Sections.push({ ...createdSection, Album });
      }

      const savedListing = { ...newListing, Sections };

      const image = createListingImage(savedListing);

      return { ...savedListing, image };
    },
    [user, adminId]
  );

  const saveListing = useCallback(
    async (listingFormData) => {
      if (!listing) {
        return;
      }

      const album = listingAlbumRef.current?.getAlbum();

      if (!album) {
        return;
      }

      const { data: savedListing } = await api.patch(`/listing/${listing.id}`, {
        ...listingFormData,
        location: createListingLocation(listingFormData),
        amenities: undefined,
        requirements: undefined,
      });

      const { removedImages, addedImages, changedSections, addedSections } =
        album;

      await Promise.all(
        removedImages.map(({ sectionId, imageId }) =>
          api.delete(
            `/listing/${listing.id}/album/section/${sectionId}/image/${imageId}`
          )
        )
      );

      await Promise.all(
        addedImages.map(({ base64, Section }) =>
          api.post(`/listing/${listing.id}/album/section/${Section.id}/image`, {
            images: [{ base64 }],
          })
        )
      );

      await Promise.all(
        changedSections.map((changedSection) =>
          api.patch(`/listing/${listing.id}/section/${changedSection.id}`, {
            name: changedSection.name,
          })
        )
      );

      for await (const { Section, Images } of addedSections) {
        const { data: createdSection } = await api.post(
          `/listing/${listing.id}/section`,
          { name: Section.name }
        );

        const images = Images.map(({ base64 }) => ({ base64 }));

        await api.post(
          `/listing/${listing.id}/album/section/${createdSection.id}/image`,
          { images }
        );
      }

      return savedListing;
    },
    [listing]
  );

  const handleSubmit = useCallback(async () => {
    if (!formRef.current || !user || isSaving) {
      return;
    }

    const listingFormData = formFields
      .map(({ field, path, multiLines }) => {
        let value = formRef.current[field][path];

        if (multiLines) {
          value = value.split("\n").filter((line) => !!line);
          // .map(name => ({ name }))
        }

        return { field, value };
      })
      .reduce((a, b) => ({ ...a, [b.field]: b.value }), {});

    setIsSaving(true);

    try {
      const savedListing = listing
        ? await saveListing(listingFormData)
        : await createListing(listingFormData);

      setIsSaving(false);
      onListingSaved(savedListing);
      modal.close();
    } catch (err) {
      console.log(err);
      alert(`${err.response.data.response.response.message[0]}`);
      setIsSaving(false);
    }
  }, [
    listing,
    isUpdating,
    onListingSaved,
    isSaving,
    modal,
    user,
    createListing,
    saveListing,
  ]);

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  useEffect(() => {
    onSavingStatusChange(isSaving);
  }, [onSavingStatusChange, isSaving]);

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const response = await api.get(`admin/user/${user.id}`);
        setAdminId(response.data.Admin.id);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdminId();
  }, []);

  return (
    <ListingFormContainer ref={formRef}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ListingAlbumPreview
            ref={listingAlbumRef}
            listingId={listing?.id}
            editable={true}
          />

          <MainDetails>
            <Input
              name="street"
              label="STREET"
              defaultValue={listing?.street}
              disabled={isSaving}
            />

            <MainDetail>
              <Input
                name="zip"
                label="ZIP"
                defaultValue={listing?.zip}
                disabled={isSaving}
              />

              <Input
                name="unitNumber"
                label="UNIT NUMBER"
                defaultValue={listing?.unitNumber}
                disabled={isSaving}
              />
            </MainDetail>

            <MainDetail>
              <Input
                name="city"
                label="CITY"
                defaultValue={listing?.city}
                disabled={isSaving}
              />

              <Input
                name="state"
                label="STATE"
                defaultValue={listing?.state}
                disabled={isSaving}
              />
            </MainDetail>

            <Input
              name="lotSize"
              label="LOT SIZE"
              defaultValue={listing?.lotSize}
              disabled={isSaving}
            />

            <Input
              name="houseSize"
              label="HOUSE SIZE"
              defaultValue={listing?.houseSize}
              disabled={isSaving}
            />

            <Input
              name="price"
              label="PRICE"
              defaultValue={listing?.price}
              disabled={isSaving}
            />

            <CheckBoxContainer>
              <CheckBoxLog
                name="isPublic"
                defaultChecked={listing?.isPublic}
                disabled={isSaving}
              />

              <span>PUBLIC</span>
            </CheckBoxContainer>
          </MainDetails>

          <ExtraDetails>
            <ExtraDetail>
              <Input
                name="bedrooms"
                label="BEDROOMS"
                defaultValue={listing?.bedrooms}
                disabled={isSaving}
              />

              <Input
                name="bathrooms"
                label="BATHROOMS"
                defaultValue={listing?.bathrooms}
                disabled={isSaving}
              />
            </ExtraDetail>

            <TextArea
              name="amenities"
              label="AMENITIES"
              defaultValue={listing?.Amenities.map(({ name }) => name).join(
                "\n"
              )}
              disabled={isSaving}
            />

            <TextArea
              name="requirements"
              label="REQUIREMENTS"
              defaultValue={listing?.Requirements.map(({ name }) => name).join(
                "\n"
              )}
              disabled={isSaving}
            />
          </ExtraDetails>
        </>
      )}
    </ListingFormContainer>
  );
}

export const ListingForm = forwardRef(ListingFormWithRef);
