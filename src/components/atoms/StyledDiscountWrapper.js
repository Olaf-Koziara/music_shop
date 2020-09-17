import styled, { css } from "styled-components";
const StyledDiscountWrapper = styled.div`
  background-color: ${({ theme }) => theme.redSalsa};
  position: absolute;
  ${({ position }) => {
    switch (position) {
      case "Top left": {
        return css`
          top: 7%;
          left: 7%;
        `;
      }
      case "Top right": {
        return css`
          top: 7%;
          right: 7%;
        `;
      }
      case "Bottom left": {
        return css`
          bottom: 12%;
          left: 7%;
        `;
      }
      case "Bottom right": {
        return css`
          bottom: 12%;
          right: 7%;
        `;
      }

      default:
        break;
    }
  }}

  padding: 20px 10px;
  border-radius: 200px;
  font-size: 30px;
`;
export default StyledDiscountWrapper;
