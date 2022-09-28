import Layout from "../../components/Layout";
import styles from "../../styles/News.module.css";
import Image from "next/image";
import { search } from "../api";

const DOMAIN = "https://nytimes.com/";
const API_KEY = "P8H9hhLQ9YSdfsYsFflizyVIBbttDaFj";
const News = ({ results, query }) => {
    console.log("results", results);
    return (
        <Layout>
            <h1>Search Results for: {query}</h1>
            <div className="newsContainer">
                {results.map(r => {
                    const media = r.multimedia.find(
                        m => m.subtype === "popup" && m.type === "image"
                    );

                    return (
                        <a href={r.url} key={r.uri} target="blank">
                            <div className={styles.news}>
                                <div className={styles.news_content}>
                                    <span className={styles.type}>
                                        {r.section?.toUpperCase()}
                                    </span>
                                    <h3 className={styles.title}>{r.title}</h3>
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
                                            src={`${DOMAIN}` + media.url}
                                            alt={media.caption}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </a>
                    );
                })}
            </div>
        </Layout>
    );
};

export async function getServerSideProps({ params }) {
    const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${params.query}&api-key=${API_KEY}`;

    const results = await search(URL);

    return {
        props: {
            results,
            query: params.query,
        },
    };
}

export default News;
