"use client";
import { withWrapped1, withWrapped2, Button } from "@/components/Button/Button";
import {
  withUndoRedo,
  withValidation,
  TextInput,
} from "@/components/Input/Input";
import { wrapWithDebug } from "@/lib/util/wrapWithDebug";
import React from "react";

export default function page() {
  const wraptestFn = wrapWithDebug(function testFn() {
    console.log("here");
  });

  const NewButton = withWrapped1(withWrapped2(Button));
  const FiveOverstringAndRedoUndoOInput = withValidation(
    withUndoRedo(TextInput),
    (str) => {
      return str.length > 5;
    },
    "길이가 5자리 이상이어야합니다."
  );

  return (
    <div>
      <div>page</div>
      <NewButton onClick={wraptestFn}>
        <div>test</div>
      </NewButton>
      <FiveOverstringAndRedoUndoOInput />
    </div>
  );
}
