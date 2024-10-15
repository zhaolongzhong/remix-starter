import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import CenteredLayout from "~/ui/CenteredLayout";
import Heading from "~/ui/Heading";

interface PostMeta {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  date?: string;
}

interface LoaderData {
  posts: PostMeta[];
}

function extractTitleFromContent(content: string): string {
  const titleMatch = content.match(/^#\s*(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : "Untitled Post";
}

export const loader: LoaderFunction = async () => {
  const postsDirectory = path.join(process.cwd(), "", "md/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts: PostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title || extractTitleFromContent(content),
      description: data.description,
      tags: data.tags,
      date: data.date,
    };
  });

  // Sort posts by date descending, putting posts without dates at the end
  posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return json<LoaderData>({ posts });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <CenteredLayout>
      <Heading>Posts</Heading>
      <ul>
        {posts.map((post) => (
          <li
            key={post.slug}
            className="mb-2 border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0"
          >
            <Link
              to={`/blog/${post.slug}`}
              className="text-text-light dark:text-text-dark"
            >
              <h2 className="text-1xl mb-2 hover:underline transition-all duration-200">
                {post.title}
              </h2>
            </Link>
            {post.tags && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.tags.join(", ")}
              </p>
            )}
            {post.date && (
              <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </CenteredLayout>
  );
}
