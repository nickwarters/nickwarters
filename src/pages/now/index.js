import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import dayjs from "dayjs";
import { getAllFilesFrontMatter } from "../../lib/mdx";

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
  return (
    <article>
      <Link href={`/now/${slug}`}>
        <a className="post-link">
          {new dayjs(slug, "YYYY-MM-DD").format("DD MMM YYYY")}
          {title ? <h2>{title}</h2> : ""}
        </a>
      </Link>

      <MDXRemote {...mdxSource} />
    </article>
  );
};

export default function Page({ posts }) {
  return (
    <Layout>
      {posts.map((post) => {
        return (
          <Post
            mdxSource={post.mdxSource}
            slug={post.slug}
            title={post.title}
            key={post.slug}
          />
        );
      })}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("now");
  return {
    props: { posts },
  };
};
