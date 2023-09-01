/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"

import { api } from "../../services/api"
import { createListingImage } from "../../services/listing"
import { useAuth } from "../../hooks/useAuth"

import CheckBoxLog from "../checkBox"
import { Input } from "../input"
import { TextArea } from "../text-area"
import { Album as AlbumIcon } from "../icons"
import { ListingAlbum } from "../listing-album"

import {
  Album,
  AlbumImage,
  CheckBoxContainer,
  ExtraDetail,
  ExtraDetails,
  ListingFormContainer,
  MainDetail,
  MainDetails,
  ViewAlbumButton,
} from "./styles"
import { useModal } from "../modal/context"

const DEFAULT_ALBUM_SECTIONS = [{ name: 'exterior', images: [] }]

const formFields = [
  { field: 'street', path: 'value' },
  { field: 'zip', path: 'value' },
  { field: 'unitNumber', path: 'value' },
  { field: 'city', path: 'value' },
  { field: 'state', path: 'value' },
  { field: 'lotSize', path: 'value' },
  { field: 'houseSize', path: 'value' },
  { field: 'price', path: 'value' },
  { field: 'isPublic', path: 'checked' },
  { field: 'bedrooms', path: 'value' },
  { field: 'bathrooms', path: 'value' },
  { field: 'amenities', path: 'value', multiLines: true },
  { field: 'requirements', path: 'value', multiLines: true },
]

function ListingFormWithRef({ onSavingStatusChange, onListingSaved }, ref) {
  const [showAlbum, setShowAlbum] = useState(false)
  const [albumSections, setAlbumSections] = useState(DEFAULT_ALBUM_SECTIONS)
  const [isSaving, setIsSaving] = useState(false)

  const formRef = useRef(null)

  const modal = useModal()
  const { user } = useAuth()

  const albumImages = useMemo(() => {
    const sectionsWithImages = albumSections.filter(section => section.images.length)

    return sectionsWithImages.map(section => section.images).reduce((a, b) => [...a, ...b], [])
  }, [albumSections])

  const toggleAlbum = () => {
    setShowAlbum(old => !old)
  }

  const handleSubmit = async () => {
    if (!formRef.current || !user || isSaving) {
      return
    }

    const listingFormData = formFields.map(({ field, path, multiLines }) => {
      let value = formRef.current[field][path]

      if (multiLines) {
        value = value
          .split('\n')
          .filter(line => !!line)
          // .map(name => ({ name }))
      }

      return { field, value }
    }).reduce((a, b) => ({ ...a, [b.field]: b.value }), {})
    
    setIsSaving(true)

    try {
      const { data: listing } = await api.post('/listing', {
        ...listingFormData,
        location: `${listingFormData.unitNumber} ${listingFormData.street}, ${listingFormData.zip}, ${listingFormData.city}, ${listingFormData.state}`,
        adminId: user.id,
      })

      const Sections = []

      for await (const section of albumSections) {
        const { data: createdSection } = await api.post(`/listing/${listing.id}/section`, {
          name: section.name
        })

        const { data: Album } = await api.post(`/listing/${listing.id}/album/section/${createdSection.id}/image`, {
          images: section.images.map(({ base64 }) => ({ base64 }))
        })

        Sections.push({ ...createdSection, Album })
      }

      const savedListing = { ...listing, Sections }

      const image = createListingImage(savedListing)

      setIsSaving(false)
      onListingSaved({ ...savedListing, image })
      modal.close()
    } catch (err) {
      console.log(err)
      alert('Error while creating Listing')
      setIsSaving(false)
    }
  }
  
  const handleAddSection = () => {
    setAlbumSections(old => [...old, { name: 'new section', images: [] }])
  }

  const onSectionNameChange = useCallback((albumSectionIndex, newName) => {
    const _albumSections = [...albumSections]

    if (!_albumSections[albumSectionIndex]) {
      return
    }

    _albumSections[albumSectionIndex].name = newName

    setAlbumSections(_albumSections)
  }, [albumSections])

  const onImagesUploaded = useCallback((albumSectionIndex, newImages) => {
    const _albumSections = [...albumSections]

    if (!_albumSections[albumSectionIndex]) {
      return
    }

    _albumSections[albumSectionIndex].images.push(...newImages)

    setAlbumSections(_albumSections)
  }, [albumSections])

  const onImageRemoved = useCallback((albumSectionIndex, removedImageIndex) => {
    const _albumSections = [...albumSections]

    if (!_albumSections[albumSectionIndex]) {
      return
    }

    _albumSections[albumSectionIndex].images.splice(removedImageIndex, 1)

    setAlbumSections(_albumSections)
  }, [albumSections])

  useImperativeHandle(ref, () => ({
    submit: handleSubmit
  }))

  useEffect(() => {
    onSavingStatusChange(isSaving)
  }, [onSavingStatusChange, isSaving])

  if (showAlbum) {
    return (
      <ListingAlbum
        handleGoBack={toggleAlbum}
        albumSections={albumSections}
        handleAddSection={handleAddSection}
        onSectionNameChange={onSectionNameChange}
        onImagesUploaded={onImagesUploaded}
        onImageRemoved={onImageRemoved}
      />
    )
  }

  return (
    <ListingFormContainer ref={formRef}>
      <Album>
        {albumImages.length ? (
          <AlbumImage
            src={albumImages[0].url}
            alt="Album Image"
          />
        ) : (
          <AlbumIcon />
        )}

        <ViewAlbumButton
          type="button"
          onClick={toggleAlbum}
          hasImage={albumImages.length}
          disabled={isSaving}
        >
          {albumImages.length ? `Edit Album (${albumImages.length})` : '+ Add Photos'}
        </ViewAlbumButton>
      </Album>

      <MainDetails>
        <Input name="street" label="STREET" disabled={isSaving} />

        <MainDetail>
          <Input name="zip" label="ZIP" disabled={isSaving} />

          <Input name="unitNumber" label="UNIT NUMBER" disabled={isSaving} />
        </MainDetail>

        <MainDetail>
          <Input name="city" label="CITY" disabled={isSaving} />

          <Input name="state" label="STATE" disabled={isSaving} />
        </MainDetail>

        <Input name="lotSize" label="LOT SIZE" disabled={isSaving} />

        <Input name="houseSize" label="HOUSE SIZE" disabled={isSaving} />

        <Input name="price" label="PRICE" disabled={isSaving} />

        <CheckBoxContainer>
          <CheckBoxLog name="isPublic"/>

          <span>PUBLIC</span>
        </CheckBoxContainer>
      </MainDetails>

      <ExtraDetails>
        <ExtraDetail>
          <Input name="bedrooms" label="BEDROOMS" disabled={isSaving} />

          <Input name="bathrooms" label="BATHROOMS" disabled={isSaving} />
        </ExtraDetail>

        <TextArea name="amenities" label="AMENITIES" disabled={isSaving} />

        <TextArea name="requirements" label="REQUIREMENTS" disabled={isSaving} />
      </ExtraDetails>
    </ListingFormContainer>
  )
}

export const ListingForm = forwardRef(ListingFormWithRef)