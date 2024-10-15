// app/ui/Heading.tsx
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className="text-4xl font-bold mb-8 text-text-light dark:text-text-dark">
      {children}
    </h1>
  );
};

export default Heading;
