/* eslint-disable react/prop-types */
import React, { useState } from 'react'

export const EditInspectionButton = ({
  defaultImage,
  hoverImage,
  onClick,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isDeletingHovered, setIsDeletingHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsDeletingHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsDeletingHovered(false)
  }

  return (
    <button
      className="hoverableButton editButton"
      onClick={() => onClick(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ marginBottom: '5px' }}
    >
      <span className="imageContainer">
        {isHovered ? hoverImage : defaultImage}
      </span>
      {isDeletingHovered && (
        <div className="confirmationBox">Edit This Inspection</div>
      )}
    </button>
  )
}

export const DeleteInspectionButton = ({
  defaultImage,
  hoverImage,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isDeletingHovered, setIsDeletingHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsDeletingHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsDeletingHovered(false)
  }

  return (
    <button
      className="hoverableButton deleteButton"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="imageContainer">
        {isHovered ? hoverImage : defaultImage}
      </span>
      {isDeletingHovered && (
        <div className="confirmationBox">Delete This Section</div>
      )}
    </button>
  )
}
