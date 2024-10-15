import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { loadMarkdown, MarkdownData } from "../utils/markdown";
import MarkdownBlogContent from "~/ui/MarkdownBlogContent";
import CenteredLayoutPost from "~/ui/CenteredLayoutPost";
import Heading from "~/ui/Heading";

interface Post extends MarkdownData {
  date: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    console.error("No slug provided");
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const markdownData = await loadMarkdown(slug, "md/posts");
    const post: Post = {
      ...markdownData,
      date: markdownData.meta.date || "",
    };

    return json(post);
  } catch (error) {
    console.error(`Error loading post: ${error}`);
    throw new Response("Not Found", { status: 404 });
  }
};

export default function PostPage() {
  const post = useLoaderData<Post>();

  return (
    <CenteredLayoutPost heading={<Heading>{post.meta.title}</Heading>}>
      <MarkdownBlogContent htmlContent={post.contentHtml}></MarkdownBlogContent>
    </CenteredLayoutPost>
  );
}
