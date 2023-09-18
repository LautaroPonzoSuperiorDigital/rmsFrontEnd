import styled from "styled-components"

export const ListingTenantsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export const Tenant = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  cursor: pointer;

  position: relative;

  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.15);

  &:hover {
    border-color: #31AF9A;
  }
`

export const TenantName = styled.span`
  color: #131313;
  font-size: 1.25rem;
  text-transform: capitalize;
`

export const Period = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-size: 1rem;
  text-transform: uppercase;
`

export const TenantAction = styled.button.attrs({ type: 'button' })`
  font-size: 0;
  outline: none;
  background: transparent;
  border: none;

  cursor: pointer;

  position: absolute;
  top: 1rem;
  right: 3rem;

  & + button {
    right: 1rem;
  }

  >svg {
    width: 1rem;
    height: 1rem;

    color: #197572;
  }
`