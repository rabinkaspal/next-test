export async function handler(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

export async function search(url) {
    const response = await fetch(url);
    const data = await response.json();

    const docs = data.response.docs;

    const results = docs.map(doc => ({
        ...doc,
        abstract: doc.abstract,
        section: doc.section_name,
        title: doc.headline.main,
        url: doc.web_url,
        uri: doc.uri,
        byline: doc.byline?.person[0]
            ? `${doc.byline.person[0]?.firstname} ${doc.byline.person[0]?.lastname}`
            : "-",
        published_date: doc.pub_date,
    }));

    return results;
}
