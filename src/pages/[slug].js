import { MDXRemote } from 'next-mdx-remote'
import Link from 'next/link'
import { getFiles, getFileBySlug } from '../lib/mdx'

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

export default function Page({ mdxSource }) {
    return (
        <Layout>
            <MDXRemote {...mdxSource} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const posts = await getFiles('pages')

    return {
        paths: posts.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, ''),
            },
        })),
        fallback: false,
    }
}

export const getStaticProps = async ({ params }) => {
    const post = await getFileBySlug('pages', params.slug)
    return {
        props: post,
    }
}
