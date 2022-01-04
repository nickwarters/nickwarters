import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

// import MDXComponents from "../components/MDXComponents";

const root = process.cwd()

export async function getFiles(type) {
    return fs.readdirSync(path.join(root, 'src/data', type))
}

export async function getFileBySlug(type, slug) {
    const source = slug
        ? fs.readFileSync(
              path.join(root, 'src/data', type, `${slug}.mdx`),
              'utf8'
          )
        : fs.readFileSync(path.join(root, 'src/data', `${type}.mdx`), 'utf8')

    const { data, content } = matter(source)
    const mdxSource = await serialize(content)

    return {
        mdxSource,
        frontmatter: {
            slug: slug || null,
            ...data,
        },
    }
}

export async function getAllFilesFrontMatter(type) {
    const files = fs.readdirSync(path.join(root, 'src/data', type))

    const posts = []
    for (let i = 0; i < files.length; i++) {
        const postSlug = files[i]
        const source = fs.readFileSync(
            path.join(root, 'src/data', type, postSlug),
            'utf8'
        )
        const { data, content } = matter(source)

        const mdxSource = await serialize(content)
        posts.push({
            ...data,
            mdxSource,
            slug: postSlug.replace('.mdx', ''),
        })
    }
    return posts
}
