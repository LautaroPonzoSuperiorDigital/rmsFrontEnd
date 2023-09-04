import { styled } from "styled-components"

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