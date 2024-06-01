import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/api";
import { CMS_NAME } from "../../../lib/constants";
import Alert from "../../_components/alert";
import Container from "../../_components/container";
import { PostBody } from "../../_components/post-body";
import { PostHeader } from "../../_components/post-header";
import { Metadata } from "next";
//import Backlinks from "~~/app/_components/backlinks";
import markdownToHtml from "~~/lib/markdownToHtml";

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <article className="mb-32">
          <PostHeader title={post.title} date={post.date} />
          <PostBody content={content} />
        </article>
        {/* <h4 className="text-lg font-bold leading-snug tracking-tight mb-4">Backlinks</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
           {Object.keys(backlinks).length > 0 && <Backlinks backlinks={backlinks} />}
        </div> */}
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}
