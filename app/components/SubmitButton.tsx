"use client";

import { useFormStatus } from "react-dom";
import { ComponentProps } from "react";
import Button from "@mui/material/Button";

type Props = Partial<ComponentProps<typeof Button>> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
      <Button {...props} type="submit" disabled={pending}>
        {isPending ? pendingText : children}
      </Button>
  );
}
