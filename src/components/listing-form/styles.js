import { styled } from "styled-components"

export const ListingFormContainer = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  padding: 1rem;
`

export const Album = styled.div`
  width: 25%;

  position: relative;
`

export const AlbumImage = styled.img`
  object-fit: cover;
  width: 100%;
`

export const ViewAlbumButton = styled.button`
  position: absolute;
  inset: 0;
  top: ${({ hasImage }) => hasImage ? 'unset' : '50%'};
  transform: ${({ hasImage }) => hasImage ? 'unset' : 'translateY(-50%)'};

  color: #197572;
  font-weight: bold;
  background: ${({ hasImage }) => hasImage ? 'rgba(255, 255, 255, 0.75)' : 'transparent'};

  padding: 1rem 0;
`

export const MainDetails = styled.div`
  width: 37.5%;
  
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const MainDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  >label {
    flex: 1;
  }
`

export const CheckBoxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  >input {
    margin: 0;
  }
`

export const ExtraDetails = styled.div`
   width: 37.5%;

  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const ExtraDetail = MainDetail