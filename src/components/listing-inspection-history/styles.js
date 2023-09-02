import { styled } from "styled-components";

export const ListingInspectionHistoryCard = styled.div`
  .inspection-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    width: 70%;
  }

  .inspection-card {
    flex: 1;
    min-width: calc(33% - 1rem);
    max-width: calc(33% - 1rem);
    border: 1px solid #ddd;
    background-color: ${(props) => (props.isHovered ? "#f0f0f0" : "white")};
    transition: background-color 0.3s ease;
    position: relative;

    &:hover {
      border-color: #31af9a;
      cursor: pointer;
    }

    .inspectionContent {
      margin-left: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: column;
      position: relative;
      p {
        color: #000;
        margin: 0;
        position: relative;
        z-index: 1;
      }

      span {
        font-weight: lighter;
        color: #888;
      }

      .actionButtons {
        position: absolute;
        right: 3.5rem;
        top: 0.5rem;
        display: flex;
        align-items: center;
        z-index: 2;
        flex-direction: row;
        align-content: stretch;
        justify-content: flex-start;
      }

      .actionButtons button span img {
        width: 1rem;
        height: 1rem;
        fill: #1b6a66;
      }
    }
  }
`;
