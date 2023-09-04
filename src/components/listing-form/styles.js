import { styled } from "styled-components"

export const ListingFormContainer = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  padding: 1rem;
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