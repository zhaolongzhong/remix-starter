// app/ui/CenteredLayout.tsx
import React from "react";

interface CenteredLayoutProps {
  children: React.ReactNode;
  heading?: React.ReactNode; // Optional heading prop
}

const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  children,
  heading,
}) => {
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-[70ch] my-8">
        {heading && <div className="mb-8">{heading}</div>}{" "}
        {/* Render heading if provided */}
        {children}
      </div>
    </div>
  );
};

export default CenteredLayout;
