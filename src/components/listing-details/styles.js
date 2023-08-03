import { styled } from "styled-components"

export const ListingDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const DetailsBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7rem;
`

export const Album = styled.div`
  width: 20%;
`

export const MainDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 40%;
`

export const MainDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  >span:first-child {
    font-size: 1rem;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.65);
  }

  >span:last-child {
    font-size: 1.15rem;
    font-weight: bold;
    color: #000;
  }
`

export const ProfitAndLossBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6rem;

  margin-top: 1rem;

  >div {
    flex: 1;
  }
`

export const ExtraDetailsBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.25rem;

  width: 40%;
`

export const ExtraDetailsTop = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  margin-bottom: 1.5rem;
`

export const Action = styled.button`
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  font-size: 1rem;
  font-weight: bold;

  transition: color 200ms ease;

  &:hover {
    color: #31AF9A;

    >svg path {
      fill: #31AF9A;
    }
  }
`

export const ExtraDetail = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 3rem;

  >span:first-child {
    width: 30%;

    font-size: 1rem;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.65);
  }

  >span:last-child {
    font-size: 1.15rem;
    font-weight: bold;
    color: #000;
  }
`

export const Amenities = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding-left: 1.25rem;
  margin: 0;
`

export const Requirements = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-left: 1.25rem;
  margin: 0;
`