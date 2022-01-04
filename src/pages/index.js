import Link from 'next/link'

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

const Page = () => {
    return (
        <Layout>
            <h1>hello world</h1>
        </Layout>
    )
}

export default Page
