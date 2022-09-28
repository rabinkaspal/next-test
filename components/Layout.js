import Link from "next/link";

export default function Layout({ children }) {
    return (
        <div className="container">
            <ul className="nav">
                <Link href="/">
                    <a>
                        <li>Home</li>
                    </a>
                </Link>
                <Link href="/news/top-stories">
                    <a>
                        <li>Top Stories</li>
                    </a>
                </Link>
                <Link href="/news/popular">
                    <a>
                        <li>Popular</li>
                    </a>
                </Link>
                <Link href="/section">
                    <a>
                        <li>Sections</li>
                    </a>
                </Link>
            </ul>

            <div className="content">{children}</div>
        </div>
    );
}
