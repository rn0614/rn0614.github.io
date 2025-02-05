"use client";
import React from "react";
import { Theme, ThemePanel } from "@radix-ui/themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Theme>
      {children}
      {/* <ThemePanel /> */}
    </Theme>
  );
}
