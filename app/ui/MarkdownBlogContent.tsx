import React, { useCallback, useRef, useEffect } from "react";

interface MarkdownContentProps {
  htmlContent: string;
}

const MarkdownBlogContent: React.FC<MarkdownContentProps> = ({
  htmlContent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "A") {
      const href = target.getAttribute("href");
      if (
        href &&
        (href.startsWith("#user-content-fn-") ||
          href.startsWith("#user-content-fnref-") ||
          target.id.startsWith("user-content-fnref-") ||
          target.getAttribute("data-footnote-ref") !== null ||
          target.getAttribute("data-footnote-backref") !== null)
      ) {
        e.preventDefault();
        const id = href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
      }
    }
  }, []);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("click", handleClick);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("click", handleClick);
      }
    };
  }, [handleClick]);

  return (
    <div
      className="flex justify-center px-4 sm:px-6 lg:px-8"
      ref={containerRef}
    >
      <div className="w-full max-w-[60ch]">
        <article className="prose dark:prose-dark prose-sm sm:prose lg:prose-lg xl:prose-xl my-8">
          <div
            className="markdown-content text-text-light dark:text-text-dark"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  );
};

export default MarkdownBlogContent;
