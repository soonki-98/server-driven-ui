/*
 * Created on Thu Jul 20 2023
 *
 * Copyright (c) 2023 Your Company
 */

import styled from "@emotion/styled";

const Layout = styled.div<{
  gap?: number;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  width?: number;
  height?: number;
}>`
  display: flex;
  gap: ${({ gap = 0 }) => gap}px;
  flex-direction: ${({ direction = "row" }) => direction};
  width: ${({ width }) => `${width}px` || "auto"};
  height: ${({ height }) => `${height}px` || "auto"};
`;
export default Layout;
