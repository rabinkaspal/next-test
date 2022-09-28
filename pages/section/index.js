import Layout from "../../components/Layout";
import styles from "../../styles/News.module.css";
import { handler } from "../api";
import Head from "next/head";

const API_KEY = "P8H9hhLQ9YSdfsYsFflizyVIBbttDaFj";
const SECTIONS_URL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`;

const Sections = ({ results, title }) => {
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
                <div className={styles.sectionContainer}>
                    {results.map(r => {
                        return (
                            <a href={`/section/${r.section}`} key={r.section}>
                                <div className={styles.section}>
                                    <h2 className={styles.title}>
                                        {r.display_name}
                                    </h2>
                                    <p>View News &rarr;</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </main>
        </Layout>
    );
};

export async function getStaticProps() {
    const results = await handler(SECTIONS_URL);
    return {
        props: {
            results,
            title: "Sections",
        },
    };
}

export default Sections;
