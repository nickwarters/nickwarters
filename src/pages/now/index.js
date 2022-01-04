import { MDXRemote } from 'next-mdx-remote'
import Link from 'next/link'
import { getAllFilesFrontMatter } from '../../lib/mdx'

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
    )
}

export default function Page({ posts }) {
    return (
        <Layout>
            {posts.map((post, i) => {
                return <MDXRemote key={`${post.slug}`} {...post.mdxSource} />
            })}
            {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
            {/* <MDXRemote {...mdxSource} /> */}
        </Layout>
    )
}

export const getStaticProps = async () => {
    const posts = await getAllFilesFrontMatter('now')
    return {
        props: { posts },
    }
}
