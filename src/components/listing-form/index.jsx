/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"

import { api } from "../../services/api"
import { createListingImage } from "../../services/listing"
import { useAuth } from "../../hooks/useAuth"

import CheckBoxLog from "../checkBox"
import { Input } from "../input"
import { TextArea } from "../text-area"
import { useModal } from "../modal/context"
import { ListingAlbumPreview } from "../listing-album-preview"

import {
  CheckBoxContainer,
  ExtraDetail,
  ExtraDetails,
  ListingFormContainer,
  MainDetail,
  MainDetails,
} from "./styles"

const DEFAULT_LISTING_SECTIONS = [{ name: 'exterior', Album: { Images: [] }}]

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
  const [listingSections, setListingSections] = useState(DEFAULT_LISTING_SECTIONS)
  const [isSaving, setIsSaving] = useState(false)

  const formRef = useRef(null)

  const modal = useModal()
  const { user } = useAuth()

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

      for await (const section of listingSections) {
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
    const newSection = {
      name: 'new section',
      Album: { Images: [] }
    }
    
    setListingSections(old => [...old, newSection])
  }

  const onSectionNameChange = useCallback((albumSectionIndex, newName) => {
    const _listingSections = [...listingSections]

    if (!_listingSections[albumSectionIndex]) {
      return
    }

    _listingSections[albumSectionIndex].name = newName

    setListingSections(_listingSections)
  }, [listingSections])

  const onImagesUploaded = useCallback((albumSectionIndex, newImages) => {
    const _listingSections = [...listingSections]

    if (!_listingSections[albumSectionIndex]) {
      return
    }

    _listingSections[albumSectionIndex].Album.Images.push(...newImages)

    setListingSections(_listingSections)
  }, [listingSections])

  const onImageRemoved = useCallback((albumSectionIndex, removedImageIndex) => {
    const _listingSections = [...listingSections]

    if (!_listingSections[albumSectionIndex]) {
      return
    }

    _listingSections[albumSectionIndex].Album.Images.splice(removedImageIndex, 1)

    setListingSections(_listingSections)
  }, [listingSections])

  useImperativeHandle(ref, () => ({
    submit: handleSubmit
  }))

  useEffect(() => {
    onSavingStatusChange(isSaving)
  }, [onSavingStatusChange, isSaving])

  return (
    <ListingFormContainer ref={formRef}>
      {/*
        Create Listing Album Context
        Values: {
          handleAddSection
          onSectionNameChange
          onImagesUploaded
          onImageRemoved
        }

        Also add: editable
      */}
      <ListingAlbumPreview
        editable={true}
        listingSections={listingSections}
        handleAddSection={handleAddSection}
        onSectionNameChange={onSectionNameChange}
        onImagesUploaded={onImagesUploaded}
        onImageRemoved={onImageRemoved}
      />

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