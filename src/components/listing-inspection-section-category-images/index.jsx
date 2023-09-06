import PropTypes from "prop-types"
import { useCallback, useEffect, useMemo, useState } from "react"

import { InspectionImagesDetailsBox, ListingInspectionSectionCategoryImagesContainer } from "./styles"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useListingInspections } from "../../hooks/useListingInspections"
import { formatDate } from "../../services/date"
import { DateTime } from "luxon"

export function ListingInspectionSectionCategoryImages({ category }) {
  const [imageIndex, setImageIndex] = useState(0)

  const { editingInspection } = useListingInspections()

  const images = useMemo(() => {
    if (!category.InspectionSections) {
      return []
    }

    return category.InspectionSections
      .reduce((a, b) => [...a.Images || [], ...b.Images || []], [])
      .map(({ key }) => `https://rms-staging.s3.us-west-1.amazonaws.com/${key}`
      .replace(/\\/g, "%5C"))
  }, [category])

  const image = useMemo(() => images[imageIndex], [images, imageIndex])

  const details = useMemo(() => {
    if (!editingInspection) {
      return null
    }

    const date = formatDate({
      date: editingInspection.date,
      formatOptions: DateTime.DATE_SHORT
    })

    return `${editingInspection.name} ${date} | ${category.name} ${imageIndex + 1}/${images.length}`
  }, [editingInspection, category, imageIndex, images])

  const handleNextImage = useCallback(() => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0)
    } else {
      setImageIndex(imageIndex + 1)
    }
  }, [imageIndex, images])

  const handlePreviousImage = useCallback(() => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1)
    } else {
      setImageIndex(imageIndex - 1)
    }
  }, [imageIndex, images])

  useEffect(() => {
    const listener = (event) => {
      switch (event.key) {
        case 'ArrowRight':
          handleNextImage()
          break
        case 'ArrowLeft':
          handlePreviousImage()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, [handleNextImage, handlePreviousImage])

  return (
    <ListingInspectionSectionCategoryImagesContainer>
      <FiChevronLeft onClick={handlePreviousImage}/>

      <img src={image} />

      <FiChevronRight onClick={handleNextImage} />

      <InspectionImagesDetailsBox>
        {details}
      </InspectionImagesDetailsBox>
    </ListingInspectionSectionCategoryImagesContainer>
  )
}

ListingInspectionSectionCategoryImages.propTypes = {
  category: PropTypes.object.isRequired,
}