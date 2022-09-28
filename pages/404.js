import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";

const NotFound = () => {
    const router = useRouter();
    return (
        <Layout>
            <Head>
                <title>404: Not Found</title>
                <meta name="description" content="content not found" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>404: Not Found</h1>
                <p>Page not found. Try different page.</p>
                <a href="#" onClick={() => router.back()}>
                    &larr; Go back
                </a>
            </main>
            <style jsx>{`
                h1 {
                    color: blue;
                }
            `}</style>
        </Layout>
    );
};

export default NotFound;
