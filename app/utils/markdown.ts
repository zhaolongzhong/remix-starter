import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import { addFootnotesHeading } from "./addFootnotesHeading";

export interface MarkdownMeta {
  title?: string;
  description?: string;
  tags?: string[];
  [key: string]: any;
}

export interface MarkdownData {
  meta: MarkdownMeta;
  contentHtml: string;
}

export async function loadMarkdown(
  slug: string,
  parent_dir: string = "md",
): Promise<MarkdownData> {
  const postsDirectory = path.join(process.cwd(), "", parent_dir);
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`Markdown file not found: ${filePath}`);
    throw new Response("Not Found", { status: 404 });
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(addFootnotesHeading)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    meta: data as MarkdownMeta,
    contentHtml,
  };
}
