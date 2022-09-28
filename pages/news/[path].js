import Layout from "../../components/Layout";
import styles from "../../styles/News.module.css";
import { handler } from "../api";
import Head from "next/head";
import Link from "next/link";

const API_KEY = "P8H9hhLQ9YSdfsYsFflizyVIBbttDaFj";
const News = ({ results, title }) => {
    const meta_desc = `${title} from NYTimes`;
    return (
        <Layout>
            <Head>
                <title>{title}</title>
                <meta name="description" content={meta_desc} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>{title}</h1>
                <div className="newsContainer">
                    {results.map(r => {
                        return (
                            <Link href={r.url} key={r.uri} target="blank">
                                <a>
                                    <div className={styles.news}>
                                        <div className={styles.news_content}>
                                            <span className={styles.type}>
                                                {r.section.toUpperCase()}
                                            </span>
                                            <h3 className={styles.title}>
                                                {r.title}
                                            </h3>
                                            <p>{r.abstract}</p>
                                            <small
                                                className={styles.news_footer}
                                            >
                                                <strong>By:</strong> {r.byline}
                                                <strong>
                                                    Published On:
                                                </strong>{" "}
                                                {r.published_date}
                                            </small>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </Layout>
    );
};

export async function getStaticPaths() {
    return {
        paths: [
            { params: { path: "top-stories" } },
            { params: { path: "popular" } },
        ],
        fallback: true, //, false or "blocking" // See the "fallback" section below
    };
}

export async function getStaticProps({ params }) {
    const TOP_NEWS_URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
    const POPULAR_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;

    switch (params.path) {
        case "top-stories":
            const top_results = await handler(TOP_NEWS_URL);
            return {
                props: {
                    results: top_results,
                    title: "Top Stories",
                },
            };

        case "popular":
            const popular_results = await handler(POPULAR_URL);
            return {
                props: {
                    results: popular_results,
                    title: "Popular News",
                },
            };
        default:
            return {
                props: null,
            };
    }
}

export default News;
