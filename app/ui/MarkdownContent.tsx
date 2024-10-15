// app/ui/MarkdownContent.tsx
import React from "react";

interface MarkdownContentProps {
  htmlContent: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ htmlContent }) => {
  return (
    <div className="w-full max-w-3xl">
      <article className="prose dark:prose-dark prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <div
          className="markdown-content text-text-light dark:text-text-dark"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
};

export default MarkdownContent;
