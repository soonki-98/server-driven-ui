/*
 * Created on Thu Jul 20 2023
 *
 * Copyright (c) 2023 Your Company
 */

import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

export default function Button({
  title,
  color,
  ...props
}: { title: string; color: string } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <ButtonLayout color={color} {...props}>
      {title}
    </ButtonLayout>
  );
}

const ButtonLayout = styled.button<{ color: string }>`
  padding: 6px;
  border-radius: 6px;
  background-color: ${({ color }) => color};
  color: #000000;
`;
