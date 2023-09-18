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
  top: 50%;
  transform: translateY(-50%);

  color: #197572;
  font-weight: bold;
  background: transparent;

  padding: 1rem 0;

  &[data-has-image="true"] {
    top: unset;
    transform: unset;

    background: rgba(255, 255, 255, 0.75);
  }
`