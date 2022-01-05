import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { getFiles, getFileBySlug } from "../../lib/mdx";
import dayjs from "dayjs";

const Layout = ({ children }) => {
  return (
    <div className="app">
      <nav>
        <Link href="/about">
          <a>about</a>
        </Link>
        <Link href="/now">
          <a>now</a>
        </Link>
        <Link href="/projects">
          <a>projects</a>
        </Link>
      </nav>
      {children}
    </div>
  );
};

const Post = ({ mdxSource, slug, title = "" }) => {
  console.log(slug);

  return (
    <article>
      <p className="post-link">
        {new dayjs(slug, "YYYY-MM-DD").format("DD MMM YYYY")}
        {title ? <h2>{title}</h2> : ""}
      </p>

      <MDXRemote {...mdxSource} />
    </article>
  );
};

export default function Page(post) {
  console.log(post);

  return (
    <Layout>
      <Post mdxSource={post.mdxSource} slug={post.slug} title={post.title} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles("now");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const post = await getFileBySlug("now", params.slug);

  return {
    props: post,
  };
};
