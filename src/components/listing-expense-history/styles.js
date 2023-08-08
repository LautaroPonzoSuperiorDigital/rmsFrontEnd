import { styled } from "styled-components"

export const ListingExpenseHistoryTable = styled.table`
  width: 100%;

  tbody {
    height: auto;

    tr:first-child td {
      padding-top: 1.75rem;
    }
  }

  th, td {
    padding: 0.75rem 0rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  th {
    color: rgba(0, 0, 0, 0.65);

    text-transform: uppercase;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;

    &:last-child {
      text-align: right;
    }
  }

  td {
    font-size: 1.25rem;
    color: #131313;

    &:last-child {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1.5rem;
    }
  }
`