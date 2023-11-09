import styled from "styled-components";

export const Title = styled.p<{
  font_size?: string;
  font_weight?: number;
  text_decoration?: string;
  color?: string;
}>`
  font-size: ${({ font_size }) => font_size};
  font-family: "Josefin";
  font-weight: ${({ font_weight }) => font_weight};
  color:${({ color }) => color};
  margin: 0;
`;
