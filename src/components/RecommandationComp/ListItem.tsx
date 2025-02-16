import { Heading, Text } from "@radix-ui/themes";
import React from "react";

export default function ListItem({
  heading,
  body,
}: {
  heading: string;
  body: string[];
}) {
  return (
    <>
      <Heading as="h4">{heading}</Heading>
      {body.map((item)=>{
        return <Text key={item} as="p">{item}</Text>
      })}
    </>
  );
}
