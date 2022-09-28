import Layout from "../../components/Layout";
import styles from "../../styles/News.module.css";
import Image from "next/image";
import { handler } from "../api";
import Link from "next/link";

const API_KEY = "P8H9hhLQ9YSdfsYsFflizyVIBbttDaFj";
const SECTIONS_URL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`;

const Section = ({ results, section }) => {
    return (
        <Layout>
            <h1>Section News: {section}</h1>
            <div className="newsContainer">
                {results.map(r => {
                    const media = r.multimedia?.find(
                        m =>
                            m.format === "mediumThreeByTwo210" &&
                            m.type === "image"
                    );

                    return (
                        <Link href={r.url} key={r.uri} target="blank">
                            <a>
                                <div className={styles.news}>
                                    <div className={styles.news_content}>
                                        <span className={styles.type}>
                                            {r.section?.toUpperCase()}
                                        </span>
                                        <h3 className={styles.title}>
                                            {r.title}
                                        </h3>
                                        <p>{r.abstract}</p>
                                        <small className={styles.news_footer}>
                                            <strong>By:</strong> {r.byline}
                                            <strong>Published On:</strong>{" "}
                                            {r.published_date}
                                        </small>
                                    </div>

                                    {media && (
                                        <div className={styles.media}>
                                            <Image
                                                src={media.url}
                                                alt={media.caption}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </a>
                        </Link>
                    );
                })}
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const results = await handler(SECTIONS_URL);

    return {
        paths: results.map(result => {
            return { params: { section: result.section } };
        }),
        fallback: false,
    };
}
export async function getStaticProps({ params }) {
    const SECTION_NEWS_URL = `https://api.nytimes.com/svc/news/v3/content/nyt/${params.section}.json?&api-key=${API_KEY}`;

    const results = await handler(SECTION_NEWS_URL);

    return {
        props: {
            results,
            section: params.section,
        },
    };
}

export default Section;
