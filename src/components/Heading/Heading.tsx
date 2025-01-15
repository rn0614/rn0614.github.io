// Heading.tsx
import classNames from "classnames";
import styles from "./styles.module.scss";
import React, { ReactNode } from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6; // The heading level (1-6)
  className?: string; // Additional class names for styling
  children: ReactNode; // The content of the heading
}

/**
 * Common Heading Component
 * @param {number} level
 * @param {string} className
 * @param {React.ReactNode} children
 */
const Heading: React.FC<HeadingProps> = ({
  level = 1,
  className = "",
  children,
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements; // Dynamically set the heading level

  return (
    <HeadingTag className={classNames(className, styles[HeadingTag])}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
