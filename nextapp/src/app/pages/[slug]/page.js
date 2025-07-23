import WPContentClient from "../../../components/wp/WPContentClient";

const API_URL = process.env.SERVER_WP_PUBLIC_API_URL;
const NEXT_API = process.env.NEXT_SERVER_WP_PUBLIC_API_URL;

export async function generateMetadata({ params }) {
    const res = await fetch(`${API_URL}/pages?slug=${params.slug}`);
    const data = await res.json();
    const page = data[0];

    if (!page) return notFound();

    return {
        title: page.title.rendered,
        description: page.excerpt.rendered,
        keywords: page.slug,
    };
}
async function fetchAssets(postId) {
    const res = await fetch(`${NEXT_API}/assets/${postId}`,{ next: { revalidate: 60 } });
   // console.log(`Assets fetch status for post ${postId}:`, res.status);
    if (!res.ok) return { styles: [], scripts: [] };
    const data = await res.json();
    console.log(`Assets data for post ${postId}:`, data);
    return data;
}
export async function generateStaticParams() {
    const res = await fetch(`${API_URL}/pages`);
    const pages = await res.json();
    return pages.map((page) => ({
        slug: page.slug,
    }));
}

export default async function Page({ params }) {
    const res = await fetch(`${API_URL}/pages?slug=${params.slug}`);
    const data = await res.json();
    const page = data[0];

    if (!page) return <h1>Page not found</h1>;
    const assets = await fetchAssets(page.id);
    console.log(assets);
    return (
        <>
            {assets.styles.map(style => (
                <link key={style.handle} rel="stylesheet" href={style.src} />
            ))}
            {assets.scripts.map(script => (
                <script key={script.handle} src={script.src} async />
            ))}
            <div className="w-full max-w-full prose prose-base">
                <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
                <WPContentClient html={page.content.rendered} />
            </div>


        </>

    );
}
