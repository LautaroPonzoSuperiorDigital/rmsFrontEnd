import { styled } from "styled-components";

const Svg = styled.svg`
  path {
    fill: #1c1c1e;

    transition: fill 200ms ease;
  }

  &:hover path {
    fill: #31af9a;
  }
`;

export function MobileClose() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="8.974"
      height="15.592"
      viewBox="0 0 8.974 15.592"
    >
      <path
        id="chevron.backward"
        d="M8.349,13.654a1.046,1.046,0,0,0,.36.8l6.838,6.7a1,1,0,0,0,.729.3A1.037,1.037,0,0,0,17.322,20.4a1.074,1.074,0,0,0-.316-.747l-6.161-6,6.161-6a1.09,1.09,0,0,0,.316-.747,1.037,1.037,0,0,0-1.046-1.046,1,1,0,0,0-.729.3L8.709,12.846A1.078,1.078,0,0,0,8.349,13.654Z"
        transform="translate(-8.349 -5.858)"
      />
    </Svg>
  );
}
