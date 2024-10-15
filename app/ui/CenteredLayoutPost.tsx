// app/ui/CenteredLayout.tsx
import React from "react";

interface CenteredLayoutProps {
  children: React.ReactNode;
  heading?: React.ReactNode; // Optional heading prop
}

const CenteredLayoutPost: React.FC<CenteredLayoutProps> = ({
  children,
  heading,
}) => {
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[70ch] my-8">
        {heading && <div className="mb-8">{heading}</div>}{" "}
        {/* Render heading if provided */}
        <div className="w-full max-w-[60ch]">
          <article className="prose dark:prose-dark prose-sm sm:prose lg:prose-lg xl:prose-xl my-8">
            <div className="markdown-content text-text-light dark:text-text-dark">
              {children}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CenteredLayoutPost;
