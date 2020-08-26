import styled, { css } from "styled-components";
const StyledImage = styled.img`
  ${({ isIcon }) =>
    isIcon &&
    css`
      width: 45px;
    `};
  ${({ isTiny }) =>
    isTiny &&
    css`
      width: 100px;
    `};
  ${({ isSmall }) =>
    isSmall &&
    css`
      width: 200px;
    `};
  ${({ isMedium }) =>
    isMedium &&
    css`
      width: 300px;
    `};
  ${({ isBig }) =>
    isBig &&
    css`
      width: 500px;
    `};
`;

export default StyledImage;
