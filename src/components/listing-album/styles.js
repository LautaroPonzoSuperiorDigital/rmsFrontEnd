import { Tab, TabList, TabPanel } from "react-tabs"
import { styled } from "styled-components"

export const ListingAlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const GoBackButton = styled.button`
  outline: 0;
  border: 0;

  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  text-transform: uppercase;
  color: #197572;
  font-weight: bold;

  margin-left: 3rem;
`

export const SectionTabs = styled(TabList)`
  margin-top: 2.5rem;
  margin-bottom: 0;
  padding-left: 0;

  list-style: none;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2.5rem;

  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`

export const SectionTab = styled(Tab)`
  position: relative;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  font-size: 1rem;
  line-height: 1rem;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.65);

  cursor: pointer;

  padding-bottom: 1rem;

  &.active {
    color: #197572;

    &::before {
      content: "";

      position: absolute;
      left: 0;
      bottom: -1px;

      height: 2px;
      width: 100%;

      background: #197572;
    }
  }

  &:first-child {
    margin-left: 3rem;
  }

  &:last-child {
    margin-right: 3rem;
  }
`

export const EditSectionInput = styled.input`
  outline: none;

  padding: 0.25rem 0.5rem;

  text-transform: uppercase;

  border: 1px solid #848484;
  border-radius: 0.25rem;

  transition: border-width 200ms ease, border-color 200ms ease;

  &:focus {
    border-width: 2px;
    border-color: #197572;
    color: #197572;
  }
`

export const EditSectionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const EditSectionButton = styled.button`
  outline: none;
  background: transparent;
  border: none;
  font-size: 0;

  cursor: pointer;

  >svg {
    color: #848484;

    &:hover {
      color: #197572;
    }
  }
`

export const SectionsActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin-left: auto;
  margin-right: 3rem;
`

export const NewSectionButton = styled.button`
  outline: none;
  background: transparent;
  cursor: pointer;

  font-size: 0.875rem;
  color: #197572;
`

export const AddPhotosButton = styled.button`
  outline: none;
  background: transparent;
  cursor: pointer;

  font-size: 0.875rem;
  color: #197572;
`

export const UploadPhotosInput = styled.input`
  display: none;
`

export const SectionTabContent = styled(TabPanel)`
  &.active {
    padding: 2rem 3rem;
  }
`
export const NoPhotosAdded = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #848484;
`

export const SectionTabImageGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3rem;

  list-style: none;
  padding-left: 0;
`

export const SectionImageContainer = styled.li`
  position: relative;
`

export const SectionImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 300px;

  object-fit: contain;
`

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  font-size: 0;
  outline: none;

  border-radius: 0.25rem;
  border: 1px solid;
  border-color: rgba(252, 252, 252, 0.75);

  background: rgba(252, 252, 252, 0.75);

  padding: 0.5rem;

  transition: border-color 200ms ease;

  &:hover {
    border-color: #197572;

    >svg path {
      fill: #197572;
    }
  }
`