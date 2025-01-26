"use client"
import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface Props {
  children: ReactNode;
}

const RecoilProvider: React.FC<Props> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
